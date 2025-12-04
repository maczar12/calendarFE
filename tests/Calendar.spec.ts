import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Calendar from '../app/components/Calendar.vue'

describe('Calendar', () => {
  it('renders correctly', () => {
    const wrapper = mount(Calendar)
    expect(wrapper.exists()).toBe(true)
    expect(wrapper.find('.calendar').exists()).toBe(true)
  })

  it('displays current month and year', () => {
    const wrapper = mount(Calendar)
    const date = new Date()
    const monthName = date.toLocaleString('default', { month: 'long' })
    const year = date.getFullYear()
    expect(wrapper.text()).toContain(`${monthName} ${year}`)
  })

  it('respects weekStart prop', () => {
    // Case 1: weekStart is 0 (Sunday)
    let wrapper = mount(Calendar, {
      props: {
        weekStart: 0
      }
    })

    // Check weekday names
    let weekDayNames = wrapper.findAll('.weekdays > div')
    expect(weekDayNames[0].text()).toBe('Sun')
    expect(weekDayNames[1].text()).toBe('Mon')

    // Case 2: weekStart is 1 (Monday)
    wrapper = mount(Calendar, {
      props: {
        weekStart: 1
      }
    })

    // Check weekday names
    weekDayNames = wrapper.findAll('.weekdays > div')
    expect(weekDayNames[0].text()).toBe('Mon')
    expect(weekDayNames[1].text()).toBe('Tue')
  })
})
