<template>

<!-- Calling an api -->
  <!-- <div>
      {{ responseData }}
  </div> -->
  <div id="draw">
    <div class="flex justify-center py-5">
        <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        v-on:click="draw">
        Draw a card
      </button>
    </div>
  
  <div class="ml-5">
    <div class="grid grid-cols-4 gap-4 content-center" v-if="responseData">
      <img class="py-5" v-for="card in responseData.piles.Paul.cards" :key="card.code" :src="card.image" :alt="card.code" />
    </div>
  </div>
</div>

</template>


<!-- Script to consume api data using Axios -->
<script>

import axios from 'axios';
import { ref } from 'vue'

export default {
  data() {
    return {

      // Initially, there will be no response. This is to store returned data from the API
      responseData: null
    };
  },
  async created() {
    try {
   
      // Storing deck id in sessionStorage so that we can use it later to shuffle same deck of cards again
      // The deck id will be deleted or cleared when the browser is closed
      const deckId = sessionStorage.getItem("deckId");

      //  Populating the posts array with the response data

      // If the game is being played for the first time, then we will get a new deck id
      if(deckId == null) {
        const response = await axios.get(`https://www.deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1`);
        sessionStorage.setItem("deckId", response.data.deck_id);
        this.responseData = response.data;
      }
      // If the game is being played again, then we will shuffle the same deck of cards by passing the stored deck id
      else {
        const response = await axios.get(`https://www.deckofcardsapi.com/api/deck/${deckId}/shuffle/?remaining=true`);
        this.responseData = response.data;
      }
    
    } catch (error) {
      console.error(error);
    }
  },
  methods: {
    async draw(){
      try{
        const deckId = sessionStorage.getItem("deckId");
        let response = await axios.get(`https://www.deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`);
        this.responseData = response.data
        await axios.get(`https://www.deckofcardsapi.com/api/deck/${deckId}/pile/Paul/add/?cards=${response.data.cards[0].code}`);
        response = await axios.get(`https://www.deckofcardsapi.com/api/deck/${deckId}/pile/Paul/list/`);
        this.responseData = response.data
        
      } catch(error) {
        console.error(error);
      }
    }
  }

  
};

</script>