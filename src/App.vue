<script setup lang="ts">
import Navigation from './components/Navigation-bar.vue';
import Game from './components/Game.vue';
</script>

<template>
  <div class="relative">
    <div class="fixed left-0 right-0 top-0">
        <Navigation/>
    </div>
    <div class="mt-6">
        <Game/>
    </div>
    
  </div>
  
</template>

<!-- <style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style> -->
