<script setup>
import { ref, watch } from 'vue'

const emit = defineEmits(['save-student'])
const props = defineProps({
  editingStudent: { type: Object, default: null }
})

const form = ref({
  studentId: '',
  fullName: '',
  program: 'BSCS',
  yearLevel: '1st Year',
  status: 'Enrolled'
})

const errors = ref({})

watch(() => props.editingStudent, (newVal) => {
  if (newVal) form.value = { ...newVal }
}, { immediate: true })

const validate = () => {
  errors.value = {}
  if (!form.value.studentId.trim()) errors.value.studentId = 'Student ID is required.'
  if (!form.value.fullName.trim()) errors.value.fullName = 'Full Name is required.'
  return Object.keys(errors.value).length === 0
}

const handleSubmit = () => {
  if (!validate()) return
  emit('save-student', { ...form.value })
  form.value = { studentId: '', fullName: '', program: 'BSCS', yearLevel: '1st Year', status: 'Enrolled' }
  errors.value = {}
}
</script>

<template>
  <div class="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl shadow-sm p-6 transition-colors duration-300">
    <div class="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4 mb-5">
      <div>
        <h2 class="text-base font-semibold text-slate-900 dark:text-white">
          {{ editingStudent ? 'Update Student Record' : 'Register New Student' }}
        </h2>
        <p class="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Fill in the required academic credentials below</p>
      </div>
      <span class="text-xs text-slate-400 dark:text-slate-400 bg-slate-50 dark:bg-slate-800 px-2.5 py-1 rounded-md border border-slate-200 dark:border-slate-700">
        {{ editingStudent ? 'Editing Mode' : 'New Entry' }}
      </span>
    </div>

    <form @submit.prevent="handleSubmit" class="space-y-4">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label class="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">Student ID</label>
          <input 
            v-model="form.studentId" 
            type="text" 
            placeholder="e.g. 2026-0001" 
            :disabled="!!editingStudent"
            class="w-full bg-slate-50 dark:bg-slate-800/60 border rounded-xl px-3.5 py-2.5 text-sm dark:text-white transition outline-none focus:bg-white dark:focus:bg-slate-800 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 disabled:opacity-60 disabled:cursor-not-allowed"
            :class="errors.studentId ? 'border-rose-400 focus:ring-rose-500/20 focus:border-rose-500' : 'border-slate-200 dark:border-slate-700'"
          />
          <p v-if="errors.studentId" class="text-rose-500 dark:text-rose-400 text-xs mt-1 font-medium">{{ errors.studentId }}</p>
        </div>

        <div>
          <label class="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">Full Name</label>
          <input 
            v-model="form.fullName" 
            type="text" 
            placeholder="e.g. Juan Cruz" 
            class="w-full bg-slate-50 dark:bg-slate-800/60 border rounded-xl px-3.5 py-2.5 text-sm dark:text-white transition outline-none focus:bg-white dark:focus:bg-slate-800 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600"
            :class="errors.fullName ? 'border-rose-400 focus:ring-rose-500/20 focus:border-rose-500' : 'border-slate-200 dark:border-slate-700'"
          />
          <p v-if="errors.fullName" class="text-rose-500 dark:text-rose-400 text-xs mt-1 font-medium">{{ errors.fullName }}</p>
        </div>

        <div>
          <label class="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">Academic Program</label>
          <select v-model="form.program" class="w-full bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-xl px-3.5 py-2.5 text-sm dark:text-white transition outline-none focus:bg-white dark:focus:bg-slate-800 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600">
            <option class="dark:bg-slate-900">BSCS</option>
            <option class="dark:bg-slate-900">BSIT</option>
            <option class="dark:bg-slate-900">BSEMC</option>
            <option class="dark:bg-slate-900">BSIS</option>
          </select>
        </div>

        <div>
          <label class="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">Year Level</label>
          <select v-model="form.yearLevel" class="w-full bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-xl px-3.5 py-2.5 text-sm dark:text-white transition outline-none focus:bg-white dark:focus:bg-slate-800 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600">
            <option class="dark:bg-slate-900">1st Year</option>
            <option class="dark:bg-slate-900">2nd Year</option>
            <option class="dark:bg-slate-900">3rd Year</option>
            <option class="dark:bg-slate-900">4th Year</option>
          </select>
        </div>
      </div>

      <div>
        <label class="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">Enrollment Status</label>
        <select v-model="form.status" class="w-full bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-xl px-3.5 py-2.5 text-sm dark:text-white transition outline-none focus:bg-white dark:focus:bg-slate-800 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600">
          <option class="dark:bg-slate-900">Enrolled</option>
          <option class="dark:bg-slate-900">Inactive</option>
          <option class="dark:bg-slate-900">On Leave</option>
        </select>
      </div>

      <button 
        type="submit" 
        class="w-full bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white font-medium py-2.5 rounded-xl text-sm transition-all shadow-sm active:scale-[0.99] mt-2 cursor-pointer"
      >
        {{ editingStudent ? 'Save Changes' : 'Submit Record' }}
      </button>
    </form>
  </div>
</template>