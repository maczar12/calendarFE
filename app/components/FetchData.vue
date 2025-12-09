<script setup lang="ts" generic="T">
defineProps<{
  status: string
  error: any
  data?: T | null
}>()
</script>

<template>
  <ErrorState v-if="error" />
  <LoadingState v-else-if="status === 'pending'" />
  <slot v-else-if="data" :data="data" />
  <slot v-else name="empty" />
</template>
