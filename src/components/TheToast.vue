<template>
  <div class="toast" :class="{ error: toast.error, show }">
    {{ toast.message }}
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
  width: 70%;
  height: 50px;
  background-color: #43b581;
  border-radius: 7px;
  border: 2px solid white;
  transform: scale(.93) translateY(-80px);
  margin-top: 10px;
  transition: transform .8s ease;
}
</style>