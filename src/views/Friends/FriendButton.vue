<template>
  <div class="friend-container">
    <div class="friend">
      <div class="icon">{{ friend.username[0] }}</div>
      <div class="details">
        <h3 class="name">{{ friend.username }}<span class="hash">#{{ friend.hash }}</span></h3>
      </div>
      <div class="buttons">
        <button class="message" @click="request ? $emit('request', { friend, accept: true }) : $emit('open-chat', friend)">
          <svg v-if="!request" width="24" height="24" fill="none"><path fill="currentColor" d="M4.79805 3c-.9936 0-1.8.8055-1.8 1.8v10.8c0 .9936.8064 1.8 1.8 1.8h2.7V21l3.59995-3.6h8.1c.9945 0 1.8-.8064 1.8-1.8V4.8c0-.9945-.8055-1.8-1.8-1.8H4.79805z"/></svg>
          <svg v-else width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" fill-rule="evenodd" clip-rule="evenodd" d="M8.99991 16.17L4.82991 12L3.40991 13.41L8.99991 19L20.9999 7.00003L19.5899 5.59003L8.99991 16.17Z"></path></svg>
        </button>
        <button class="more" @click="request ? $emit('request', { friend, accept: false }) : null">
          <svg v-if="!request" width="24" height="24"><g fill="none" fill-rule="evenodd"><path d="M24 0v24H0V0z"/><path fill="currentColor" d="M12 16c1.1045695 0 2 .8954305 2 2s-.8954305 2-2 2-2-.8954305-2-2 .8954305-2 2-2zm0-6c1.1045695 0 2 .8954305 2 2s-.8954305 2-2 2-2-.8954305-2-2 .8954305-2 2-2zm0-6c1.1045695 0 2 .8954305 2 2s-.8954305 2-2 2-2-.8954305-2-2 .8954305-2 2-2z"/></g></svg>
          <img v-else src="../../assets/plus.svg" style="filter: brightness(5); opacity: 0.6; transform: rotate(45deg)" alt="">
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

    button {
      width: 36px;
      height: 36px;
      background-color: rgba(0, 0, 0, 0.45);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      outline: none;
      transition: filter .2s ease;

      &:hover {
        filter: brightness(2);
      }

      svg {
        transform: scale(.85);
      }
    }
  }
}
</style>