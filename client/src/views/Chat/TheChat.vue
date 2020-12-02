<template>
  <main id="chat">
    <div class="chat-container">
      <div class="chat-list">
        <div class="scroll-spacer" style="margin-bottom: 25px;"></div>
        <ChatItem v-for="(msg, index) in messages" :key="msg.id" :message="msg" :no-icon="messages[index - 1] ? messages[index - 1].user.id === msg.user.id && msg.timestamp - messages[index - 1].timestamp <= 30000 : false" />
        <div class="scroll-spacer" ref="bottom"></div>
      </div>
    </div>
    <MessageBox v-model.trim="message" @keyup.enter.native="sendMessage" />
  </main>
</template>

<script>
import MessageBox from "./MessageBox";
import ChatItem from "./ChatItem"

export default {
  name: "Chat",
  components: {
    MessageBox,
    ChatItem
  },
  data() {
    return {
      message: ""
    }
  },
  computed: {
    messages() {
      return this.$store.state.messages[this.chatId] || [];
    },
    from() {
      return {
        userId: this.$store.state.user.userId,
        initiator: !this.$store.state.user.friends[this.$store.state.chat.userId].initiator
      }
    },
    to() {
      return {
        userId: this.$store.state.chat.userId,
      }
    },
    chatId() {
      return this.$store.state.chat.chatId
    }
  },
  watch: {
    messages() {
      setTimeout(() => this.$refs.bottom.scrollIntoView(false), 20);
    }
  },
  methods: {
    sendMessage() {
      if (!this.message) return;
      
      this.$store.state.socket.emit("send-message", { from: this.from, to: this.to, message: this.message });
      this.message = "";
    },
    fetchMessages() {
      this.$store.state.socket.emit("fetch-messages", { from: this.from, to: this.to });
    }
  },
  beforeDestroy() {
    this.$store.commit("SET_CURRENT_CHAT", { chatId: null, userId: null, name: null });
  },
  mounted() {
    this.fetchMessages();
  }
}
</script>

<style lang="scss" scoped>
#chat {
  .chat-container {
    width: 100%;
    height: calc(100vh - 100px);
    display: flex;
    overflow-y: scroll;

    .chat-list {
      padding: 0px 16px;
      display: flex;
      flex-direction: column;
      margin-top: auto;
      width: 100%;
      justify-content: flex-end;

      .scroll-spacer {
        margin-top: 25px;
        width: 100%;
      }
      
      &::-webkit-scrollbar {
        display: none;
      }
    }
  }
}
</style>