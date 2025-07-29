import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

import { setCookies, certCookies } from '@/plugins/cookies'

import * as s$auth from '@/services/auth'

export const d$auth = defineStore('auth', () => {
  const state = ref({
    id: undefined,
    name: undefined,
    role: undefined
  })

  async function a$setUser() {
    try {
      const { id, name, role } = certCookies()
      Object.assign(state.value, { id, name, role })
      return 'User Authenticated!'
    } catch ({ message }) {
      Object.assign(state.value, {
        id: undefined,
        name: undefined,
        role: undefined
      })
      throw message
    }
  }
  async function a$login(body) {
    try {
      const { data } = await s$auth.login(body)
      setCookies('CERT', data.token, { datetime: data.expiresAt })
      return true
    } catch ({ error, message }) {
      throw message ?? error
    }
  }

  const g$user = computed(() => state.value)

  const isLoggedIn = computed(() => !!state.value.id)

  return {
    a$setUser,
    a$login,
    g$user,
    isLoggedIn
  }
})
