<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  students: { type: Array, default: () => [] }
})

const emit = defineEmits(['edit-student', 'delete-student'])

const searchQuery = ref('')

const filteredStudents = computed(() => {
  if (!searchQuery.value.trim()) return props.students
  const query = searchQuery.value.toLowerCase()
  return props.students.filter(s => 
    s.fullName.toLowerCase().includes(query) ||
    s.studentId.toLowerCase().includes(query) ||
    s.program.toLowerCase().includes(query)
  )
})

const confirmDelete = (student) => {
  if (confirm(`Are you sure you want to delete ${student.fullName}?`)) {
    emit('delete-student', student.studentId)
  }
}

const getBadgeClass = (status) => {
  switch (status) {
    case 'Enrolled': return 'bg-emerald-100 text-emerald-800 border-emerald-300'
    case 'Inactive': return 'bg-rose-100 text-rose-800 border-rose-300'
    case 'On Leave': return 'bg-amber-100 text-amber-800 border-amber-300'
    default: return 'bg-gray-100 text-gray-800 border-gray-300'
  }
}
</script>

<template>
  <div class="bg-white p-5 rounded-lg shadow-md space-y-4 border border-gray-100">
    <div class="flex flex-col sm:flex-row justify-between items-center gap-3 border-b pb-3">
      <h2 class="text-lg font-bold text-gray-800">Student List</h2>
      <input 
        v-model="searchQuery" 
        type="text" 
        placeholder="Search by ID, name, or program..." 
        class="w-full sm:w-64 border border-gray-300 rounded-md px-3 py-1.5 text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
      />
    </div>

    <div class="overflow-x-auto">
      <table class="w-full text-left text-sm border-collapse">
        <thead>
          <tr class="bg-gray-50 border-b border-gray-200 text-gray-600 font-semibold">
            <th class="p-3">Student ID</th>
            <th class="p-3">Full Name</th>
            <th class="p-3">Program</th>
            <th class="p-3">Year Level</th>
            <th class="p-3">Status</th>
            <th class="p-3 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="student in filteredStudents" :key="student.studentId" class="border-b border-gray-100 hover:bg-slate-50 transition">
            <td class="p-3 font-mono text-gray-700">{{ student.studentId }}</td>
            <td class="p-3 font-medium text-gray-900">{{ student.fullName }}</td>
            <td class="p-3 text-gray-600">{{ student.program }}</td>
            <td class="p-3 text-gray-600">{{ student.yearLevel }}</td>
            <td class="p-3">
              <span class="px-2.5 py-0.5 rounded-full text-xs font-medium border" :class="getBadgeClass(student.status)">
                {{ student.status }}
              </span>
            </td>
            <td class="p-3 text-center space-x-2">
              <button @click="$emit('edit-student', student)" class="text-indigo-600 hover:text-indigo-800 font-medium">Edit</button>
              <button @click="confirmDelete(student)" class="text-rose-600 hover:text-rose-800 font-medium">Delete</button>
            </td>
          </tr>
          <tr v-if="filteredStudents.length === 0">
            <td colspan="6" class="text-center p-4 text-gray-400">No matching student records found.</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>