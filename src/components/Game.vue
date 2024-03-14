<template>

<!-- Calling an api -->
  <!-- <div>
      {{ responseData }}
  </div> -->
  <div class="">
  
  <div class="ml-5">
    <!-- <div class="grid grid-cols-4 gap-4 content-center" v-if="responseData">
      <img class="py-5" v-for="card in responseData.piles.Paul.cards" :key="card.code" :src="card.image" :alt="card.code" />
    </div> -->
  </div>

  <div class="px-2">
     <!-- Taking input from user -->
    <div class="flex justify-between">
      <div class="w-2/5 mb-3">
        <div class="flex ">
          <div>
            <input type="text" v-model="playerName" placeholder="Enter name of player" class="border-2 border-gray-300" />
          </div>
          <div class="ml-5 mt-1">
            <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              v-on:click="addPlayer">
              Add Player
            </button>
          </div>
        </div>
     </div>
     <div class="w-1/5 mb-3">
        <div v-if="cardsRemaining === -1">
          <h2>Cards Remaining: <span class="fas fa-circle-notch fa-spin fa-lg"></span></h2>
        </div>
        <div v-else>
          <h2>Cards Remaining: {{ cardsRemaining }}</h2>
        </div>
        <div>
          <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              v-on:click="startOver">
              Restart
            </button>
        </div>
        
        
     </div>
    </div>
     
      

      <!-- The below card will consist of active players -->

      <div class="flex justify-between">

        <div class="w-1/2">
          <div class="bg-gray-300 p-2">
          <h3>Players</h3>

        <div v-if="players.length == 0">
          <p class="text-red-500">No players added yet</p>
        </div>
        <ul>
          <li class="flex justify-between mb-3 bg-gray-200 rounded" v-for="player in players" :key="player.playerName">
            <div class="p-2">
              <Player :player="player" />
            </div>
            <div class="flex items-center p-2">
              <div class="mr-2">
                <!-- The button will show cards in hnnd -->
                <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded"
                v-on:click="cardsInHand(player.playerName)">
                Cards
                </button>
              </div>
              <div  class="mr-6">
                <!-- The button will draw from the current deck -->
                <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded"
                v-on:click="draw(player.playerName)">
                Draw a card
                </button> 
              </div>
              <div class="mr-2">
                <!-- This button will remove a player from the game -->
                <span @click="removePlayerByName(player.playerName)" class="fa fa-trash cursor-pointer " aria-hidden="true"></span>
              </div>
            </div>
            
          </li>
        </ul>
      </div>

      <!-- The below card will display the leaderboard -->
      <div class="mt-2">
        <Leaderboard :players="players" />
      </div>

        </div>

        <div class="ml-2">
          <div class="grid grid-cols-4 gap-4 content-center" v-if="pile.length > 0 && showPile ">
          <img class="py-5" v-for="card in pile" :key="card.code" :src="card.image" :alt="card.code" />
          </div>

          <img v-if="card && showDrawn" :src="card.image" alt="Image of card">
        </div>

      </div>
      
  </div>


</div>

</template>


<!-- Script to consume api data using Axios -->
<script lang="ts">

import axios from 'axios';
import Player from './Player.vue';
import Leaderboard from './Leaderboard.vue';
// import {ref} from 'vue';
import { IPlayer } from '../interfaces/player.interface'
import { ICard } from '../interfaces/card.interface'


export default {
    data() {
        return {
            // Initially, there will be no response. This is to store returned data from the API
            responseData: null,
            playerName: '',
            players : [] as IPlayer[],
            cardsRemaining: -1,
            pile: [] as ICard[],
            card: null as any, 
            showPile: false, 
            showDrawn: false,
            activePlayer: ''
        };
    },
    async created() {
        try {
            // Storing deck id in sessionStorage so that we can use it later to shuffle same deck of cards again
            // The deck id will be deleted or cleared when the browser is closed
            const deckId = sessionStorage.getItem("deckId");
            //  Populating the posts array with the response data
            // If the game is being played for the first time, then we will get a new deck id
            if (deckId == null) {
                const response = await axios.get(`https://www.deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1`);
                sessionStorage.setItem("deckId", response.data.deck_id);
                this.responseData = response.data;
                this.cardsRemaining = response.data.remaining;
            }
            // If the game is being played again, then we will shuffle the same deck of cards by passing the stored deck id
            else {
                const response = await axios.get(`https://www.deckofcardsapi.com/api/deck/${deckId}/shuffle/?remaining=true`);
                this.responseData = response.data;
                this.cardsRemaining = response.data.remaining;
            }
            
        }
        catch (error) {
            console.error(error);
        }
    },
    methods: {
        async draw(playerName: string) {
            try {
                const deckId = sessionStorage.getItem("deckId");
                let response = await axios.get(`https://www.deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`);
                let score = response.data.cards[0].value;
                if(score == "QUEEN" || score == "ACE" || score == "JACK" || score == "KING") {
                    score = 10;
                }
                this.responseData = response.data;
                await axios.get(`https://www.deckofcardsapi.com/api/deck/${deckId}/pile/${playerName}/add/?cards=${response.data.cards[0].code}`);
                console.log(this.responseData, score, this.findPlayerByName(playerName).score )
                this.findPlayerByName(playerName).hasPile = true;
                this.findPlayerByName(playerName).score += Number(score);
                this.cardsRemaining = response.data.remaining;
                this.showDrawn = true;
                this.showPile = false;
                this.card = response.data.cards[0];
                this.sort();
            }
            catch (error) {
                console.error(error);
            }
        },

        addPlayer() {
          this.playerName = this.playerName.trim();

          if(this.playerName !== ''){
            if(this.contains(this.playerName)){
              alert('Player already exists');
            }
            else {
            const player: IPlayer = {
              playerName: this.playerName,
              score: 0,
              hasPile: false
            }
              this.players.push(player);
              this.playerName='';
            }
          }
          else {
            alert('Please enter a name');
          }
        }, 
        removePlayerByIndex(index: number){
          this.players.splice(index, 1);
          return;
        },
        addScore(player: IPlayer){
          player.score++;
        },
        removeScore(player: IPlayer){
          player.score--;
        },
        resetScore(player: IPlayer){
          player.score = 0;
        },
        contains(playerName: string){
          return this.players.some(player => player.playerName.toLowerCase() === playerName.toLowerCase()) && this.players.length > 0;
        },
        removePlayerByName(playerName: string){
          const index = this.players.findIndex(player => player.playerName.toLowerCase() === playerName.toLowerCase());
          this.removePlayerByIndex(index);
        },
        findPlayerByName(playerName: string) {
          const index = this.players.findIndex(player => player.playerName === playerName);
          return this.players[index];
        },
        async cardsInHand(playerName: string) {
          console.log(this.findPlayerByName(playerName))
          if(this.findPlayerByName(playerName).hasPile){
            const deckId = sessionStorage.getItem("deckId");
          let response = await axios.get(`https://www.deckofcardsapi.com/api/deck/${deckId}/pile/${playerName}/list/`);
          this.responseData = response.data;
            this.pile = response.data.piles[playerName].cards as ICard[];
            this.showPile = !this.showPile
            this.showDrawn = false;
            console.log(this.pile as ICard[]);
          }
          else {
            alert(playerName + " has no cards in hand!")
          }
         
        },
        async startOver() {
          try{
            let response = await axios.get(`https://www.deckofcardsapi.com/api/deck/new/`);
            let deckId = response.data.deck_id;
            sessionStorage.setItem("deckId", deckId);
            this.cardsRemaining = response.data.remaining;
            this.players = [];
            this.pile = [];
            this.showPile = false;
            this.showDrawn = false;
          }
          catch(error) {
            console.log(error)
          }
          
        },
        sort() {
          this.players.sort((a, b) => b.score - a.score)
        }

        
    },
    components: { Player, Leaderboard }
};

</script>