<template lang="pug">
.container.page
  h1 Ninja Reaction Timer
  .row
    .col
      button.btn.btn-success.btn-play(@click="start" :disabled="isPlaying") {{ playButtonText }}
    .col
      button.btn.btn-primary.btn-play(@click="rankings" :disabled="isPlaying") Hall of Fame
  hr.my-4
  Block(v-if="isPlaying" :delay="delay" @end="end" @cheat="cheat")
  Results(v-if="showResults" :score="score" :average="average(scores)")
  Cheater(v-if="cheated")
  HallOfFame(v-if="showHallOfFame")
</template>

<script>
import Block from './Block'
import Results from './Results'
import Cheater from './Cheater'
import HallOfFame from './HallOfFame'

export default {
  components: {
    Block,
    Results,
    Cheater,
    HallOfFame
  },
  data() {
    return {
      isPlaying: false,
      showResults: false,
      showHallOfFame: false,
      cheated: false,
      playButtonText: 'Play',
      delay: null,
      score: null,
      scores: []
    }
  },
  methods: {
    start() {
      this.isPlaying = true
      this.showResults = false
      this.showHallOfFame = false
      this.delay = 2000 + Math.random() * 5000
    },
    end(time) {
      this.isPlaying = false
      this.score = time
      this.scores.push(time)
      this.showResults = true
      this.playButtonText = 'Try Again'
    },
    cheat() {
      this.cheated = true
      this.playButtonText = 'Try Again'
      setTimeout(() => {
        this.isPlaying = false
        this.showResults = false
        this.cheated = false
      }, 4000)
    },
    rankings() {
      this.showHallOfFame = true
      this.showResults = false
    },
    average(nums) {
      return Math.ceil(nums.reduce((a, b) => (a + b)) / nums.length)
    }
  }
}
</script>

<style lang="sass">
body
  overflow: overlay
.page
  text-align: center
  padding: 3rem
  color: #444
.btn-play
  margin: 1rem 0 0.5rem
</style>
