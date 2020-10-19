<template>
  <div id="app">
    <ServerList />
    <ChannelList />
    <div id="main">
      <Titlebar :view="view" :title="title" />
      <Chat />
    </div>
  </div>
</template>

<script>
import ServerList from "./components/TheServerList";
import ChannelList from "./components/TheChannelList";
import Titlebar from "./components/TheTitlebar";
import Chat from "./components/TheChat";

export default {
  name: 'App',
  components: {
    ServerList,
    ChannelList,
    Titlebar,
    Chat
  },
  data() {
    return {
      view: "friends",
      title: "Friends"
    }
  }
}
</script>

<style>
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
}
</style>
