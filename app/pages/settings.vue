<script setup lang="ts">
const { settings, updateWeekStart } = useSettings()

const currentWeekStart = computed({
  get: () => settings.value?.weekStart ?? 1,
  set: (val) => {
    updateWeekStart(Number(val))
  }
})
</script>

<template>
  <div>
    <h1>Settings</h1>
    <div class="setting-item">
      <label for="week-start">Week Start:</label>
      <select id="week-start" v-model.number="currentWeekStart">
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
