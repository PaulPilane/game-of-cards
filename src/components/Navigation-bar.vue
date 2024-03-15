<script setup lang="ts">
import { ref } from 'vue';


let routeToHelp = ref<boolean>(true);

let currentPage = ref<string>('/help');


function toggleRouteToHelp() {
    routeToHelp.value = !routeToHelp.value;
    currentPage.value = routeToHelp.value ? '/help' : '/';
}

</script>

<template>

    <head>
         <link
      rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css"
    />

    </head>
    <div class="bg-gray-100 flex justify-between">
        <div class="py-2 px-2">
            <img src="../assets/iotdc_logo_dark.png" class="object-contain w-20 h-15" alt="IoTDC">
        </div>
        <div class="flex items-center px-2">
            <router-link @click="toggleRouteToHelp" :to="currentPage"><span class="fa fa-question-circle" aria-hidden="true"></span></router-link>
        </div>
    </div>
</template>
