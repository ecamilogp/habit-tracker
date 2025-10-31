<script setup lang="ts">
import { ref } from 'vue'
import type { Habit } from '@/interface/habitsInterface'

const props = defineProps<{
  updateHabit?: Habit
}>()

const emit = defineEmits(['confirm', 'cancel'])

const habits = ref<Habit>({
  name: '',
  id: 0,
  completed: false,
  icon: '',
  ...props.updateHabit,
})

const modal = ref(true)

const closeModal = () => {
  modal.value = false
  emit('cancel')
}

const saveHabit = () => {
  emit('confirm', { ...habits.value })
}
</script>

<template>
  <div
    v-if="modal"
    class="fixed inset-0 flex flex-col items-center justify-center text-white backdrop:blur-sm"
  >
    <button
      @click="closeModal"
      class="absolute min-h-2 p-2 top-4 right-4 text-white hover:outline-none hover:ring-2 hover:ring-cyan-300"
    >
      X
    </button>
    <h2 class="text-2xl font-bold mb-4">
      {{ props.updateHabit ? 'Editar habito' : 'Nuevo habito' }}
    </h2>
    <form class="space-y-6">
      <label class="block mb-2">Nombre:</label>
      <input
        v-model="habits.name"
        type="text"
        class="w-full px-3 py-2 rounded bg-gray-800 text-white mb-4"
        placeholder="Ej: Leer 10 minutos"
      />

      <label class="block mb-2">Icono:</label>
      <input
        v-model="habits.icon"
        type="text"
        class="w-full px-3 py-2 rounded bg-gray-800 text-white mb-6"
        placeholder="Un emoji temporal o texto"
      />

      <button
        @click="saveHabit()"
        class="bg-indigo-600 hover:bg-indigo-500 px-4 py-2 rounded-lg transition"
      >
        {{ props.updateHabit ? 'Guardar cambios' : 'Crear habito' }}
      </button>
    </form>
  </div>
</template>
