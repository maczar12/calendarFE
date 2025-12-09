<script setup lang="ts">

import { useSettingsFetch } from '~/composables/settings/useSettingsFetch';
import type { Settings } from '~/composables/settings/settingsTypes';
import CustomSelect from '~/components/ui-elements/CustomSelect.vue';

const uSettingsFetch = useSettingsFetch()
const {data: settings, error, status} = await uSettingsFetch.getSettings()


const settingsBody = ref<Settings>()
const {execute} = uSettingsFetch.updateSettings(settingsBody)

const changeWeekStart = (event?: number) => {
  if (event) {
    settingsBody.value = {weekStart: event}
    execute()
  }
}

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
      <h1>Settings</h1>
      <div class="setting-item">
        <label for="week-start">Week Start:</label>

        <CustomSelect
          :model-value="settings.weekStart"
          :options="[
            {value: 0, label: 'Sunday'},
            {value: 1, label: 'Monday'},
            {value: 6, label: 'Saturday'},
          ]"
          @update:model-value="changeWeekStart($event as number)"
        />
      </div>
      <div class="current-value">
        Current value: {{ settings.weekStart }}
      </div>
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
