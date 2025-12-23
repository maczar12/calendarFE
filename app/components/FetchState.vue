<script setup lang="ts">
import ErrorState from '~/components/ErrorState.vue';
import LoadingState from '~/components/LoadingState.vue';

defineProps<{
  status: string,
  error: unknown,
  isEmpty?: boolean
}>()
</script>

<template>
  <div>
    <slot v-if="error" name="error">
      <ErrorState />
    </slot>
    <slot v-else-if="status === 'pending'" name="loader">
      <LoadingState />
    </slot>
    <slot v-else-if="isEmpty" name="empty" />
    <slot v-else name="default" />
  </div>
</template>
