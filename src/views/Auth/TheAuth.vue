<template>
  <main id="auth">
    <div class="register" v-if="register">
      <h1>Create an Account</h1>
      <form action="submit" @submit.prevent>
        <label for="username">USERNAME</label>
        <input type="username" name="username" class="username">
        <label for="username">EMAIL</label>
        <input type="email" name="email" class="email" placeholder="">
        <label for="username">PASSWORD</label>
        <input type="password" name="password" class="password">
        <button type="submit" class="submit-btn">Create Account</button>
        <p>Already have an account? <button @click="register = false">Sign In</button></p>
      </form>
    </div>

    <div class="login" v-else>
      <h1>Welcome back!</h1>
      <h2>We're so excited to see you again!</h2>
      <form action="submit" @submit.prevent>
        <label for="username">EMAIL</label>
        <input type="text" name="email" class="email" placeholder="">
        <label for="username">PASSWORD</label>
        <input type="text" name="password" class="password">
        <button type="submit" class="submit-btn">Sign In</button>
        <p>Need an account? <button @click="register = true">Register</button></p>
      </form>
    </div>
  </main>
</template>

<script>
export default {
  name: "Auth",
  data() {
    return {
      register: false
    }
  }
}
</script>

<style lang="scss" scoped>
#auth {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #14171F;
  display: flex;
  background: linear-gradient(0deg, #603DB6 0%, #4050B5 100%);

  .register {
    width: 50%;
    height: 60%;
    max-width: 600px;
    max-height: 420px;
    background-color: #1e212c;
    border-radius: 12px;
    margin: auto;
    padding: 25px;
    justify-content: center;
    flex-direction: column;

    h1 {
      color: white;
      font-weight: 600;
      font-size: 24px;
      text-align: center;
    }
  }

  .login {
    @extend .register;
    max-height: 355px;

    h2 {
      color: white;
      opacity: .7;
      text-align: center;
      margin-bottom: 5px;
      margin-top: 1px;
    }
  }

  input {
    width: 100%;
    font-size: 1em;
    border-radius: 6px;
    background-color: #0a0d11;
    padding: 8px;
    color: rgba(255, 255, 255, 0.85);
    outline: none;
    margin-top: 1px;
    margin-bottom: 10px;

    &:focus {
      border: 1px solid rgb(0, 132, 255);
      padding: 7px;
    }
  }

  label {
    color: white;
    font-weight: 600;
    opacity: .7;
    font-size: .8em;
  }

  .submit-btn {
    width: 100%;
    font-size: 1.1em;
    color: white;
    font-weight: 600;
    padding: 10px;
    margin-top: 10px;
    border-radius: 6px;
    background: linear-gradient(-90deg, #603DB6 0%, #4050B5 100%);
    outline: none;
    transition: filter .2s ease;

    &:hover {
      filter: brightness(1.3);
    }
  }

  p {
    color: rgba(255, 255, 255, 0.3);
    font-size: .9em;
    margin-top: 2px;

    button {
      color: rgb(0, 153, 255);
      outline: none;
      text-decoration: underline;
    }
  }
}
</style>