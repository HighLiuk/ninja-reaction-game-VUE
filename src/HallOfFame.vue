<template lang="pug">
.row
  .col-md-8.offset-md-2
    p.lead(v-if="!isLoaded") Loading...
    table.table.table-striped.table-hover(v-else)
      thead
        tr.table-success
          th.short(scope="col") Ranking
          th(scope="col") Player
          th(scope="col") Score
      tbody
        tr(v-for="(ranking, index) in rankings")
          th.short(scope="row") {{ index + 1 }}
          td {{ ranking.name }}
          td {{ ranking.score }} ms
</template>

<script>
import { hallOfFame } from '@/firebase'

export default {
  data() {
    return {
      isLoaded: false,
      rankings: null
    }
  },
  mounted() {
    this.showTable()
  },
  methods: {
    async showTable() {
      this.rankings = await hallOfFame()
      this.isLoaded = true
    }
  }
}
</script>

<style lang="sass" scoped>
.short
  max-width: 50px
</style>