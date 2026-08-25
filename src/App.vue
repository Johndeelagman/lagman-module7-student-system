<script setup>
import { ref, watch } from 'vue'
import AppHeader from './components/AppHeader.vue'
import StudentForm from './components/StudentForm.vue'
import StudentTable from './components/StudentTable.vue'
import AppFooter from './components/AppFooter.vue'

const STORAGE_KEY = 'student_records_v1'
const isDarkMode = ref(false)

const toggleDarkMode = () => {
  isDarkMode.value = !isDarkMode.value
}

// Default initial data
const defaultStudents = [
  { studentId: '2026-0001', fullName: 'John Dee', program: 'BSCS', yearLevel: '3rd Year', status: 'Enrolled' },
  { studentId: '2026-0002', fullName: 'Jane Smith', program: 'BSIT', yearLevel: '2nd Year', status: 'On Leave' }
]

// Load initial data from localStorage if available
const savedData = localStorage.getItem(STORAGE_KEY)
const students = ref(savedData ? JSON.parse(savedData) : defaultStudents)

// Sync reactive state directly to localStorage whenever changes occur
watch(students, (newStudents) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(newStudents))
}, { deep: true })

const editingStudent = ref(null)

const handleSaveStudent = (studentData) => {
  const existingIndex = students.value.findIndex(s => s.studentId === studentData.studentId)
  if (existingIndex !== -1) {
    students.value[existingIndex] = studentData
    editingStudent.value = null
  } else {
    students.value.push(studentData)
  }
}

const handleEditStudent = (student) => {
  editingStudent.value = student
}

const handleDeleteStudent = (id) => {
  students.value = students.value.filter(s => s.studentId !== id)
}
</script>

<template>
  <div :class="{ dark: isDarkMode }">
    <div class="min-h-screen bg-slate-100 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col justify-between font-sans transition-colors duration-300">
      <div>
        <AppHeader 
          :totalStudents="students.length" 
          :isDarkMode="isDarkMode" 
          @toggle-dark-mode="toggleDarkMode" 
        />
        
        <main class="max-w-6xl mx-auto p-6 space-y-6">
          <StudentForm 
            :editingStudent="editingStudent" 
            @save-student="handleSaveStudent" 
          />
          <StudentTable 
            :students="students" 
            @edit-student="handleEditStudent" 
            @delete-student="handleDeleteStudent" 
          />
        </main>
      </div>

      <AppFooter />
    </div>
  </div>
</template>