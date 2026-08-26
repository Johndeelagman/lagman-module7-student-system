<script setup>
import { ref, onMounted, watch } from 'vue'
import AppHeader from './components/AppHeader.vue'
import StudentForm from './components/StudentForm.vue'
import StudentTable from './components/StudentTable.vue'
import EditStudentModal from './components/EditStudentModal.vue'
import DeleteConfirmationModal from './components/DeleteConfirmationModal.vue'
import AppFooter from './components/AppFooter.vue'

const defaultStudents = [
  { studentId: '2026-0001', fullName: 'Juan Cruz', program: 'BSCS', yearLevel: '3rd Year', status: 'Enrolled' },
  { studentId: '2026-0002', fullName: 'Maria Santos', program: 'BSCpE', yearLevel: '4th Year', status: 'Graduated' }
]

const students = ref([])
const isDarkMode = ref(true)

// Modals State
const isDeleteModalOpen = ref(false)
const isEditModalOpen = ref(false)
const studentToEdit = ref(null)
const studentToDelete = ref(null)

onMounted(() => {
  const savedStudents = localStorage.getItem('student_records')
  students.value = savedStudents ? JSON.parse(savedStudents) : defaultStudents

  const savedTheme = localStorage.getItem('app_theme')
  if (savedTheme) isDarkMode.value = savedTheme === 'dark'
})

watch(students, (newVal) => {
  localStorage.setItem('student_records', JSON.stringify(newVal))
}, { deep: true })

const toggleTheme = () => {
  isDarkMode.value = !isDarkMode.value
  localStorage.setItem('app_theme', isDarkMode.value ? 'dark' : 'light')
}

// Add New
const handleAddStudent = (newStudent) => {
  students.value.unshift(newStudent)
}

// Edit Flow
const triggerEditModal = (student) => {
  studentToEdit.value = { ...student }
  isEditModalOpen.value = true
}

const handleUpdateStudent = (updatedStudent) => {
  const index = students.value.findIndex(s => s.studentId === updatedStudent.studentId)
  if (index !== -1) {
    students.value[index] = updatedStudent
  }
  isEditModalOpen.value = false
}

// Delete Flow
const triggerDeleteModal = (student) => {
  studentToDelete.value = student
  isDeleteModalOpen.value = true
}

const confirmDelete = () => {
  if (studentToDelete.value) {
    students.value = students.value.filter(s => s.studentId !== studentToDelete.value.studentId)
  }
  isDeleteModalOpen.value = false
}
</script>

<template>
  <div :class="{ 'dark': isDarkMode }" class="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
    <AppHeader 
      :totalStudents="students.length" 
      :isDarkMode="isDarkMode"
      @toggle-theme="toggleTheme" 
    />

    <main class="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <StudentForm @add-student="handleAddStudent" />

      <StudentTable 
        :students="students" 
        @edit-student="triggerEditModal"
        @delete-student="triggerDeleteModal" 
      />
    </main>

    <!-- Interactive Edit Modal -->
    <EditStudentModal 
      :isOpen="isEditModalOpen" 
      :studentData="studentToEdit"
      @save="handleUpdateStudent"
      @cancel="isEditModalOpen = false"
    />

    <!-- Delete Confirmation Modal -->
    <DeleteConfirmationModal 
      :isOpen="isDeleteModalOpen" 
      :studentName="studentToDelete?.fullName" 
      @confirm="confirmDelete" 
      @cancel="isDeleteModalOpen = false" 
    />

    <AppFooter />
  </div>
</template>