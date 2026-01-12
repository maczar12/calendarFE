import type { UseFetchOptions } from 'nuxt/app'
import { useAuthorizedFetch } from '~/composables/fetch/useAuthorizedFetch';


export function useGet<T>(
  url: MaybeRefOrGetter<string>,
  options: UseFetchOptions<T> = {},
) {
  return useAuthorizedFetch<T>(url, { key: url, ...options })
}
