<script setup lang="ts">
import { useHabitsStore } from '@/stores/habits'
import NewHabitView from './NewHabitView.vue'
import { ref } from 'vue'
import type { Habit } from '@/interface/habitsInterface'

const modalVisible = ref(false)
const habitsStore = useHabitsStore()
const updateHabit = ref<Habit | null>(null)

function openModal() {
  modalVisible.value = true
}

function closeModal() {
  modalVisible.value = false
}

const saveHabit = (habit: Habit) => {
  if (updateHabit.value) {
    habitsStore.updateHabit(habit)
  } else {
    habitsStore.addHabit(habit)
  }
  closeModal()
}
</script>

<template>
  <div class="min-h-screen bg-gray-900 text-white p-6">
    <header class="mb-8">
      <h1 class="text-3xl font-bold mb-2">Hola de nuevo</h1>
      <p class="text-gray-300">tus habitos para hoy</p>
    </header>

    <button
      @click="openModal"
      class="bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-lg mb-6 transition"
    >
      + Crear habito
    </button>

    <div class="space-y-4">
      <div v-if="habitsStore.habits.length === 0" class="bg-gray-800 p-4 rounded-xl text-gray-300">
        No tienes hábitos todavía. Crea uno con el botón "+ Crear habito".
      </div>

      <div v-else>
        <div
          v-for="habit in habitsStore.habits"
          :key="habit.id"
          class="bg-gray-800 p-4 rounded-xl flex justify-between items-center shadow-md hover:bg-gray-700 transition"
        >
          <span class="text-lg font-medium">{{ habit.name }}</span>
          <button
            class="rounded-full bg-green-700 min-w-8 min-h-8 hover:shadow-md hover:bg-green-600"
          >
            ✓
          </button>
        </div>
      </div>
    </div>
  </div>

  <NewHabitView
    v-if="modalVisible"
    :update-Habit="updateHabit"
    @confirm="saveHabit"
    @cancel="closeModal"
  />
</template>
