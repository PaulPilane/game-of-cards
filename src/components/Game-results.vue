<script setup lang="ts">
import { IPlayer } from '../interfaces/player.interface'

const props = defineProps<({
  winner: IPlayer | 'draw' | null,

})>()

</script>

<template>
<div class="bg-gray-300 rounded">
    <div class="p-2">
        <h1 slot="header">Game Results</h1>
        <div v-if="props.winner == null">
            <p class="text-red-500">No winner yet</p>
        </div>
        <div v-if="props.winner == 'draw'">
            <p class="text-red-500">It's a draw</p>
        </div>
        <div v-if="props.winner != null && props.winner != 'draw'">
            <p class="text-green-500">{{ props.winner.playerName }} wins</p>
        </div>
    </div>
</div>


</template>

