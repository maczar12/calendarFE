<script setup lang="ts" generic="T">
import type { AsyncDataRequestStatus } from '#app'

interface Props {
  status: AsyncDataRequestStatus
  error?: any
  data?: T
}

const props = defineProps<Props>()
</script>

<template>
  <slot v-if="error" name="error" :error="error">
    <ErrorState />
  </slot>
  <slot v-else-if="status === 'pending'" name="loader">
    <LoadingState />
  </slot>
  <slot v-else-if="data" :data="data" />
  <slot v-else name="empty" />
</template>
