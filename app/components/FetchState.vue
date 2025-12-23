<script setup lang="ts">
import ErrorState from '~/components/ErrorState.vue';
import LoadingState from '~/components/LoadingState.vue';

defineProps<{
  status: string,
  error: unknown,
}>()
</script>

<template>
  <div>
    <ErrorState v-if="error" />
    <LoadingState v-else-if="status === 'pending'" />

    <slot v-else name="default" />
  </div>
</template>
