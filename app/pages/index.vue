<script setup lang="ts">
import { useSettingsFetch } from '~/composables/settings/useSettingsFetch';

const uSettingsFetch = useSettingsFetch()
const { data: settings, error, status } = await uSettingsFetch.getSettings()
</script>

<template>
  <div>
    <ErrorState v-if="error" />

    <LoadingState v-else-if="status === 'pending'" />

    <div v-else-if="settings">
      <h1>Calendar</h1>
      <Calendar :week-start="settings.weekStart" />
    </div>

    <div v-else>
      No Calendar
    </div>
  </div>
</template>
