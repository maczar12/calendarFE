<script setup lang="ts">
import settings from '~/pages/settings.vue';

const props = defineProps<{
  modelValue?: string | number
  options: { value: string | number, label: string }[]
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', newValue: string | number | undefined): void
}>()

const value = computed({
  get: () => props.modelValue,
  set: (value: string | number): void => {
    emit('update:modelValue', value)
  }
})

</script>

<template>
  <select v-model="value">
    <option v-for="o in options" :key="o.value" :value="o.value">{{ o.label }}</option>
  </select>
</template>

<style scoped>

</style>