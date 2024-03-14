<script setup lang="ts">
import { IPlayer } from '../interfaces/player.interface'
const props = defineProps<({
  player: IPlayer
})>()

</script>

<template>

    <h2>{{ props.player.playerName }}</h2>

</template>