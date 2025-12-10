<script setup lang="ts">
// Define props to match the typical useFetch/useAsyncData return values
interface FetchError<T = any> extends Error {
  data?: T
  statusCode?: number
  statusMessage?: string
  fatal?: boolean
}

const props = defineProps<{
  status: 'idle' | 'pending' | 'success' | 'error'
  error?: FetchError | null
  isEmpty?: boolean
  emptyMessage?: string
}>()
</script>

<template>
  <slot v-if="status === 'error'" name="error" :error="error">
    <ErrorState />
  </slot>

  <slot v-else-if="status === 'pending' || status === 'idle'" name="loader">
    <LoadingState />
  </slot>

  <slot v-else-if="isEmpty" name="empty">
    <div>
      {{ emptyMessage || 'No results found' }}
    </div>
  </slot>

  <slot v-else />
</template>
