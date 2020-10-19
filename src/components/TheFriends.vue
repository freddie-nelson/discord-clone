<template>
  <main id="friends">
    <h2 class="count">FRIENDS - 10</h2>
    <div class="friend-list">
      <FriendButton v-for="friend in friends" :key="friend.id" :friend="friend" />
    </div>
  </main>
</template>

<script>
import FriendButton from "./FriendButton";

export default {
  name: "Friends",
  components: {
    FriendButton
  },
  data() {
    return {
      friends: [{name: "John Doe", id: "laskjdfsdafjkh"}]
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
}
</style>