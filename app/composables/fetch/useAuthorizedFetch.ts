import type { UseFetchOptions } from 'nuxt/app'

export function useAuthorizedFetch<T>(
  url: MaybeRefOrGetter<string>,
  options: UseFetchOptions<T> = {},
) {
  return useFetch(url, {
    ...options,
  })
}