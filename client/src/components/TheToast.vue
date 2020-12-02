<template>
  <div class="toast" :class="{ error: toast.error, show }">
    <p>{{ toast.message }}</p>
    <button @click="close">
      <img src="../assets/plus.svg" alt="">
    </button>
  </div>
</template>

<script>
export default {
  name: "Toast",
  data() {
    return {
      show: false
    }
  },
  watch: {
    toast() {
      if (this.toast.error === null) {
        this.show = false;
      } else {
        this.show = true;
      }
    }
  },
  props: {
    toast: {
      type: Object,
      default() {
        return {
          error: null,
          message: null
        }
      },
      validator(val) {
        if (Object.prototype.hasOwnProperty.call(val, "error") && Object.prototype.hasOwnProperty.call(val, "message")) {
          return true;
        } else {
          return false;
        }
      }
    }
  },
  methods: {
    close() {
      setTimeout(() => {
        this.$emit("next-toast");
      }, 900);

      this.show = false;
    }
  }
}
</script>

<style lang="scss" scoped>
.toast {
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  margin: 0 auto;
  width: 65%;
  height: 48px;
  background: linear-gradient(to right, #40c75d, #43b573);
  border-radius: 7px;
  border: 2px solid white;
  transform: scale(.93) translateY(-100px);
  margin-top: 10px;
  transition: transform .5s cubic-bezier(.52,-0.59,.43,.74);
  color: white;
  font-weight: bold;
  font-size: 1.11em;
  letter-spacing: .025em;
  display: flex;
  align-items: center;
  justify-content: center;
  
  p {
    user-select: none;
  }
  
  button {
    transform: rotate(45deg) scale(1.4);
    filter: brightness(5);
    outline: none;
    position: absolute;
    right: 10px;
    user-select: none;
  }

  &.show {
    transform: scale(.93) translateY(5px);
  }

  &.error {
    background: linear-gradient(to right, #cf3838, #c02222);
  }
}
</style>