import type { Settings } from '~/composables/settings/settingsTypes';
import { useAuthorizedFetch } from '~/composables/fetch/useAuthorizedFetch';

export const useSettingsFetch = () => {
  const url = '/api/settings'
  const getSettings = () => useAuthorizedFetch<Settings>(url)

  const updateSettings = (settings: MaybeRefOrGetter<Settings | undefined>) => {
    return useAuthorizedFetch(url, {
      method: 'POST',
      body: settings,
      watch: [settings]
    })
  }

  return {
    getSettings,
    updateSettings
  }
}
