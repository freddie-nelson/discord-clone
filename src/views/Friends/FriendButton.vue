<template>
  <div class="friend-container">
    <div class="friend">
      <div class="icon">{{ friend.username[0] }}</div>
      <div class="details">
        <h3 class="name">{{ friend.username }}<span class="hash">#{{ friend.hash }}</span></h3>
      </div>
      <div class="buttons">
        <button class="message button" @click="request ? $emit('request', { friend, accept: true }) : $emit('open-chat', friend)">
          <svg v-if="!request" width="24" height="24" fill="none"><path fill="currentColor" d="M4.79805 3c-.9936 0-1.8.8055-1.8 1.8v10.8c0 .9936.8064 1.8 1.8 1.8h2.7V21l3.59995-3.6h8.1c.9945 0 1.8-.8064 1.8-1.8V4.8c0-.9945-.8055-1.8-1.8-1.8H4.79805z"/></svg>
          <svg v-else width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" fill-rule="evenodd" clip-rule="evenodd" d="M8.99991 16.17L4.82991 12L3.40991 13.41L8.99991 19L20.9999 7.00003L19.5899 5.59003L8.99991 16.17Z"></path></svg>
        </button>
        <button class="more button" :class="{ request }" @click="request ? $emit('request', { friend, accept: false }) : $emit('remove-friend', friend)">
          <svg v-if="!request" style="transform: scale(.75)" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" fill-rule="evenodd" clip-rule="evenodd" d="M20.2949 0.298996L21.7089 1.713L19.4169 4.006L21.7089 6.299L20.2949 7.713L18.0019 5.42L15.7099 7.713L14.2949 6.299L16.5879 4.006L14.2949 1.713L15.7099 0.298996L18.0019 2.592L20.2949 0.298996ZM8.00195 13.006C10.207 13.006 12.002 11.211 12.002 9.006C12.002 6.801 10.207 5.006 8.00195 5.006C5.79695 5.006 4.00195 6.801 4.00195 9.006C4.00195 11.211 5.79695 13.006 8.00195 13.006ZM8.00195 14.006C3.29095 14.006 0.00195312 16.473 0.00195312 20.006V21.006H16.002V20.006C16.002 16.473 12.713 14.006 8.00195 14.006Z"></path></svg>
          <img v-else src="../../assets/plus.svg" style="filter: brightness(5); transform: rotate(45deg)" alt="">
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "FriendButton",
  props: {
    friend: {
      type: Object,
      default() {
        return {}
      }
    },
    request: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="scss" scoped>
.friend-container {
  margin-left: -13px;
  width: calc(100% + 26px);
  height: 100%;
  border-radius: 11px;
  padding: 0px 13px;
  transition: background-color .15s ease;

  &:hover {
    background-color: rgb(0, 0, 0, .25);

    .friend::before {
      opacity: 0;
    }

    .details .hash {
      opacity: .7;
    }
  }
}

.friend {
  width: 100%;
  height: 61px;
  display: flex;
  align-items: center;
  border-radius: 10px;
  position: relative;

  &::before {
    content: "";
    background-color: white;
    opacity: .1;
    height: 1px;
    position: absolute;
    width: 100%;
    top: 0;
    left: 0;
  }

  .icon {
    width: 38px;
    height: 38px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 8px;
    color: #008AE6;
    border-radius: 50%;
    background-color: #232936;
    font-size: 1.2em;
  }

  .details {

    .name {
      font-weight: bold;
      font-size: .95em;
      opacity: .9;
    }

    .hash {
      opacity: 0;
      font-weight: normal;
      margin-left: 2px;
      transition: opacity .15s ease;
    }
  }

  .buttons {
    color: #acacac;
    display: flex;
    margin-left: auto;
    justify-content: space-between;
    width: 85px;

    .more:hover {
      color: #F04747;
    }

    .more.request:hover {
      img {
        opacity: 1;
      }
    }

    .more.request img {
      opacity: 0.6;
      transition: opacity .2s ease;
    }

    .button {
      width: 36px;
      height: 36px;
      background-color: rgba(0, 0, 0, 0.45);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      outline: none;
      transition: color .2s ease;
      position: relative;

      &.message:hover {
        color: #ffffff;
      }

      svg {
        transform: scale(.85);
      }
    }
  }
}
</style>