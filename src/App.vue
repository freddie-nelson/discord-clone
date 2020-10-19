<template>
  <div id="app">
    <ServerList />
    <ChannelList />
    <div id="main">
      <Titlebar :view="view" :title="title" />
      <router-view />
    </div>
    <!-- <div class="modal-container">
      <div class="modal">

      </div>
    </div> -->
  </div>
</template>

<script>
import ServerList from "./components/Server/TheServerList";
import ChannelList from "./components/ChannelList/TheChannelList";
import Titlebar from "./components/TheTitlebar";

export default {
  name: 'App',
  components: {
    ServerList,
    ChannelList,
    Titlebar
  },
  data() {
    return {
      view: "friends",
      title: "Friends"
    }
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
