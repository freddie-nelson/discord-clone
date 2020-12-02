<template>
  <div class="message-box-container">
    <div class="message-box">
      <input ref="fileInput" type="file" class="file" />
      <button class="file-btn" @click="$refs.fileInput.click()">
        <div class="icon">
          <img src="../../assets/plus.svg" alt="">
        </div>
      </button>
      <input 
        type="text" 
        class="input" 
        placeholder="Type your message..." 
        :value="value"
        @input="$emit('input', $event.target.value)">
    </div>
  </div>
</template>

<script>
export default {
  name: "MessageBox",
  props: {
    value: {
      type: String,
      default: ""
    }
  }
}
</script>

<style lang="scss" scoped>
.message-box-container {
  background-color: #181C25;
  width: 100%;
  height: 52px;
  padding: 4px 16px;

  .message-box {
    background-color: #080a0d;
    width: 100%;
    height: 100%;
    border-radius: 10px;
    display: flex;
    padding-right: 12px;

    .input {
      background: none;
      border: none;
      outline: none;
      height: 100%;
      color: rgba(255, 255, 255, 0.9);
      flex-grow: 1;
    }

    .file {
      opacity: 0;
      position: absolute;
      width: 0px;
      height: 0px;
      top: -100px;
      left: -100px;
    }

    .file-btn {
      width: 44px;
      height: 100%;
      padding: 10px;
      outline: none;

      .icon {
        border-radius: 50%;
        width: 100%;
        height: 100%;
        background-color: #bbb;
        display: flex;
        align-items: center;
        justify-content: center;

        img {
          transform: scale(.75);
        }
      }
    }
  }
}
</style>