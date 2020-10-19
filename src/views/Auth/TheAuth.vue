<template>
  <main id="auth">
    <div class="register" v-if="register">
      <h1>Create an Account</h1>
      <form @submit.prevent="registerUser">
        <label for="username">USERNAME</label>
        <input required minlength="4" maxlength="28" v-model.trim="user.username" type="username" name="username" class="username">
        <label for="email">EMAIL</label>
        <input required minlength="5" maxlength="320" v-model.trim="user.email" type="email" name="email" class="email" placeholder="">
        <label for="password">PASSWORD</label>
        <input required minlength="6" maxlength="256"  v-model="user.password" type="password" name="password" class="password">
        <button type="submit" key="register" class="submit-btn">Create Account</button>
        <p>Already have an account? <button @click="switchView">Sign In</button></p>
      </form>

      <div class="message" v-if="responseRecieved" :class="{ success: response.code < 400 }">
        <p>{{ response.message }}</p>
      </div>
    </div>

    <div class="login" v-else>
      <h1>Welcome back!</h1>
      <h2>We're so excited to see you again!</h2>
      <form @submit.prevent="signInUser">
        <label for="username">EMAIL</label>
        <input required minlength="5" maxlength="320" v-model="user.email" type="email" name="email" class="email" placeholder="">
        <label for="password">PASSWORD</label>
        <input minlength="6" maxlength="256" v-model="user.password" type="password" name="password" class="password">
        <button type="submit" key="sign-in" class="submit-btn">Sign In</button>
        <p>Need an account? <button key="switch-to-register" @click="switchView">Register</button></p>
      </form>

      <div class="message" v-if="responseRecieved" :class="{ success: response.code < 400 }">
        <p>{{ response.message }}</p>
      </div>
    </div>
  </main>
</template>

<script>
export default {
  name: "Auth",
  data() {
    return {
      register: false,
      response: {},
      responseRecieved: false,
      user: {
        username: "",
        email: "",
        password: ""
      }
    }
  },
  methods: {
    async registerUser() {
      const user = this.user

      const res = await fetch("/auth/register", {
        method: "POST",
        mode: "cors",
        credentials: 'include',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
      })
      .catch(e => console.log(e))
      
      const text = await res.text();
      
      this.response = {
        message: text,
        code: res.status
      }

      this.responseRecieved = true;
    },
    async signInUser() {
      const user = {
        email: this.user.email,
        password: this.user.password
      }

      const res = await fetch("/auth/login", {
        method: "POST",
        mode: "cors",
        credentials: "include",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
      })
      .catch(e => console.log(e))
      
      const text = await res.text();

      console.log(res.headers)
      
      this.response = {
        message: text,
        code: res.status
      }

      this.responseRecieved = true;
    },
    switchView() {
      this.user = {
        username: "",
        email: "",
        password: ""
      };

      this.register = !this.register;

      this.response = {};
      this.responseRecieved = false;
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

  .message {
    width: 100%;
    font-size: 1em;
    border-radius: 6px;
    background-color: rgba(220, 53, 70, 0.2);
    padding: 18px 16px;
    color: rgba(255, 255, 255, 0.85);
    outline: none;
    margin-top: 20px;
    display: flex;
    align-items: center;
    border: 2px solid #ff001938;

    p {
      color: #ff0019;
      line-height: 1;
      font-size: 1em;
    }

    &.success {
      background-color: rgba(53, 220, 61, 0.2);
      border: 2px solid #00ff0d38;

      p {
        color: #00ff15;
      }
    }
  }

  .register {
    width: 50%;
    max-width: 600px;
    background-color: #1e212c;
    border-radius: 12px;
    margin: auto;
    padding: 45px 30px;
    justify-content: center;
    flex-direction: column;

    @media screen and (max-width: 850px) {
      width: 100%;
      height: 100%;
      border-radius: 0px;
      max-width: 1000px;
    }

    h1 {
      color: white;
      font-weight: 600;
      font-size: 24px;
      text-align: center;
    }
  }

  .login {
    @extend .register;

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