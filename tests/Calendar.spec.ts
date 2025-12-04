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
})
