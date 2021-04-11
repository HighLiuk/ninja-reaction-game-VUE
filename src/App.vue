<template>
  <div class="container page">
    <h1>Ninja Reaction Timer</h1>
    <div class="row">
      <div class="col">
        <button
          class="btn btn-success btn-play"
          @click="start"
          :disabled="isPlaying"
        >
          {{ playButtonText }}
        </button>
      </div>
      <div class="col">
        <button
          class="btn btn-primary btn-play"
          @click="rankings"
          :disabled="isPlaying"
        >
          Hall of Fame
        </button>
      </div>
    </div>
    <hr class="my-4" />
    <Block v-if="isPlaying" :delay="delay" @end="end" @cheat="cheat" />
    <Results v-if="showResults" :score="score" :average="average(scores)" />
    <Cheater v-if="cheated" />
    <HallOfFame v-if="showHallOfFame" />
  </div>
</template>

<script>
import Block from "./Block"
import Results from "./Results"
import Cheater from "./Cheater"
import HallOfFame from "./HallOfFame"

export default {
  components: {
    Block,
    Results,
    Cheater,
    HallOfFame,
  },
  data() {
    return {
      isPlaying: false,
      showResults: false,
      showHallOfFame: false,
      cheated: false,
      playButtonText: "Play",
      delay: null,
      score: null,
      scores: [],
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
      this.playButtonText = "Try Again"
    },
    cheat() {
      this.cheated = true
      setTimeout(() => {
        this.isPlaying = false
        this.showResults = false
        this.cheated = false
      }, 4000)
      this.playButtonText = "Try Again"
    },
    rankings() {
      this.showHallOfFame = true
      this.showResults = false
    },
    average(nums) {
      return Math.ceil(nums.reduce((a, b) => a + b) / nums.length)
    },
  },
}
</script>

<style lang="scss">
body {
  overflow: overlay;
}
.page {
  text-align: center;
  padding: 3rem;
  color: #444;
}
.btn-play {
  margin: 1rem 0 0.5rem;
}
</style>
