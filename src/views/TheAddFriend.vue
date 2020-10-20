<template>
  <main id="add-friend">
    <div class="top">
      <h1 class="title">ADD FRIEND</h1>
      <router-link to="/" class="close">
        <img src="../assets/plus.svg" alt="">
      </router-link>
    </div>
    <p>You can add a friend with their Discord Tag. It's cAsE sEnSitIvE!</p>
    <form class="input" @submit.prevent="validate">
      <input type="text" placeholder="Enter a Username" v-model.trim="username">
      <button type="submit">Send Friend Request</button>
    </form>

    <div class="message" v-if="responseRecieved" :class="{ success: response.code < 400 }">
      <p>{{ response.message }}</p>
    </div>
  </main>
</template>

<script>
export default {
  name: "AddFriend",
  data() {
    return {
      username: "",
      response: {},
      responseRecieved: false
    }
  },
  methods: {
    validate() {
      if (this.username.match(/^((.+?)#\d{4})/)) {
        const name = this.username.split("#")[0];
        const hash = this.username.split("#")[1].slice(0, 4);

        this.addFriend(name, hash);
      } else {
        this.response = {
          message: "Please enter a valid username e.g. Freddie#1234",
          code: 400
        }

        this.responseRecieved = true;
      }
    },
    addFriend(username, hash) {
      this.$store.state.socket.on("add-friend-response", data => {
        this.responseRecieved = true;

        this.response = {
          message: data.message,
          code: data.error ? 400 : 200
        }
      })

      this.$store.state.socket.emit("add-friend", { username, hash })
    }
  },
}
</script>

<style lang="scss" scoped>
#add-friend {
  flex-grow: 1;
  color: white;
  padding: 15px 25px;

  .title {
    font-weight: bold;
    font-size: 1.1em;
    opacity: .9;
  }

  .top {
    display: flex;
  }

  .close {
    margin-left: auto;
    filter: brightness(10);
    opacity: .7;
    transform: rotate(45deg) scale(1.1);
    transition: opacity .2s ease;
    outline: none;

    &:hover {
      opacity: .9;
    }
  }

  p {
    font-size: .95em;
    margin-top: 8px;
    font-weight: 600;
    opacity: .9;
  }

  .input {
    width: 100%;
    height: 60px;
    background-color: #161A22;
    border-radius: 8px;
    border: 1px solid rgba(0, 0, 0, 0.3);
    padding: 10px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 15px;

    input {
      background: transparent;
      font-size: 1.1em;
      flex-grow: 1;
      outline: none;
      opacity: .9;
    }

    button {
      background: linear-gradient(-90deg, #603DB6 0%, #4050B5 100%);
      padding: 10px 14px;
      border-radius: 5px;
      outline: none;
      font-size: .9em;
      font-weight: 600;
      line-height: 1;
      transition: filter .2s ease;

      &:hover {
        filter: brightness(1.3)
      }
    }
  }

  .message {
    width: 100%;
    font-size: 1em;
    border-radius: 6px;
    background-color: rgba(220, 53, 70, 0.2);
    padding: 18px 16px;
    color: rgba(255, 255, 255, 0.85);
    outline: none;
    margin-top: 20px;
    display: flex;
    align-items: center;
    border: 2px solid #ff001938;
    filter: brightness(1.1);

    p {
      color: #ff0000;
      line-height: 1;
      font-size: 1em;
      line-height: 1;
      margin-top: 0px;
    }

    &.success {
      background-color: rgba(53, 220, 61, 0.2);
      border: 2px solid #00ff0d38;

      p {
        color: #00ff15;
      }
    }
  }
}
</style>