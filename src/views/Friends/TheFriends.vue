<template>
  <main v-if="friends.length !== 0 || friendRequests.length !== 0" id="friends">
    <div v-if="friends.length !== 0">
      <h2 class="count">FRIENDS - {{ friends.length }}</h2>
      <div class="friend-list">
        <FriendButton v-for="friend in friends" :key="friend.id" :friend="friend" @open-chat="openChat" @remove-friend="removeFriend" />
      </div>
    </div>

    <div v-if="friendRequests.length !== 0">
      <h2 class="count">REQUESTS - {{ friendRequests.length }}</h2>
      <div class="friend-list">
        <FriendButton v-for="friend in friendRequests" :key="friend.id" :friend="friend" :request="true" @request="answerRequest" />
      </div>
    </div>
  </main>

  <main v-else id="friends" class="no-friends">
    <h1>Its feeling pretty lonely in here</h1>
    <h2>How about inviting someone to the party?</h2>
  </main>
</template>

<script>
import FriendButton from "./FriendButton";

export default {
  name: "Friends",
  components: {
    FriendButton
  },
  computed: {
    friends() {
      return this.objectToArray(this.$store.state.user.friends);
    },
    friendRequests() {
      return this.objectToArray(this.$store.state.user.friendRequests);
    }
  },
  methods: {
    answerRequest(answer) {
      this.$store.state.socket.emit("answer-friend-request", { userId: answer.friend.userId, accept: answer.accept })
    },
    removeFriend(friend) {
      this.$store.state.socket.emit("remove-friend", friend.userId);
    },
    openChat(e) {
      console.log(e);
    },
    objectToArray(obj) {
      const arr = [];

      for (const key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
          arr.push(obj[key]);
        }
      }

      return arr;
    }
  }
}
</script>

<style lang="scss" scoped>
#friends {
  padding: 12px 30px;
  color: white;

  .count {
    font-weight: bold;
    opacity: 0.7;
    font-size: .85em;
    letter-spacing: 0.03em;
    margin-bottom: 8px;
  }

  &.no-friends {
    display: flex;
    align-items: center;
    flex-direction: column;
    height: 100%;
    padding-top: 40px;
    
    h1 {
      font-size: 2.4em;
      font-weight: 600;
      opacity: .6;
    }

    h2 {
      font-size: 1.4em;
      opacity: .6;

    }
  }
}
</style>