import type { UseFetchOptions } from 'nuxt/app'
import type { FetchContext } from 'ofetch'
import { refreshNuxtData, useNuxtData } from '#imports'
import { useAuthorizedFetch } from '~/composables/fetch/useAuthorizedFetch';
import useMergeHooks from '~/composables/fetch/useMergeHooks';

type FetchHook = (ctx: FetchContext) => void | Promise<void>

export function usePost<T>(
  url: MaybeRefOrGetter<string>,
  body: MaybeRefOrGetter<T | undefined>,
  options: UseFetchOptions<T> = {},
) {
  const onRequest: FetchHook = (ctx) => {
    if (url) {
      const { data } = useNuxtData(toValue(url))
      const previousData = data.value

      if (previousData) {
        (ctx.options as Record<string, unknown>)._previousData = previousData
      }

      if (options.body) {
        const newData = options.body
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
    if ((ctx.options as Record<string, unknown>)._previousData) {
      const { data } = useNuxtData(toValue(url))
      data.value = (ctx.options as Record<string, unknown>)._previousData
    }
  }

  const onResponse: FetchHook = (ctx) => {
    if (ctx.response.ok) {
      refreshNuxtData([toValue(url)])
    }
  }

  return useAuthorizedFetch<T>(url, {
    method: 'POST',
    body: body,
    onRequest: useMergeHooks('onRequest', onRequest, options['onRequest']),
    onResponseError: useMergeHooks('onResponseError', onResponseError, options['onResponseError']),
    onResponse: useMergeHooks('onResponse', onResponse, options['onResponse']),
    ...toValue(options) as Record<string, unknown>
  })
}
