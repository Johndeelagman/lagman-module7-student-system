<template>
  <div v-if="isOpen" class="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-sm p-4">
    <div class="bg-slate-900 border border-slate-800 rounded-2xl p-6 max-w-lg w-full shadow-2xl space-y-4">
      <div class="flex items-center justify-between border-b border-slate-800 pb-3">
        <h3 class="text-base font-semibold text-slate-100">Edit Student Information</h3>
        <button @click="$emit('cancel')" class="text-slate-400 hover:text-slate-200 text-lg">✕</button>
      </div>

      <div class="space-y-3" v-if="localForm">
        <div>
          <label class="block text-xs font-medium text-slate-400 mb-1">Student ID (Read Only)</label>
          <input :value="localForm.studentId" disabled type="text" class="w-full px-3 py-2 bg-slate-950/60 border border-slate-800 rounded-xl text-xs text-slate-500 cursor-not-allowed" />
        </div>

        <div>
          <label class="block text-xs font-medium text-slate-300 mb-1">Full Name</label>
          <input v-model="localForm.fullName" type="text" class="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-100 focus:border-indigo-500 outline-none" />
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div>
            <label class="block text-xs font-medium text-slate-300 mb-1">Program</label>
            <select v-model="localForm.program" class="w-full px-2 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-100 outline-none">
              <option value="BSCS">BSCS</option>
              <option value="BSIT">BSIT</option>
              <option value="BSEMC">BSEMC</option>
              <option value="BSIS">BSIS</option>
              <option value="BSCpE">BSCpE</option>
              <option value="BDA">BDA</option>
            </select>
          </div>

          <div>
            <label class="block text-xs font-medium text-slate-300 mb-1">Year Level</label>
            <select v-model="localForm.yearLevel" class="w-full px-2 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-100 outline-none">
              <option value="1st Year">1st Year</option>
              <option value="2nd Year">2nd Year</option>
              <option value="3rd Year">3rd Year</option>
              <option value="4th Year">4th Year</option>
            </select>
          </div>

          <div>
            <label class="block text-xs font-medium text-slate-300 mb-1">Status</label>
            <select v-model="localForm.status" class="w-full px-2 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-100 outline-none">
              <option value="Enrolled">Enrolled</option>
              <option value="Inactive">Inactive</option>
              <option value="On Leave">On Leave</option>
              <option value="Graduated">Graduated</option>
              <option value="Probation">Probation</option>
            </select>
          </div>
        </div>
      </div>

      <div class="flex justify-end space-x-2 pt-2 border-t border-slate-800">
        <button @click="$emit('cancel')" class="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-xs font-medium text-slate-300 rounded-xl">Cancel</button>
        <button @click="saveChanges" class="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-xs font-medium text-white rounded-xl shadow-md shadow-indigo-600/30">Save Changes</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  isOpen: Boolean,
  studentData: Object
})

const emit = defineEmits(['save', 'cancel'])
const localForm = ref(null)

watch(() => props.studentData, (newVal) => {
  if (newVal) localForm.value = { ...newVal }
}, { immediate: true })

const saveChanges = () => {
  if (localForm.value) {
    emit('save', localForm.value)
  }
}
</script>