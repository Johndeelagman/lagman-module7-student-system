<script setup>
import { ref } from 'vue'

const emit = defineEmits(['save-student'])

const props = defineProps({
  editingStudent: { type: Object, default: null }
})

const form = ref({
  studentId: props.editingStudent?.studentId || '',
  fullName: props.editingStudent?.fullName || '',
  program: props.editingStudent?.program || 'BSCS',
  yearLevel: props.editingStudent?.yearLevel || '1st Year',
  status: props.editingStudent?.status || 'Enrolled'
})

const errors = ref({})

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
  <form @submit.prevent="handleSubmit" class="bg-white p-5 rounded-lg shadow-md space-y-4 border border-gray-100">
    <h2 class="text-lg font-bold text-gray-800 border-b pb-2">
      {{ editingStudent ? 'Edit Student Record' : 'Register New Student' }}
    </h2>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <label class="block text-xs font-medium text-gray-700 mb-1">Student ID</label>
        <input 
          v-model="form.studentId" 
          type="text" 
          placeholder="e.g. 2026-0001" 
          :disabled="!!editingStudent"
          class="w-full border rounded-md p-2 text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
          :class="errors.studentId ? 'border-red-500' : 'border-gray-300'"
        />
        <p v-if="errors.studentId" class="text-red-500 text-xs mt-1">{{ errors.studentId }}</p>
      </div>

      <div>
        <label class="block text-xs font-medium text-gray-700 mb-1">Full Name</label>
        <input 
          v-model="form.fullName" 
          type="text" 
          placeholder="e.g. Juan Cruz" 
          class="w-full border rounded-md p-2 text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
          :class="errors.fullName ? 'border-red-500' : 'border-gray-300'"
        />
        <p v-if="errors.fullName" class="text-red-500 text-xs mt-1">{{ errors.fullName }}</p>
      </div>

      <div>
        <label class="block text-xs font-medium text-gray-700 mb-1">Program</label>
        <select v-model="form.program" class="w-full border border-gray-300 rounded-md p-2 text-sm focus:ring-2 focus:ring-indigo-500 outline-none">
          <option>BSCS</option>
          <option>BSIT</option>
          <option>BSEMC</option>
          <option>BSIS</option>
        </select>
      </div>

      <div>
        <label class="block text-xs font-medium text-gray-700 mb-1">Year Level</label>
        <select v-model="form.yearLevel" class="w-full border border-gray-300 rounded-md p-2 text-sm focus:ring-2 focus:ring-indigo-500 outline-none">
          <option>1st Year</option>
          <option>2nd Year</option>
          <option>3rd Year</option>
          <option>4th Year</option>
        </select>
      </div>
    </div>

    <div>
      <label class="block text-xs font-medium text-gray-700 mb-1">Status</label>
      <select v-model="form.status" class="w-full border border-gray-300 rounded-md p-2 text-sm focus:ring-2 focus:ring-indigo-500 outline-none">
        <option>Enrolled</option>
        <option>Inactive</option>
        <option>On Leave</option>
      </select>
    </div>

    <button type="submit" class="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 rounded-md text-sm transition">
      {{ editingStudent ? 'Update Student' : 'Add Student' }}
    </button>
  </form>
</template>