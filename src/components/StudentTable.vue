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

const getBadgeStyles = (status) => {
  switch (status) {
    case 'Enrolled': return 'bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-200/80 dark:border-emerald-500/20'
    case 'Inactive': return 'bg-rose-50 dark:bg-rose-500/10 text-rose-700 dark:text-rose-400 border-rose-200/80 dark:border-rose-500/20'
    case 'On Leave': return 'bg-amber-50 dark:bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-200/80 dark:border-amber-500/20'
    default: return 'bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700'
  }
}
</script>

<template>
  <div class="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl shadow-sm overflow-hidden transition-colors duration-300">
    <div class="p-5 border-b border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
      <div>
        <h2 class="text-base font-semibold text-slate-900 dark:text-white">Student Directory</h2>
        <p class="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Overview of registered students and academic status</p>
      </div>

      <div class="relative w-full sm:w-72">
        <svg class="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
        </svg>
        <input 
          v-model="searchQuery" 
          type="text" 
          placeholder="Search by ID, name, or program..." 
          class="w-full bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-xl pl-9 pr-3.5 py-2 text-xs dark:text-white transition outline-none focus:bg-white dark:focus:bg-slate-800 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600"
        />
      </div>
    </div>

    <div class="overflow-x-auto">
      <table class="w-full text-left text-sm">
        <thead>
          <tr class="bg-slate-50/80 dark:bg-slate-800/50 border-b border-slate-200/80 dark:border-slate-800 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
            <th class="py-3 px-4">Student ID</th>
            <th class="py-3 px-4">Full Name</th>
            <th class="py-3 px-4">Program</th>
            <th class="py-3 px-4">Year Level</th>
            <th class="py-3 px-4">Status</th>
            <th class="py-3 px-4 text-right">Actions</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-slate-100 dark:divide-slate-800">
          <tr v-for="student in filteredStudents" :key="student.studentId" class="hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors">
            <td class="py-3.5 px-4 font-mono text-xs text-slate-600 dark:text-slate-400 font-medium">{{ student.studentId }}</td>
            <td class="py-3.5 px-4 font-semibold text-slate-800 dark:text-slate-200">{{ student.fullName }}</td>
            <td class="py-3.5 px-4 text-slate-600 dark:text-slate-400 text-xs font-medium">{{ student.program }}</td>
            <td class="py-3.5 px-4 text-slate-600 dark:text-slate-400 text-xs">{{ student.yearLevel }}</td>
            <td class="py-3.5 px-4">
              <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border" :class="getBadgeStyles(student.status)">
                {{ student.status }}
              </span>
            </td>
            <td class="py-3.5 px-4 text-right space-x-1">
              <button 
                @click="$emit('edit-student', student)" 
                class="px-2.5 py-1 rounded-lg text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-950/50 transition cursor-pointer"
              >
                Edit
              </button>
              <button 
                @click="confirmDelete(student)" 
                class="px-2.5 py-1 rounded-lg text-xs font-semibold text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/50 transition cursor-pointer"
              >
                Delete
              </button>
            </td>
          </tr>
          <tr v-if="filteredStudents.length === 0">
            <td colspan="6" class="text-center py-10 text-slate-400 dark:text-slate-500 text-xs">
              No matching records found. Try adjusting your search query.
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>