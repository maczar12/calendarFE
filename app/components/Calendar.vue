<script setup lang="ts">
import { ref, computed } from 'vue'

const props = withDefaults(defineProps<{
  weekStart?: number
}>(), {
  weekStart: 0 // Default to Sunday
})

const currentDate = ref(new Date())

const year = computed(() => currentDate.value.getFullYear())
const month = computed(() => currentDate.value.getMonth())

const monthName = computed(() => {
  return currentDate.value.toLocaleString('default', { month: 'long' })
})

const daysInMonth = computed(() => {
  return new Date(year.value, month.value + 1, 0).getDate()
})

const firstDayOfMonth = computed(() => {
  return new Date(year.value, month.value, 1).getDay()
})

const days = computed(() => {
  const result = []
  // Calculate empty slots based on weekStart
  // firstDayOfMonth is 0 (Sun) to 6 (Sat)
  // if weekStart is 0: (firstDayOfMonth - 0 + 7) % 7
  // if weekStart is 1 (Mon):
  //   if firstDayOfMonth is 1 (Mon) -> 0 empty slots
  //   if firstDayOfMonth is 0 (Sun) -> 6 empty slots
  const emptySlots = (firstDayOfMonth.value - props.weekStart + 7) % 7

  // Add empty slots
  for (let i = 0; i < emptySlots; i++) {
    result.push(null)
  }
  // Add days of the month
  for (let i = 1; i <= daysInMonth.value; i++) {
    result.push(i)
  }
  return result
})

const weekDayNames = computed(() => {
  const names = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
  const rotated = [...names.slice(props.weekStart), ...names.slice(0, props.weekStart)]
  return rotated
})

const prevMonth = () => {
  currentDate.value = new Date(year.value, month.value - 1, 1)
}

const nextMonth = () => {
  currentDate.value = new Date(year.value, month.value + 1, 1)
}
</script>

<template>
  <div class="calendar">
    <div class="header">
      <button @click="prevMonth">&lt;</button>
      <h2>{{ monthName }} {{ year }}</h2>
      <button @click="nextMonth">&gt;</button>
    </div>
    <div class="weekdays">
      <div v-for="day in weekDayNames" :key="day">
        {{ day }}
      </div>
    </div>
    <div class="days">
      <div
        v-for="(day, index) in days"
        :key="index"
        class="day"
        :class="{ 'empty': day === null }"
      >
        {{ day }}
      </div>
    </div>
  </div>
</template>

<style scoped>
.calendar {
  max-width: 400px;
  margin: 0 auto;
  font-family: sans-serif;
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 16px;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.weekdays {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  font-weight: bold;
  margin-bottom: 8px;
  text-align: center;
}

.days {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 4px;
}

.day {
  text-align: center;
  padding: 8px;
  border: 1px solid #eee;
  border-radius: 4px;
}

.day.empty {
  background-color: transparent;
  border: none;
}
</style>
