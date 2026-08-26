<template>
  <header class="bg-slate-900/80 backdrop-blur-md border-b border-slate-800 sticky top-0 z-40">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      
      <!-- Brand Section -->
      <div class="flex items-center space-x-3">
        <div class="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center font-bold text-white text-lg shadow-lg shadow-indigo-500/20">
          S
        </div>
        <div>
          <h1 class="text-lg sm:text-xl font-bold text-slate-100 tracking-tight">Student Record System</h1>
          <p class="text-xs text-slate-400 font-mono">INTEGRATED ACADEMIC MANAGEMENT HUB</p>
        </div>
      </div>

      <!-- Control Badges & Active Theme Toggle -->
      <div class="flex items-center gap-3">
        
        <!-- Live Total Counter Badge -->
        <div class="px-3 py-1.5 bg-slate-800/80 text-slate-300 rounded-xl border border-slate-700/60 text-xs font-medium shadow-sm flex items-center gap-1.5">
          <span class="text-slate-400">Total Students:</span>
          <span class="text-indigo-400 font-bold font-mono bg-indigo-500/10 px-1.5 py-0.5 rounded-md border border-indigo-500/20">
            {{ totalStudents }}
          </span>
        </div>

        <!-- Fully Active & Animated Dark/Light Mode Button -->
        <button 
          @click="$emit('toggle-theme')" 
          type="button"
          :aria-label="isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'"
          class="group relative flex items-center gap-2.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all duration-300 cursor-pointer border select-none active:scale-95 focus:outline-none focus:ring-2 focus:ring-amber-400/40 focus:ring-offset-2 focus:ring-offset-slate-950"
          :class="[
            isDarkMode 
              ? 'bg-slate-800/90 hover:bg-slate-800 text-slate-200 border-slate-700/80 shadow-md hover:shadow-amber-500/10 hover:border-amber-500/40' 
              : 'bg-amber-50/90 hover:bg-white text-amber-950 border-amber-300 shadow-md hover:shadow-amber-500/20 hover:border-amber-400'
          ]"
        >
          <!-- Dynamic Animated Icon Wrapper -->
          <div class="relative w-4 h-4 flex items-center justify-center overflow-hidden">
            
            <!-- Moon Icon (Rotates and Scales out when Light Mode is active) -->
            <svg 
              class="w-4 h-4 text-amber-400 transition-all duration-500 transform absolute"
              :class="isDarkMode ? 'rotate-0 scale-100 opacity-100 group-hover:rotate-12' : '-rotate-90 scale-0 opacity-0'"
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
            </svg>

            <!-- Sun Icon (Rotates and Scales in when Light Mode is active) -->
            <svg 
              class="w-4 h-4 text-amber-500 transition-all duration-500 transform absolute"
              :class="!isDarkMode ? 'rotate-0 scale-100 opacity-100 group-hover:rotate-45' : 'rotate-90 scale-0 opacity-0'"
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>

          </div>

          <!-- Dynamic Label Text -->
          <span class="tracking-wide">
            {{ isDarkMode ? 'Dark Mode' : 'Light Mode' }}
          </span>

          <!-- Subtle Glow Dot Indicator -->
          <span 
            class="w-1.5 h-1.5 rounded-full transition-colors duration-300"
            :class="isDarkMode ? 'bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.8)]' : 'bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.8)]'"
          ></span>
        </button>

        <!-- System Status Indicator -->
        <div class="inline-flex items-center px-2.5 py-1.5 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-medium shadow-sm">
          <span class="relative flex h-2 w-2 mr-2">
            <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span class="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          Operational
        </div>

      </div>

    </div>
  </header>
</template>

<script setup>
defineProps({
  totalStudents: { type: Number, default: 0 },
  isDarkMode: { type: Boolean, default: true }
})

defineEmits(['toggle-theme'])
</script>