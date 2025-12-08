<script setup lang="ts">
import { useSettingsFetch } from '~/composables/settings/useSettingsFetch';

const uSettingsFetch = useSettingsFetch()
const { data: settings, error, status } = await uSettingsFetch.getSettings()
</script>

<template>
  <div>
    <div v-if="error">
      Error
    </div>

    <div v-else-if="status === 'pending'">
      Fetching
    </div>

    <div v-else-if="settings">
      <h1>Calendar</h1>
      <Calendar :week-start="settings.weekStart" />
    </div>

    <div v-else>
      No Calendar
    </div>
  </div>
</template>
