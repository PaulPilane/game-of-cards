<script setup lang="ts">
import Navigation from './components/Navigation-bar.vue';
</script>

<template>
  <div class="relative">
    <div class="fixed left-0 right-0 top-0">
        <Navigation/>
    </div>
    <div class="mt-20 py-5">
    <router-view></router-view>
  </div>
    
  </div>
  
</template>
