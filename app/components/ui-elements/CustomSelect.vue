<script setup lang="ts">
defineProps<{
  modelValue?: string | number
  options: { value: string | number, label: string }[]
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', newValue: string | number | undefined): void
}>()
</script>

<template>
  <select
    id="week-start"
    :value="modelValue"
    @change="emit('update:modelValue', $event.target?.value)"
  >
    <option v-for="o in options" :key="o.value" :value="o.value">{{ o.label }}</option>
  </select>
</template>

<style scoped>

</style>