<template>
  <section id="channel-list">
    <div class="search-container">
      <button class="search">Find or start a conversation</button>
    </div>
    <div class="scroll-container">
      <div class="scroll">
        <div class="view-button-list">
          <ViewButton type="friends" :active="friends" @click="changeView" />
          <ViewButton type="library" :active="library" @click="changeView" />
          <ViewButton type="nitro" :active="nitro" @click="changeView" />
        </div>
        <div class="dm-heading">
          <p class="title">DIRECT MESSAGES</p>
          <button><img src="../assets/plus.svg" alt=""></button>
        </div>
        <div class="dm-list">
          <ViewButton v-for="dm in dms" :key="dm.id" type="dm" :active="activeDm === dm.id" :dm="dm" @click="changeView" />
        </div>
      </div>
    </div>
    <div class="profile">
        <div class="icon">J</div>
        <div class="details">
          <h2 class="name">John Doe</h2>
          <h2 class="hash">#6235</h2>
        </div>
        <div class="buttons">
          <button class="settings">
            <svg width="20" height="20" viewBox="0 0 24 24"><path fill="currentColor" fill-rule="evenodd" clip-rule="evenodd" d="M19.738 10H22v4h-2.261c-.241.931-.639 1.798-1.174 2.564L20 18l-2 2-1.435-1.436c-.768.535-1.633.934-2.565 1.174V22h-4v-2.262c-.931-.24-1.797-.639-2.564-1.174L6 20l-2-2 1.436-1.436c-.535-.765-.934-1.632-1.174-2.564H2v-4h2.262c.24-.932.638-1.798 1.174-2.564L4 6l2-2 1.436 1.436C8.202 4.9 9.068 4.502 10 4.262V2h4v2.261c.932.241 1.797.639 2.565 1.174L18 3.999l2 2-1.436 1.437c.535.766.934 1.633 1.174 2.564zM12 16c2.2091 0 4-1.7909 4-4 0-2.20914-1.7909-4-4-4-2.20914 0-4 1.79086-4 4 0 2.2091 1.79086 4 4 4z"/></svg>
          </button>
          <button class="deafen">
            <svg width="20" height="20" viewBox="0 0 24 24"><svg width="24" height="24"><path d="M12 2.00305c-5.514 0-10 4.485-10 10.00005v8c0 1.104.895 2 2 2h2c1.104 0 2-.896 2-2v-3c0-1.104-.896-2-2-2H4v-3c0-4.41205 3.589-8.00005 8-8.00005s8 3.588 8 8.00005v3h-2c-1.104 0-2 .896-2 2v3c0 1.104.896 2 2 2h2c1.104 0 2-.896 2-2v-8c0-5.51505-4.486-10.00005-10-10.00005z" fill="currentColor"/></svg></svg>
          </button>
          <button class="mute">
            <svg width="20" height="20" viewBox="0 0 24 24"><path fill-rule="evenodd" clip-rule="evenodd" d="M14.99 11c0 1.66-1.33 3-2.99 3-1.66 0-3-1.34-3-3V5c0-1.66 1.34-3 3-3s3 1.34 3 3l-.01 6zM12 16.1c2.76 0 5.3-2.1 5.3-5.1H19c0 3.42-2.72 6.24-6 6.72V21h-2v-3.28c-3.28-.49-6-3.31-6-6.72h1.7c0 3 2.54 5.1 5.3 5.1zM12 4c-.8 0-1 .66667-1 1v6c0 .3333.2 1 1 1s1-.6667 1-1V5c0-.33333-.2-1-1-1z" fill="currentColor"/><path fill-rule="evenodd" clip-rule="evenodd" d="M14.99 11c0 1.66-1.33 3-2.99 3-1.66 0-3-1.34-3-3V5c0-1.66 1.34-3 3-3s3 1.34 3 3l-.01 6zM12 16.1c2.76 0 5.3-2.1 5.3-5.1H19c0 3.42-2.72 6.24-6 6.72V22h-2v-4.28c-3.28-.49-6-3.31-6-6.72h1.7c0 3 2.54 5.1 5.3 5.1z" fill="currentColor"/></svg>
          </button>
        </div>
    </div>
  </section>
</template>

<script>
import ViewButton from "./ViewButton";

export default {
  name: "ChannelList",
  components: {
    ViewButton
  },
  data() {
    return {
      friends: true,
      library: false,
      nitro: false,
      activeDm: "",
      dms: [{ name: "John Doe", id: "salfasdufh48950" }]
    }
  },
  methods: {
    changeView(type) {
      this.friends = false;
      this.library = false;
      this.nitro = false;
      this.activeDm = "";

      if (this[type] !== undefined)
        this[type] = true;
      else
        this.activeDm = type;
    }
  }
};
</script>

<style lang="scss" scoped>
#channel-list {
  width: 240px;
  height: 100%;
  background-color: #14171f;
  display: flex;
  flex-direction: column;
  color: white;
  overflow: hidden;

  .scroll-container {

    .scroll {
      overflow-y: scroll;

      &::-webkit-scrollbar {
        display: none;
      }
    }    
  }

  .profile {
    width: 100%;
    height: 52px;
    background-color: #0F1217;
    margin-top: auto;
    padding: 0px 10px;
    display: flex;
    align-items: center;

    .icon {
      width: 32px;
      height: 32px;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-right: 8px;
      color: #008AE6;
      border-radius: 50%;
      background-color: #232936;
      font-size: 1.2em;
    }

    h2 {
      line-height: 1;
      font-size: .8em;
    }

    .details {
      margin-top: 2px;
      cursor: pointer;
    }

    .name {
      font-weight: bold;
      margin-bottom: 1px;
      opacity: .9;
    }

    .hash {
      opacity: .7;
    }

    .buttons {
      margin-left: auto;
      color: #A4A5A7;
      display: flex;
      flex-direction: row-reverse;
    }

    button {
      outline: none !important;
      width: 32px;
      height: 32px;
      border-radius: 4px;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: background-color .1s ease;

      &:hover {
        background-color: rgba(255, 255, 255, 0.15);
      }
    }
  }

  .view-button-list {
    margin: 7px 0px;
    padding: 0px 10px;
  }

  .search-container {
    background-color: #0F1217;
    height: 48px;
    width: 100%;
    padding: 10px;
  }

  .search {
    color: white;
    font-size: 0.85em;
    opacity: 0.7;
    letter-spacing: 0.05em;
    background-color: #080a0d;
    padding: 7px;
    width: 100%;
    margin: 0px auto;
    text-align: left;
    line-height: 1;
    border-radius: 4px;
    outline: none !important;
  }

  .dm-heading {
    padding: 0px;
    display: flex;
    justify-content: space-between;
    padding: 0px 11px;


    button {
      outline: none !important;
      
      img {
        height: 16px;
        filter: brightness(10);
        margin: auto 0;
      }
    }
  }

  .dm-list {
    padding: 0px 10px;
  }

  .title {
    font-weight: bold;
    opacity: 0.7;
    font-size: 0.75em;
    letter-spacing: 0.03em;
  }
}
</style>