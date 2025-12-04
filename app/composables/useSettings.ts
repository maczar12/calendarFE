export const useSettings = () => {
  const { data: settings, refresh } = useFetch('/api/settings', {
    key: 'settings',
    default: () => ({ weekStart: 1 })
  })

  const updateWeekStart = async (newStart: number) => {
    // Optimistic update
    if (settings.value) {
      settings.value.weekStart = newStart
    }

    try {
      await $fetch('/api/settings', {
        method: 'POST',
        body: { weekStart: newStart }
      })
      await refresh()
    } catch (e) {
      console.error('Failed to save settings', e)
    }
  }

  return {
    settings,
    updateWeekStart
  }
}
