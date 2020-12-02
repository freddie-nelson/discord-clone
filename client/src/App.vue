<template>
  <div id="app">
    <ServerList />
    <ChatList />
    <div id="main">
      <Titlebar :view="view" :title="title" />
      <router-view />
    </div>
    <!-- <div class="modal-container">
      <div class="modal">

      </div>
    </div> -->
    <Toast :toast="toastQueue[0]" @next-toast="toastQueue = toastQueue.slice(1, toastQueue.length - 1)" />
  </div>
</template>

<script>
import ServerList from "./components/Server/TheServerList";
import ChatList from "./components/ChatList/TheChatList";
import Titlebar from "./components/TheTitlebar";
import Toast from "./components/TheToast";

export default {
  name: 'App',
  components: {
    ServerList,
    ChatList,
    Titlebar,
    Toast
  },
  computed: {
    toastQueue: {
      get() {
        return this.$store.state.toastQueue;
      },
      set(val) {
        this.$store.commit("SET_TOAST_QUEUE", val)
      }
    }
  },
  data() {
    return {
      view: "friends",
      title: "Friends"
    }
  },
  beforeMount() {
    const io = require("socket.io-client");
    this.$store.state.SERVER_URL = process.env.NODE_ENV === "production" ? "https://discord-clone-freddie.herokuapp.com" : "http://localhost:3000";
    const socket = io(this.$store.state.SERVER_URL + "/", { withCredentials: true })

    this.$store.state.socket = socket;

    // connect and disconnect events
    socket.on("connect", () => {
      console.log("connected to socket")
    })

    socket.on("disconnect", () => {
      console.log("disconnected from socket");
    })

    // Authentication events
    socket.on("authenticated", data => {
      console.log("authenticated");
      this.$store.commit("SET_USER", data);

      if (this.$route.name !== "Friends") {
        this.$router.push({ name: "Friends" })
      }
    })

    socket.on("not-authenticated", () => {
      if (this.$route.name !== "Auth") {
        this.$router.push({ name: "Auth" })
      }
    })

    // Friend events
    socket.on("friend-request", data => {
      console.log("friend-request");
      this.$store.commit("ADD_FRIEND_REQUEST", data);
    })

    socket.on("answer-friend-request-response", res => {
      this.$store.commit("ADD_TOAST", res)
      
      if (!res.error) {
        res.accepted ? this.$store.commit("ADD_FRIEND",  res.friend) : this.$store.commit("REMOVE_FRIEND_REQUEST",  res.friend);
      }
    });

    socket.on("pending-friend-request-accepted", friend => {
      this.$store.commit("ADD_FRIEND", friend)
    });

    socket.on("remove-friend-response", res => {
      if (typeof res === "object") {
        this.$store.commit("REMOVE_FRIEND", res.userId);
        this.$store.commit("ADD_TOAST", res);
      } else {
        this.$store.commit("REMOVE_FRIEND", res);
      }
    })

    // Chat events
    socket.on("send-message-response", res => {
      if (res.error) {
        this.$store.commit("ADD_TOAST", res);
      }
    })

    socket.on("receive-message", message => {
      this.$store.commit("RECEIVE_MESSAGE", message);
    })

    socket.on("fetch-messages-response", res => {
      this.title = this.$store.state.chat.username;
      this.view = "dm";

      if (res.error) {
        this.$store.commit("ADD_TOAST", res);
      } else {
        this.$store.commit("SET_MESSAGES", res.messages);
      }
    })
  }
}
</script>

<style lang="scss">
/* Whitney font face to match Discord */
@font-face {
    font-family: Whitney;
    font-style: light;
    font-weight: 300;
    src: url("./assets/whitney-light.woff") format('woff');
}
@font-face {
    font-family: Whitney;
    font-style: normal;
    font-weight: 500;
    src: url("./assets/whitney.woff") format('woff');
}
@font-face {
    font-family: Whitney;
    font-style: medium;
    font-weight: 600;
    src: url("./assets/whitney-medium.woff") format('woff');
}
@font-face {
    font-family: Whitney;
    font-style: bold;
    font-weight: 700;
    src: url("./assets/whitney-bold.woff") format('woff');
}

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  font-family: Whitney, 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

#app {
  background-color: rgb(107, 107, 107);
  height: 100vh;
  width: 100%;
  display: flex;
}

div#main {
  width: calc(100vw - 297px);
  height: 100%;
  background-color: #181C25;
  display: flex;
  flex-direction: column;
}

.modal-container {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  background: rgba(0, 0, 0, 0.3);

  .modal {
    width: 60%;
    height: 50%;
  }
}
</style>
