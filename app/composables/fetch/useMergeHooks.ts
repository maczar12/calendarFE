import type { FetchContext } from 'ofetch'

export type FetchHook = (ctx: FetchContext) => void | Promise<void>

export default (hookName: 'onRequest' | 'onResponse' | 'onResponseError', newHook: FetchHook, existingHooks?: FetchHook | FetchHook[]) => {
  if (Array.isArray(existingHooks)) {
    return [newHook, ...(existingHooks as FetchHook[])]
  } else if (existingHooks) {
    return [newHook, existingHooks as FetchHook]
  }
  return [newHook]
}
