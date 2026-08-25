<script setup>
defineProps({
  totalStudents: { type: Number, default: 0 },
  isDarkMode: { type: Boolean, default: false }
})

defineEmits(['toggle-dark-mode'])
</script>

<template>
  <header class="bg-slate-900 border-b border-slate-800 text-white sticky top-0 z-50">
    <div class="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      
      <!-- Brand & Title -->
      <div class="flex items-center gap-3">
        <div class="bg-gradient-to-tr from-indigo-600 to-violet-500 p-2.5 rounded-xl shadow-lg shadow-indigo-500/20 shrink-0">
          <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 14l9-5-9-5-9 5 9 5z"/>
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0112 20.055a11.952 11.952 0 01-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"/>
          </svg>
        </div>
        <div>
          <h1 class="text-base sm:text-lg font-bold tracking-tight text-white leading-tight">Student Record System</h1>
          <p class="text-xs text-slate-400">Integrated Academic Management Hub</p>
        </div>
      </div>

      <!-- Controls Container -->
      <div class="flex items-center justify-between sm:justify-end w-full sm:w-auto gap-2.5 sm:gap-3">
        
        <!-- Responsive Dark Mode Toggle -->
        <button 
          @click="$emit('toggle-dark-mode')" 
          type="button"
          class="flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700/80 active:scale-95 border border-slate-700/80 text-slate-300 hover:text-white transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
          :aria-label="isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'"
        >
          <!-- Sun Icon (Dark Mode Active) -->
          <svg v-if="isDarkMode" class="w-4 h-4 text-amber-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
          <!-- Moon Icon (Light Mode Active) -->
          <svg v-else class="w-4 h-4 text-indigo-300 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
          </svg>
          
          <!-- Label adapts across screens -->
          <span class="text-xs font-medium hidden md:inline">
            {{ isDarkMode ? 'Light Mode' : 'Dark Mode' }}
          </span>
        </button>

        <!-- System Status Badge -->
        <span class="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 px-3 py-2 rounded-xl text-xs font-medium">
          <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0"></span> 
          <span class="hidden sm:inline">System Operational</span>
          <span class="sm:hidden">Active</span>
        </span>
        
        <!-- Total Records Badge -->
        <div class="bg-slate-800 border border-slate-700/80 px-3.5 py-2 rounded-xl text-xs text-slate-300 font-medium">
          Records: <span class="text-white font-bold text-sm ml-0.5">{{ totalStudents }}</span>
        </div>

      </div>
    </div>
  </header>
</template>