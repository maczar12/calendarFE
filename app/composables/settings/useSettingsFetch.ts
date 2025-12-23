import type { Settings } from '~/composables/settings/settingsTypes';
import { useAuthorizedFetch } from '~/composables/fetch/useAuthorizedFetch';
import { useDataKeys } from '~/composables/fetch/useDataKeys';

export const useSettingsFetch = () => {
  const url = '/api/settings'
  const uDataKeys = useDataKeys()
  const key = uDataKeys.settings

  const getSettings = () => useAuthorizedFetch<Settings>(url, {key})

  const updateSettings = (settings: MaybeRefOrGetter<Settings | undefined>, options?: MaybeRefOrGetter<any>) => {
    return useAuthorizedFetch(url, {
      method: 'POST',
      body: settings,
      onResponse ({ response }) {
        if (response.ok) {
          refreshNuxtData([key]);
        }
      },
      immediate: false,
      ...toValue(options)
    })
  }

  return {
    getSettings,
    updateSettings
  }
}
