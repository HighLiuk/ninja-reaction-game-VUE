<template>
  <div class="row">
    <div class="col-md-8 offset-md-2">
      <p class="lead" v-if="!isLoaded">Loading...</p>
      <table class="table table-striped table-hover" v-else>
        <thead>
          <tr class="table-success">
            <th class="short" scope="col">Ranking</th>
            <th scope="col">Player</th>
            <th scope="col">Score</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(ranking, index) in rankings">
            <th class="short" scope="row">{{ index + 1 }}</th>
            <td>{{ ranking.name }}</td>
            <td>{{ ranking.score }} ms</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { hallOfFame } from "@/firebase"

export default {
  data() {
    return {
      isLoaded: false,
      rankings: null,
    }
  },
  mounted() {
    this.showTable()
  },
  methods: {
    async showTable() {
      this.rankings = await hallOfFame()
      this.isLoaded = true
    },
  },
}
</script>

<style lang="scss" scoped>
.short {
  max-width: 50px;
}
</style>
