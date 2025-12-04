<script setup lang="ts">
const { data: settings } = await useFetch('/api/settings')
</script>

<template>
  <div>
    <NuxtRouteAnnouncer />
    <Calendar v-if="settings" :week-start="settings.weekStart" />
  </div>
</template>
