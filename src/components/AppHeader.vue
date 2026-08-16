<script setup>
defineProps({
  totalStudents: { type: Number, default: 0 }
})
</script>

<template>
  <header class="bg-slate-900 text-white p-4 shadow-md flex justify-between items-center">
    <div class="flex items-center gap-3">
      <h1 class="text-xl font-bold tracking-wide">Student Record System</h1>
      <span class="flex items-center gap-1.5 text-xs bg-slate-800 border border-slate-700 px-2.5 py-1 rounded-full text-emerald-400">
        <span class="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span> System Active
      </span>
    </div>
    <div class="bg-indigo-600 text-xs font-semibold px-3 py-1.5 rounded-md shadow">
      Total Records: <span class="text-sm font-bold ml-1">{{ totalStudents }}</span>
    </div>
  </header>
</template>