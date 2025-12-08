<script setup lang="ts">

import { useSettingsFetch } from '~/composables/settings/useSettingsFetch';
import type { Settings } from '~/composables/settings/settingsTypes';

const uSettingsFetch = useSettingsFetch()
const { data: settings } = await uSettingsFetch.getSettings()


const settingsBody = ref<Settings>()
const { error, execute } = uSettingsFetch.updateSettings(settingsBody)

const changeWeekStart = (event) => {
  settingsBody.value = {weekStart: event.target.value}
  execute()
}
</script>

<template>
  <div>
    <h1>Settings</h1>
    <div class="setting-item">
      ---{{ settings }}===
      <label for="week-start">Week Start:</label>
      <select
        id="week-start"
        :value="settings?.weekStart"
        @change="changeWeekStart"
      >
        <option :value="0">Sunday</option>
        <option :value="1">Monday</option>
        <option :value="6">Saturday</option>
      </select>
    </div>
    <div class="current-value">
      Current value: {{ settings?.weekStart }}
    </div>
  </div>
</template>

<style scoped>
.setting-item {
  margin: 20px 0;
}
select {
  padding: 8px;
  margin-left: 10px;
}
</style>
