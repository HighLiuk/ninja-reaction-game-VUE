<template lang="pug">
p.lead Reaction time: {{ score }} ms
h1 {{ rank }}
p.lead Average: {{ average }} ms
div(v-if="!scoreSubmitted")
  p.lead Submit your score (optional)
  .alert.alert-danger(role="alert" v-if="!isValid") Invalid Input. Your name must be between one and sixteen characters long. It can include letters, numbers, spaces and emojis. Not every emoji is supported, though.
  .d-flex.justify-content-center
    form(@submit.prevent="handleSubmit")
      .form-group
        input.form-control(type="text" placeholder="Enter your name..." v-model="name")
      button.btn.btn-primary(type="submit") Submit
div(v-else)
  p.lead Score submitted!
</template>

<script>
import { addRecord } from '@/firebase'
import { inputRegex } from '@/inputRegex'

export default {
  props: [
    'score',
    'average'
  ],
  data() {
    return {
      scoreSubmitted: false,
      isValid: false,
      name: '',
      rank: null
    }
  },
  mounted() {
    if (this.score < 250)
      this.rank = '🐱‍👤 Ninja Fingers 🐱‍👤'
    else if (this.score < 400)
      this.rank = '🚀 Rapid Reflexes 🚀'
    else
      this.rank = '🐌 Snail pace... 🐌'
  },
  methods: {
    handleSubmit() {
      this.isValid = inputRegex.test(this.name)
      'Luca the Ninja 🐱‍👤'
      if (this.isValid) {
        addRecord({
          name: this.name,
          score: this.score
        })
        this.scoreSubmitted = true
      }
    }
  }
}
</script>

<style lang="sass" scoped>
h1
  color: #28a745
  margin-bottom: 1.25rem
.flexy
  display: flex
  flex-direction: column
  justify-content: center
</style>
