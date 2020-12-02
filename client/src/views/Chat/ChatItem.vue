<template>
  <div class="chat-item" :class="{ 'no-icon': noIcon }">
    <div class="icon">
      {{ message.user.name[0] }}
    </div>
    <div class="content">
      <h3 class="name">
        {{ message.user.name }}
        <span class="timestamp">{{ timeago }}</span>
      </h3>
      <p class="message">{{ message.text }}</p>
    </div>
  </div>
</template>

<script>
import { format } from "timeago.js";

export default {
  name: "ChatItem",
  props: {
    message: {
      type: Object,
      default() {
        return {}
      }
    },
    noIcon: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      timeago: "",
      refreshTimestampInterval: null
    }
  },
  methods: {
    format(time) {
      return format(time);
    }
  },
  mounted() {
    this.timeago = this.format(this.message.timestamp);

    // refresh timestamp
    this.refreshTimestampInterval = setInterval(() => {
      this.timeago = this.format(this.message.timestamp);
    }, 3000)
  },
  beforeDestroy() {
    clearInterval(this.refreshTimestampInterval);
  }
}
</script>

<style lang="scss" scoped>
.chat-item {
  width: 100%;
  display: flex;
  color: white;
  margin-top: 20px;

  &.no-icon {
    margin-top: 0px;
    margin-left: 50px;
    width: auto;

    .icon {
      display: none;
    }

    .name {
      display: none;
    }
  }

  .icon {
    width: 42px;
    height: 42px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 8px;
    color: #008AE6;
    border-radius: 50%;
    background-color: #232936;
    font-size: 1.5em;
    user-select: none;
  }

  .name {
    font-weight: 600;
    font-size: .95em;
    line-height: 1.2em;
    user-select: none;
  }

  .timestamp {
    opacity: .7;
    font-size: .85em;
    margin-left: 4px;
    user-select: none;
  }

  .content {
    margin-left: 5px;
    max-width: calc(100% - 60px); // make sure icon doesn't get squished
  }
}
</style>