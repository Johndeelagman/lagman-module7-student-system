
<template>
  <div class="bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-6 shadow-xl space-y-4">
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <h2 class="text-lg font-semibold text-slate-100">Student Directory</h2>
        <p class="text-xs text-slate-400">
          Overview of registered students and academic status
        </p>
      </div>

      <div class="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
        <!-- Search -->
        <div class="relative w-full sm:w-64">
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Search by ID, name, or program..."
            class="w-full pl-9 pr-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500"
          />

          <svg
            class="w-4 h-4 text-slate-500 absolute left-3 top-2.5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>

        <!-- NEW: Status Filter -->
        <select
          v-model="selectedStatus"
          class="w-full sm:w-40 px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-100 focus:outline-none focus:border-indigo-500"
        >
          <option
            v-for="status in statusOptions"
            :key="status"
            :value="status"
          >
            {{ status }}
          </option>
        </select>
      </div>
    </div>

    <div class="overflow-x-auto rounded-xl border border-slate-800">
      <table class="w-full text-left border-collapse min-w-[650px]">
        <thead>
          <tr
            class="bg-slate-950 text-[11px] font-semibold text-slate-400 uppercase tracking-wider border-b border-slate-800"
          >
            <th class="py-3 px-4">Student ID</th>
            <th class="py-3 px-4">Full Name</th>
            <th class="py-3 px-4">Program</th>
            <th class="py-3 px-4">Year Level</th>
            <th class="py-3 px-4">Status</th>
            <th class="py-3 px-4 text-right">Actions</th>
          </tr>
        </thead>

        <tbody class="divide-y divide-slate-800/60 text-xs text-slate-300">
          <tr
            v-for="student in filteredStudents"
            :key="student.studentId"
            class="hover:bg-slate-800/40 transition"
          >
            <td class="py-3.5 px-4 font-mono text-indigo-400 font-medium">
              {{ student.studentId }}
            </td>

            <td class="py-3.5 px-4 font-medium text-slate-100">
              {{ student.fullName }}
            </td>

            <td class="py-3.5 px-4">
              {{ student.program }}
            </td>

            <td class="py-3.5 px-4">
              {{ student.yearLevel }}
            </td>

            <td class="py-3.5 px-4">
              <span
                :class="getBadgeStyles(student.status)"
                class="px-2.5 py-1 rounded-full text-[10px] font-semibold border"
              >
                {{ student.status }}
              </span>
            </td>

            <td class="py-3.5 px-4 text-right space-x-2">
              <!-- Active Edit Button -->
              <button
                @click="$emit('edit-student', student)"
                class="px-2.5 py-1 bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-400 border border-indigo-500/20 active:scale-95 rounded-lg text-xs font-medium transition cursor-pointer"
              >
                Edit
              </button>

              <!-- Active Delete Button -->
              <button
                @click="$emit('delete-student', student)"
                class="px-2.5 py-1 bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/20 active:scale-95 rounded-lg text-xs font-medium transition cursor-pointer"
              >
                Delete
              </button>
            </td>
          </tr>

          <tr v-if="filteredStudents.length === 0">
            <td colspan="6" class="py-10 text-center text-slate-500 text-xs">
              No matching records found. Try adjusting your search or status filter.
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  students: { type: Array, default: () => [] }
})

defineEmits(['edit-student', 'delete-student'])

const searchQuery = ref('')

// NEW: Selected enrollment status
const selectedStatus = ref('All')

// NEW: Available status filter options
const statusOptions = [
  'All',
  'Enrolled',
  'Inactive',
  'On Leave',
  'Graduated',
  'Probation'
]

// Updated filtering logic:
// Search filter + Status filter work together
const filteredStudents = computed(() => {
  const q = searchQuery.value.trim().toLowerCase()

  return props.students.filter(student => {
    const matchesSearch =
      !q ||
      student.fullName.toLowerCase().includes(q) ||
      student.studentId.toLowerCase().includes(q) ||
      student.program.toLowerCase().includes(q)

    const matchesStatus =
      selectedStatus.value === 'All' ||
      student.status === selectedStatus.value

    return matchesSearch && matchesStatus
  })
})

const getBadgeStyles = (status) => {
  switch (status) {
    case 'Enrolled':
      return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
    case 'Inactive':
      return 'bg-rose-500/10 text-rose-400 border-rose-500/20'
    case 'On Leave':
      return 'bg-amber-500/10 text-amber-400 border-amber-500/20'
    case 'Graduated':
      return 'bg-purple-500/10 text-purple-400 border-purple-500/20'
    case 'Probation':
      return 'bg-orange-500/10 text-orange-400 border-orange-500/20'
    default:
      return 'bg-slate-800 text-slate-300 border-slate-700'
  }
}
</script>

