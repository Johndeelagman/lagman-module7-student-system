<template>
  <div class="bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-6 shadow-xl">
    <div class="flex items-center justify-between mb-6">
      <div>
        <h2 class="text-lg font-semibold text-slate-100">Register New Student</h2>
        <p class="text-xs text-slate-400">Fill in the required academic credentials below</p>
      </div>

      <button 
        @click="resetForm" 
        type="button"
        class="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 active:scale-95 text-xs text-slate-300 font-medium rounded-lg border border-slate-700 transition cursor-pointer"
      >
        + New Entry
      </button>
    </div>

    <form @submit.prevent="handleSubmit" class="space-y-4">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label class="block text-xs font-medium text-slate-300 mb-1">Student ID</label>
          <input 
            v-model="form.studentId"
            @input="errors.studentId = ''"
            type="text" 
            placeholder="e.g. 2026-0001"
            class="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-slate-100 placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition"
          />
          <p v-if="errors.studentId" class="text-xs text-rose-500 mt-1 font-medium">{{ errors.studentId }}</p>
        </div>

        <div>
          <label class="block text-xs font-medium text-slate-300 mb-1">Full Name</label>
          <input 
            v-model="form.fullName"
            @input="errors.fullName = ''"
            type="text" 
            placeholder="e.g. Juan Cruz"
            class="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-slate-100 placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition"
          />
          <p v-if="errors.fullName" class="text-xs text-rose-500 mt-1 font-medium">{{ errors.fullName }}</p>
        </div>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <!-- Expanded Academic Programs -->
        <div>
          <label class="block text-xs font-medium text-slate-300 mb-1">Academic Program</label>
          <select v-model="form.program" class="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition">
            <option value="BSCS">BSCS (Computer Science)</option>
            <option value="BSIT">BSIT (Information Tech)</option>
            <option value="BSEMC">BSEMC (Entertainment & Multimedia)</option>
            <option value="BSIS">BSIS (Information Systems)</option>
            <option value="BSCpE">BSCpE (Computer Engineering)</option>
            <option value="BDA">BDA (Data Analytics)</option>
          </select>
        </div>

        <!-- Year Level -->
        <div>
          <label class="block text-xs font-medium text-slate-300 mb-1">Year Level</label>
          <select v-model="form.yearLevel" class="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition">
            <option value="1st Year">1st Year</option>
            <option value="2nd Year">2nd Year</option>
            <option value="3rd Year">3rd Year</option>
            <option value="4th Year">4th Year</option>
          </select>
        </div>

        <!-- Expanded Enrollment Statuses -->
        <div>
          <label class="block text-xs font-medium text-slate-300 mb-1">Enrollment Status</label>
          <select v-model="form.status" class="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition">
            <option value="Enrolled">Enrolled</option>
            <option value="Inactive">Inactive</option>
            <option value="On Leave">On Leave</option>
            <option value="Graduated">Graduated</option>
            <option value="Probation">Probation</option>
          </select>
        </div>
      </div>

      <div class="pt-2">
        <button 
          type="submit" 
          :disabled="isSubmitting"
          class="w-full py-3 px-6 bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 text-white font-semibold text-sm rounded-xl transition duration-200 shadow-lg shadow-indigo-600/25 active:scale-[0.99] flex items-center justify-center space-x-2 cursor-pointer disabled:opacity-50"
        >
          <svg v-if="isSubmitting" class="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <span>{{ isSubmitting ? 'Saving Record...' : 'Submit Student Record' }}</span>
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'

const emit = defineEmits(['add-student'])
const isSubmitting = ref(false)

const form = reactive({
  studentId: '',
  fullName: '',
  program: 'BSCS',
  yearLevel: '1st Year',
  status: 'Enrolled'
})

const errors = reactive({ studentId: '', fullName: '' })

const resetForm = () => {
  form.studentId = ''
  form.fullName = ''
  form.program = 'BSCS'
  form.yearLevel = '1st Year'
  form.status = 'Enrolled'
  errors.studentId = ''
  errors.fullName = ''
}

const handleSubmit = async () => {
  errors.studentId = form.studentId ? '' : 'Student ID is required.'
  errors.fullName = form.fullName ? '' : 'Full Name is required.'

  if (!errors.studentId && !errors.fullName) {
    isSubmitting.value = true
    await new Promise(res => setTimeout(res, 250))
    emit('add-student', { ...form })
    resetForm()
    isSubmitting.value = false
  }
}
</script>