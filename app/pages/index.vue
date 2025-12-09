<script setup lang="ts">
import { useSettingsFetch } from '~/composables/settings/useSettingsFetch';

const uSettingsFetch = useSettingsFetch()
const { data: settings, error, status } = await uSettingsFetch.getSettings()
</script>

<template>
  <div>
    <FetchData :status="status" :error="error" :data="settings">
      <template #default="{ data }">
        <h1>Calendar</h1>
        <Calendar :week-start="data.weekStart" />
      </template>
      <template #empty>
        <div>No Calendar</div>
      </template>
    </FetchData>
  </div>
</template>
