import type { Settings } from '~/composables/settings/settingsTypes';
import { useAuthorizedFetch } from '~/composables/fetch/useAuthorizedFetch';

export const useSettingsFetch = () => {
  const url = '/api/settings'
  const getSettings = () => useAuthorizedFetch<Settings>(url, {key: 'aaa'})

  const updateSettings = (settings: MaybeRefOrGetter<Settings | undefined>, options?: MaybeRefOrGetter<any>) => {
    return useAuthorizedFetch(url, {
      method: 'POST',
      body: settings,
      onResponse ({ response }) {
        console.log('----response', response.ok);
        if (response.ok) {
          refreshNuxtData(['aaa']);
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
