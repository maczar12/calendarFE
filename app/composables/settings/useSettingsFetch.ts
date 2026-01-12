import type { UseFetchOptions } from 'nuxt/app';
import type { Settings } from '~/composables/settings/settingsTypes';
import { useGet } from '~/composables/fetch/useGet';
import { usePost } from '~/composables/fetch/usePost';

export const useSettingsFetch = () => {
  const url = '/api/settings'

  const getSettings = () => useGet<Settings>(url)

  const updateSettings = (settings: MaybeRefOrGetter<Settings | undefined>, options?: UseFetchOptions<Settings>) => {
    return usePost<Settings>(url, settings, options)
  }

  return {
    getSettings,
    updateSettings
  }
}
