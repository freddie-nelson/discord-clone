<template>
  <section id="titlebar">
    <div class="content">
      <svg v-if="view === 'friends'" class="title-icon" width="16" height="16" viewBox="0 0 24 24"><g data-v-70ba24e7="" fill="none" fill-rule="evenodd"><path data-v-70ba24e7="" fill="currentColor" fill-rule="nonzero" d="M2.5 4v1.5c0 4.15 2.21 7.78 5.5 9.8V20h15v-2c0-2.66-5.33-4-8-4h-.25C10 14 6 10 6 5.5V4H2.5zM15 4c-2.209139 0-4 1.790861-4 4s1.790861 4 4 4 4-1.790861 4-4-1.790861-4-4-4z"></path><path data-v-70ba24e7="" d="M0 0h24v24H0V0zm0 0h24v24H0V0zm0 0h24v24H0V0z"></path></g></svg>
      <svg v-else-if="view === 'dm'" class="title-icon" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M12 2C6.486 2 2 6.486 2 12C2 17.515 6.486 22 12 22C14.039 22 15.993 21.398 17.652 20.259L16.521 18.611C15.195 19.519 13.633 20 12 20C7.589 20 4 16.411 4 12C4 7.589 7.589 4 12 4C16.411 4 20 7.589 20 12V12.782C20 14.17 19.402 15 18.4 15L18.398 15.018C18.338 15.005 18.273 15 18.209 15H18C17.437 15 16.6 14.182 16.6 13.631V12C16.6 9.464 14.537 7.4 12 7.4C9.463 7.4 7.4 9.463 7.4 12C7.4 14.537 9.463 16.6 12 16.6C13.234 16.6 14.35 16.106 15.177 15.313C15.826 16.269 16.93 17 18 17L18.002 16.981C18.064 16.994 18.129 17 18.195 17H18.4C20.552 17 22 15.306 22 12.782V12C22 6.486 17.514 2 12 2ZM12 14.599C10.566 14.599 9.4 13.433 9.4 11.999C9.4 10.565 10.566 9.399 12 9.399C13.434 9.399 14.6 10.565 14.6 11.999C14.6 13.433 13.434 14.599 12 14.599Z"></path></svg>
      <h1 class="title">{{ this.title }}</h1>
      <button v-if="view === 'friends'" class="add-btn title">
        <svg class="icon" width="24" height="24"><path fill="currentColor" fill-rule="evenodd" clip-rule="evenodd" d="M21 3h3v2h-3v3h-2V5h-3V3h3V0h2v3zm-11 9c2.205 0 4-1.795 4-4s-1.795-4-4-4-4 1.795-4 4 1.795 4 4 4zm0 1c-4.711 0-8 2.467-8 6v1h16v-1c0-3.533-3.289-6-8-6z"/></svg>
        Add Friend
      </button>
    </div>
    <div class="shadow"></div>
  </section>
</template>

<script>
export default {
  name: "Titlebar",
  props: {
    view: {
      type: String,
      default: ""
    },
    title: {
      type: String,
      default: ""
    }
  }
}
</script>

<style lang="scss" scoped>
#titlebar {
  width: calc(100vw - 297px);
  height: 48px;
  background-color: #181C25;
  position: relative;
  color: white;

  .content {
    display: flex;
    align-items: center;
    width: 100%;
    height: 100%;
    padding: 0px 12px;
  }

  .title {
    font-size: 17px;
    font-weight: 600;
    line-height: 1;
  }

  .title-icon {
    width: 24px;
    height: 24px;
    opacity: 0.7;
    margin-right: 12px;
    transform: scale(1.1);
  }

  .add-btn {
    margin-left: auto;
    font-size: 1em;
    padding: 6px;
    line-height: 1;
    background-color: #43b581;
    border-radius: 6px;
    display: flex;
    align-items: center;
    outline: none;
    transition: background-color .3s ease;
    transform: scale(.95);

    &:hover {
      background-color: #3aa7c9;
    }

    .icon {
      margin-right: 8px;
      height: 18px;
      width: 20px;

      path {
        transform: scale(.8);
      }
    }
  }

  .shadow {
    position: absolute;
    width: 100%;
    height: 5px;
    top: 48px;
    background: linear-gradient(rgba(0, 0, 0, 0.3), transparent);
  }
}
</style>