import type { Settings } from '~/composables/settings/settingsTypes';

export const useSettingsFetch = () => {
  const url = '/api/settings'
  const getSettings = () => useFetch(url)

  const updateSettings = (settings: MaybeRefOrGetter<Settings | undefined>) => {
    return useFetch(url, {
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
