<template>
  <p class="lead">Reaction time: {{ score }} ms</p>
  <h1>{{ rank }}</h1>
  <p class="lead">Average: {{ average }} ms</p>
  <div v-if="!scoreSubmitted">
    <p class="lead">Submit your score (optional)</p>
    <div class="alert alert-danger" role="alert" v-if="!isValid">
      Invalid Input. Your name must be between one and sixteen characters long.
      It can include letters, numbers, spaces and emojis. Not every emoji is
      supported, though.
    </div>
    <div class="d-flex justify-content-center">
      <form @submit.prevent="handleSubmit">
        <div class="form-group">
          <input
            class="form-control"
            type="text"
            placeholder="Enter your name..."
            v-model="name"
          />
        </div>
        <button class="btn btn-primary" type="submit">Submit</button>
      </form>
    </div>
  </div>
  <div v-else>
    <p class="lead">Score submitted!</p>
  </div>
</template>

<script>
import { addRecord } from "@/firebase"
import { inputRegex } from "@/inputRegex"

export default {
  props: ["score", "average"],
  data() {
    return {
      scoreSubmitted: false,
      isValid: true,
      name: "",
      rank: null,
    }
  },
  mounted() {
    if (this.score < 250) this.rank = "🐱‍ Ninja Fingers 🐱‍"
    else if (this.score < 400) this.rank = "🚀 Rapid Reflexes 🚀"
    else this.rank = "🐌 Snail pace... 🐌"
  },
  methods: {
    handleSubmit() {
      this.isValid = inputRegex.test(this.name)
      if (this.isValid) {
        addRecord({
          name: this.name,
          score: this.score,
        })
        this.scoreSubmitted = true
      }
    },
  },
}
</script>

<style lang="scss" scoped>
h1 {
  color: #28a745;
  margin-bottom: 1.25rem;
}
.flexy {
  display: flex;
  flex-direction: column;
  justify-content: center;
}
</style>
