import type { UseFetchOptions } from 'nuxt/app';
import type { Settings } from '~/composables/settings/settingsTypes';
import { useAuthorizedFetch } from '~/composables/fetch/useAuthorizedFetch';
import { useDataKeys } from '~/composables/fetch/useDataKeys';

export const useSettingsFetch = () => {
  const url = '/api/settings'
  const uDataKeys = useDataKeys()
  const key = uDataKeys.settings

  const getSettings = () => useAuthorizedFetch<Settings>(url, {key})

  const updateSettings = (settings: MaybeRefOrGetter<Settings | undefined>, options?: MaybeRefOrGetter<UseFetchOptions<Settings>>) => {
    return useAuthorizedFetch<Settings>(url, {
      method: 'POST',
      body: settings,
      immediate: false,
      optimisticKey: key,
      optimisticData: settings,
      ...toValue(options) as Record<string, unknown>
    })
  }

  return {
    getSettings,
    updateSettings
  }
}
