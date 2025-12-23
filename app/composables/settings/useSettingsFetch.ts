import type { Settings } from '~/composables/settings/settingsTypes';
import { useAuthorizedFetch } from '~/composables/fetch/useAuthorizedFetch';
import { useDataKeys } from '~/composables/fetch/useDataKeys';
// Explicitly import from #imports to match what we can mock easily,
// OR we can trust Nuxt auto-imports if we can mock the nuxt instance.
// But since we are in unit test without full Nuxt environment, mocking #imports is safer if the test setup allows it.
import { useNuxtData, refreshNuxtData } from '#imports';

export const useSettingsFetch = () => {
  const url = '/api/settings'
  const uDataKeys = useDataKeys()
  const key = uDataKeys.settings

  const getSettings = () => useAuthorizedFetch<Settings>(url, {key})

  const updateSettings = (settings: MaybeRefOrGetter<Settings | undefined>, options?: MaybeRefOrGetter<unknown>) => {
    return useAuthorizedFetch(url, {
      method: 'POST',
      body: settings,
      onRequest({ options }) {
        // We use the imported useNuxtData which we can mock in tests
        const { data } = useNuxtData<Settings>(key)
        const previousSettings = data.value
        if (previousSettings) {
          (options as Record<string, unknown>)._previousSettings = previousSettings
        }

        const newSettings = toValue(settings)
        if (newSettings && data.value) {
            data.value = { ...data.value, ...newSettings }
        }
      },
      onResponseError({ options }) {
        const { data } = useNuxtData<Settings>(key)
        if ((options as Record<string, unknown>)._previousSettings) {
          data.value = (options as Record<string, unknown>)._previousSettings as Settings
        }
      },
      onResponse ({ response }) {
        if (response.ok) {
          refreshNuxtData([key]);
        }
      },
      immediate: false,
      ...toValue(options) as Record<string, unknown>
    })
  }

  return {
    getSettings,
    updateSettings
  }
}
