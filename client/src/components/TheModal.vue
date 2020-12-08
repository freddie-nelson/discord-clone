<template>
  <div class="modal-container">
    <div class="modal">
      <h1>{{ title }}</h1>
      <p>{{ description }}</p> 
      <form @submit.prevent="submitModal">
        <div class="input" v-for="(input) in inputs" :key="input.label">
        <label for="">{{ input.label }}</label>
        <input :required="input.required" type="text" v-model="results[input.key]">
      </div>

      <div class="buttons">
        <button class="decline" type="button" @click="closeModal">{{ btnDecline.text }}</button>
        <button class="confirm" type="submit">{{ btnConfirm.text }}</button>
      </div> 
      </form> 
    </div>
  </div>
</template>

<script>
export default {
  name: "Modal",
  props: {
    title: {
      type: String,
      default: "Modal Title"
    },
    description: {
      type: String,
      default: "This is the modal's description. Lorem ipsum dolor sit amet."
    },
    btnConfirm: {
      type: Object,
      default() {
        return {
          text: "Confirm"
        }
      }
    },
    btnDecline: {
      type: Object,
      default() {
        return {
          text: "Decline"
        }
      }
    },
    inputs: {
      type: Array,
      default() {
        return [ { label: "Example Input", key: "exampleInput", required: true } ]
      }
    }
  },
  data() {
    return {
      results: {}
    }
  },
  methods: {
    submitModal() {
      this.$store.commit("MODAL_RESULTS", this.results);
      this.closeModal();
    },
    closeModal() {
      this.$store.commit("SHOW_MODAL", false);
    }
  }
}
</script>

<style lang="scss" scoped>
.modal-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;

  .modal {
    width: 50%;
    height: auto;
    padding: 40px;
    background-color: #181C25;
    margin: auto;
    min-width: 500px;
    border-radius: 10px;

    h1 {
      color: white;
      font-size: 1.5rem;
      font-weight: 700;
      opacity: .7;
    }

    p {
      font-size: 1.1rem;
      color: white;
      opacity: .6;
      margin: 1px 0 12px 0;
    }

    input {
      background-color: #232936;
      font-size: 1.2rem;
      border: none;
      outline: none;
      border-radius: 8px;
      padding: 14px;
      color: rgba(255, 255, 255, 0.7);
      width: 100%;
    }

    label {
      color: rgba(255, 255, 255, 0.4);
      font-size: .85rem;
      padding-bottom: 8px;
      padding-top: 15px;
      font-weight: bold;
      text-transform: uppercase;
    }

    .buttons {
      float: right;
      margin-top: 15px;

      button {
        padding: 10px 14px;
        font-size: 1rem;
        font-weight: bold;
        color: white;
        outline: none;
        border-radius: 6px;

        &.confirm {
          background-color: #43b581;
        }

        &.decline {
          background-color: #c23838;
          margin-right: 10px;
        }
      }
    }
  }
}
</style>