<template>
  <main id="add-friend">
    <div class="top">
      <h1 class="title">ADD FRIEND</h1>
      <router-link to="/friends" class="close">
        <img src="../assets/plus.svg" alt="">
      </router-link>
    </div>
    <p>You can add a friend with their Discord Tag. It's cAsE sEnSitIvE!</p>
    <form class="input" @submit.prevent>
      <input type="text" placeholder="Enter a Username">
      <button type="submit">Send Friend Request</button>
    </form>
  </main>
</template>

<script>
export default {
  name: "AddFriend"
}
</script>

<style lang="scss" scoped>
#add-friend {
  flex-grow: 1;
  color: white;
  padding: 15px 25px;

  .title {
    font-weight: bold;
    font-size: 1.1em;
    opacity: .9;
  }

  .top {
    display: flex;
  }

  .close {
    margin-left: auto;
    filter: brightness(10);
    opacity: .7;
    transform: rotate(45deg) scale(1.1);
    transition: opacity .2s ease;
    outline: none;

    &:hover {
      opacity: .9;
    }
  }

  p {
    font-size: .95em;
    margin-top: 8px;
    font-weight: 600;
    opacity: .9;
  }

  .input {
    width: 100%;
    height: 60px;
    background-color: #161A22;
    border-radius: 8px;
    border: 1px solid rgba(0, 0, 0, 0.3);
    padding: 10px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 15px;

    input {
      background: transparent;
      font-size: 1.1em;
      flex-grow: 1;
      outline: none;
      opacity: .9;
    }

    button {
      background: linear-gradient(-90deg, #603DB6 0%, #4050B5 100%);
      padding: 10px 14px;
      border-radius: 5px;
      outline: none;
      font-size: .9em;
      font-weight: 600;
      line-height: 1;
      transition: filter .2s ease;

      &:hover {
        filter: brightness(1.3)
      }
    }
  }
}
</style>