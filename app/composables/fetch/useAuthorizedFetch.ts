import type { UseFetchOptions } from 'nuxt/app'
import type { FetchContext } from 'ofetch'
import { useNuxtData, refreshNuxtData } from '#imports'

export interface AuthorizedFetchOptions<T> extends UseFetchOptions<T> {
  optimisticKey?: string
  optimisticData?: unknown
}

type FetchHook = (ctx: FetchContext) => void | Promise<void>

export function useAuthorizedFetch<T>(
  url: MaybeRefOrGetter<string>,
  options: AuthorizedFetchOptions<T> = {},
) {
  const { optimisticKey, optimisticData, ...fetchOptions } = options

  const onRequest: FetchHook = (ctx) => {
    if (optimisticKey) {
      const { data } = useNuxtData(optimisticKey)
      const previousData = data.value

      if (previousData) {
        (ctx.options as Record<string, unknown>)._previousData = previousData
      }

      if (optimisticData) {
        const newData = toValue(optimisticData)
        if (newData) {
          if (data.value && typeof data.value === 'object' && !Array.isArray(data.value)) {
            data.value = { ...data.value, ...newData }
          }
          else {
            data.value = newData
          }
        }
      }
    }
  }

  const onResponseError: FetchHook = (ctx) => {
    if (optimisticKey && (ctx.options as Record<string, unknown>)._previousData) {
      const { data } = useNuxtData(optimisticKey)
      data.value = (ctx.options as Record<string, unknown>)._previousData
    }
  }

  const onResponse: FetchHook = (ctx) => {
    if (optimisticKey && ctx.response.ok) {
      refreshNuxtData([optimisticKey])
    }
  }

  const mergeHooks = (hookName: 'onRequest' | 'onResponse' | 'onResponseError', newHook: FetchHook) => {
    const existing = fetchOptions[hookName]
    if (Array.isArray(existing)) {
      return [newHook, ...(existing as FetchHook[])]
    }
    else if (existing) {
      return [newHook, existing as FetchHook]
    }
    return [newHook]
  }

  return useFetch(url, {
    ...fetchOptions,
    onRequest: mergeHooks('onRequest', onRequest),
    onResponseError: mergeHooks('onResponseError', onResponseError),
    onResponse: mergeHooks('onResponse', onResponse),
  })
}
