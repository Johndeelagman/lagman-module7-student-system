<script setup>
import { ref, computed, onMounted } from 'vue'

const students = ref([])
const search = ref('')
const selectedProgram = ref('All')

onMounted(() => {
  const saved = localStorage.getItem('lagman-student-records')
  students.value = saved ? JSON.parse(saved) : []
})

function save() {
  localStorage.setItem('lagman-student-records', JSON.stringify(students.value))
}

function handleAddOrUpdate(record) {
  const index = students.value.findIndex(s => s.id === record.id)
  if (index !== -1) {
    students.value[index] = { ...record }
  } else {
    students.value.push({ ...record, id: Date.now() })
  }
  save()
}

function handleDelete(id) {
  if (window.confirm('Are you sure you want to remove this student?')) {
    students.value = students.value.filter(s => s.id !== id)
    save()
  }
}

const filteredStudents = computed(() => {
  const term = search.value.toLowerCase().trim()
  return students.value.filter(s => {
    const matchesSearch = s.name.toLowerCase().includes(term) || s.studentNo.toLowerCase().includes(term)
    const matchesProgram = selectedProgram.value === 'All' || s.program === selectedProgram.value
    return matchesSearch && matchesProgram
  })
})
</script>