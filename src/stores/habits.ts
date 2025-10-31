import { defineStore } from 'pinia'
import type { Habit } from '../interface/habitsInterface'

export const useHabitsStore = defineStore('habits', {
  state: () => ({
    currentHabit: [] as Habit[],
    habits: [] as Habit[],
  }),

  actions: {
    setCurrentHabit(habit: Habit[]) {
      this.currentHabit = habit
    },

    saveHabits() {
      const habitsData = JSON.stringify(this.habits)
      localStorage.setItem('habits', habitsData)
    },

    loadHabits() {
      const recoverData = localStorage.getItem('habits')
      this.habits = recoverData ? (JSON.parse(recoverData) as Habit[]) : []
    },

    addHabit(data: Habit) {
      if (data) {
        data.id = Date.now()
        this.habits.push(data)
        this.saveHabits()
      } else {
        console.log('No hay data agregada')
      }
    },

    updateHabit(data: Habit) {
      const index = this.habits.findIndex((habit) => habit.id === data.id)
      if (index !== -1) {
        this.habits.splice(index, 1, data)
        this.saveHabits()
      }
    },
  },
})
