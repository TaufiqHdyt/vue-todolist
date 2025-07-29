import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

import * as s$todo from '@/services/todo'

export const useListStore = defineStore('list', () => {
  const list = ref([])

  async function a$list() {
    try {
      // object destructure
      const { data } = await s$todo.list()
      list.value = data
    } catch ({ message, error }) {
      throw message ?? error
    }
  }

  async function a$add(data) {
    try {
      await s$todo.add(data)
      await a$list()
    } catch ({ message, error }) {
      throw message ?? error
    }
  }

  function removeIndex(index) {
    list.value = list.value.filter((val, idx) => index !== idx)
  }
  function editIndex(index, data) {
    list.value[index] = data
  }

  const getList = computed(() => list.value)
  const getDetail = (index) => computed(() => list.value[index])

  return {
    a$list,
    a$add,
    removeIndex,
    editIndex,
    getList,
    getDetail
  }
})
