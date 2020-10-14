<template>
  <div>
    <base-header
      class="pb-6 pb-8 pt-5 pt-md-8 bg-gradient-primary"
    ></base-header>
    <card class="min-vh-100 main_body center">
      <div class="row card text-black">
        <div class="col-lg mx-auto form p-4">
          <p v-for="item in searchHistory" :key="item[0]">
            {{item[0] + ': ' + item[1]}}
          </p>
        </div>
      </div>
    </card>
  </div>
</template>
<script>
import axios from "axios";

export default {
  data() {
    return {
      searchHistory: [],
    };
  },
  mounted() {
    this.getSearchHistory();
  },
  methods: {
    async getSearchHistory() {
      let history = await axios.get("http://localhost:3000/search");
      this.searchHistory = Object.entries(history.data).slice().reverse();
    },
  },
};
</script>
<style>
</style>