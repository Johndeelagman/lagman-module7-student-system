<script setup>
defineProps({
  isOpen: { type: Boolean, default: false },
  studentName: { type: String, default: '' }
})

defineEmits(['confirm', 'cancel'])
</script>

<template>
  <Transition name="fade">
    <div 
      v-if="isOpen"
      class="fixed inset-0 bg-slate-950/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      @click.self="$emit('cancel')"
    >
      <!-- Modal Content -->
      <div class="bg-slate-900 border border-slate-800 rounded-2xl max-w-md w-full p-6 shadow-2xl">
        <div class="flex items-start space-x-4">
          <div class="p-3 bg-rose-500/10 border border-rose-500/20 rounded-xl text-rose-500 shrink-0">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <div>
            <h3 class="text-lg font-semibold text-slate-100">Delete Student Record</h3>
            <p class="text-xs text-slate-400 mt-1">
              Are you sure you want to remove <span class="font-medium text-slate-200 underline">{{ studentName }}</span>?
            </p>
          </div>
        </div>

        <div class="mt-6 flex items-center justify-end space-x-3">
          <button 
            @click="$emit('cancel')" 
            class="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-sm transition"
          >
            Cancel
          </button>
          <button 
            @click="$emit('confirm')" 
            class="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white font-medium rounded-lg text-sm transition"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  </Transition>
</template>