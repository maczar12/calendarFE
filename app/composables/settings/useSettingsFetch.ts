import type { Settings } from '~/composables/settings/settingsTypes';
import { useAuthorizedFetch } from '~/composables/fetch/useAuthorizedFetch';

export const useSettingsFetch = () => {
  const url = '/api/settings'
  const getSettings = () => useAuthorizedFetch<Settings>(url, {key: url})

  const updateSettings = (settings: MaybeRefOrGetter<Settings | undefined>) => {
    const computedUrl = computed(() => {
      const s = toValue(settings)
      return s ? url : undefined
    })

    return useAuthorizedFetch(computedUrl, {
      key: url,
      method: 'POST',
      body: settings,
      watch: [settings],
      immediate: false
    })
  }

  return {
    getSettings,
    updateSettings
  }
}
