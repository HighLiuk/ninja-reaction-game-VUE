<template>
  <div class="row">
    <div class="col-md-6 offset-md-3">
      <div
        class="cheat"
        v-if="!showBlock"
        @mousedown="handleCheat"
        @touchstart="handleCheat"
      >
        .
      </div>
      <button
        class="btn btn-success"
        v-else
        @mousedown="handleClick"
        @touchstart="handleClick"
      >
        Click Me!
      </button>
    </div>
  </div>
</template>

<script>
export default {
  props: ["delay"],
  emits: ["end", "cheat"],
  data() {
    return {
      showBlock: false,
      bornAt: null,
      time: 0,
    }
  },
  mounted() {
    setTimeout(() => {
      this.showBlock = true
      this.bornAt = Date.now()
    }, this.delay)
  },
  methods: {
    handleClick() {
      this.time = Date.now() - this.bornAt
      this.showBlock = false
      this.$emit("end", this.time)
    },
    handleCheat() {
      this.$emit("cheat")
    },
  },
}
</script>

<style lang="scss" scoped>
button,
.cheat {
  width: 100%;
  padding: 5rem 1rem;
  border-radius: 1.5rem;
  font-size: 3rem;
  @media (max-width: 350px) {
    font-size: 2rem;
  }
}
.cheat {
  background: #fff;
  color: #fff;
  user-select: none;
}
</style>
