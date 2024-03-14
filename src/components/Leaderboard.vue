<script setup lang="ts">
import { IPlayer } from '../interfaces/player.interface'

const props = defineProps<({
  players: IPlayer[]
})>()

</script>

<template>
<head>
<link
    rel="stylesheet"
    href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css"
    />

</head>

<div class="bg-gray-300 rounded">   
    <div class="p-2">
        <h2 class="">Leaderboard</h2>
    <div v-if="props.players.length == 0">
        <p class="text-red-500">No scores added yet</p>
    </div>
    <div>
        <div  class="flex justify-between" v-for="score in props.players" :key="score.playerName">
            <div>
                <h3 class="">{{ score.playerName }}</h3>
            </div>
            <div class="mr-5">
                <p>{{ score.score }}</p>
            </div>
        
        </div>
    </div>
    </div>
</div>
</template>