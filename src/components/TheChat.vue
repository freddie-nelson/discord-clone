<template>
  <main id="chat">
    <div class="chat-container">
      <div class="chat-list">
        <div class="scroll-spacer"></div>
        <ChatItem v-for="(msg, index) in messages" :key="msg.id" :message="msg" :no-icon="messages[index - 1] ? messages[index - 1].user.id === msg.user.id && msg.timestamp - messages[index - 1].timestamp <= 120 : false" />
        <div class="scroll-spacer" style="margin-bottom: 25px;"></div>
      </div>
    </div>
    <MessageBox v-model.trim="message" />
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
      message: "",
      messages: [
        // { id: "sidfoauwqa", user: { name: "Freddie", id: "sdjkfhuwiasfdu" }, text: "frick you dude", timestamp: 1602035023718 },
        // { id: "sdfjsaaaaafkajs", user: { name: "John Doe", id: "asduifeuih" }, text: "pog", timestamp: 1603031023718 }, 
        // { id: "sdfjsadwasafkajs", user: { name: "John Doe", id: "asduifeuih" }, text: "yo what is up dude this is an epic messsage", timestamp: 1603035022718 }, 
        // { id: "sdfjasdqqqsafkajs", user: { name: "John Doe", id: "asduifeuih" }, text: "yo what is up dude", timestamp: 1603035023718 },{ id: "sidfoauwqa", user: { name: "Freddie", id: "sdjkfhuwiasfdu" }, text: "frick you dude", timestamp: 1602035023718 },
        // { id: "sdfjsaaaaafkajs", user: { name: "John Doe", id: "asduifeuih" }, text: "pog", timestamp: 1603031023718 }, 
        // { id: "sdfjsadwasafkajs", user: { name: "John Doe", id: "asduifeuih" }, text: "yo what is up dude this is an epic messsage", timestamp: 1603035022718 }, 
        // { id: "sdfjasdqqqsafkajs", user: { name: "John Doe", id: "asduifeuih" }, text: "yo what is up dude", timestamp: 1603035023718 },{ id: "sidfoauwqa", user: { name: "Freddie", id: "sdjkfhuwiasfdu" }, text: "frick you dude", timestamp: 1602035023718 },
        // { id: "sdfjsaaaaafkajs", user: { name: "John Doe", id: "asduifeuih" }, text: "pog", timestamp: 1603031023718 }, 
        // { id: "sdfjsadwasafkajs", user: { name: "John Doe", id: "asduifeuih" }, text: "yo what is up dude this is an epic messsage", timestamp: 1603035022718 }, 
        // { id: "sdfjasdqqqsafkajs", user: { name: "John Doe", id: "asduifeuih" }, text: "yo what is up dude", timestamp: 1603035023718 },{ id: "sidfoauwqa", user: { name: "Freddie", id: "sdjkfhuwiasfdu" }, text: "frick you dude", timestamp: 1602035023718 },
        // { id: "sdfjsaaaaafkajs", user: { name: "John Doe", id: "asduifeuih" }, text: "pog", timestamp: 1603031023718 }, 
        // { id: "sdfjsadwasafkajs", user: { name: "John Doe", id: "asduifeuih" }, text: "yo what is up dude this is an epic messsage", timestamp: 1603035022718 }, 
        // { id: "sdfjasdqqqsafkajs", user: { name: "John Doe", id: "asduifeuih" }, text: "yo what is up dude", timestamp: 1603035023718 }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
#chat {
  .chat-container {
    width: 100%;
    height: calc(100vh - 100px);

    .chat-list {
      overflow-y: scroll;
      height: 100%;
      padding: 0px 16px;
      display: flex;
      flex-direction: column-reverse;

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