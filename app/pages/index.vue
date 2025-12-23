<script setup lang="ts">
import { useSettingsFetch } from '~/composables/settings/useSettingsFetch';

const uSettingsFetch = useSettingsFetch()
const { data: settings, error, status } = await uSettingsFetch.getSettings()
</script>

<template>
  <div>
    <FetchState :status="status" :error="error" :is-empty="!settings">
      <template #default>
        <div>
          <h1>Calendar</h1>
          <Calendar :week-start="settings!.weekStart" />
        </div>
      </template>
      <template #empty>
        <div>
          No Calendar
        </div>
      </template>
    </FetchState>
  </div>
</template>
