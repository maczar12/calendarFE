<script setup lang="ts">
const { settings } = useSettings()
</script>

<template>
  <div>
    <h1>Calendar</h1>
    <Calendar v-if="settings" :week-start="settings.weekStart" />
  </div>
</template>
