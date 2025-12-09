import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import FetchState from '../app/components/FetchState.vue'
import ErrorState from '../app/components/ErrorState.vue'
import LoadingState from '../app/components/LoadingState.vue'

describe('FetchState', () => {
  it('renders loading state when pending', () => {
    const wrapper = mount(FetchState, {
      props: {
        status: 'pending',
        error: null,
        data: null
      },
      global: {
        components: {
            LoadingState,
            ErrorState
        }
      }
    })
    expect(wrapper.text()).toContain('Fetching')
  })

  it('renders error state when error is present', () => {
    const wrapper = mount(FetchState, {
      props: {
        status: 'error', // or 'idle' but with error
        error: new Error('Something went wrong'),
        data: null
      },
      global: {
        components: {
            LoadingState,
            ErrorState
        }
      }
    })
    expect(wrapper.text()).toContain('Error')
  })

  it('renders data when success', () => {
    const wrapper = mount(FetchState, {
      props: {
        status: 'success',
        error: null,
        data: { message: 'Hello' }
      },
      slots: {
        default: '<template #default="{ data }">{{ data.message }}</template>'
      },
      global: {
        components: {
            LoadingState,
            ErrorState
        }
      }
    })
    expect(wrapper.text()).toContain('Hello')
  })

  it('renders empty slot when data is null but success', () => {
    const wrapper = mount(FetchState, {
      props: {
        status: 'success',
        error: null,
        data: null
      },
      slots: {
        empty: '<div>Empty</div>'
      },
      global: {
        components: {
            LoadingState,
            ErrorState
        }
      }
    })
    expect(wrapper.text()).toContain('Empty')
  })
})
