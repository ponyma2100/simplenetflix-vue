<template>
  <header></header>
  <div class="container">
    <h1>SimpleNetflix</h1>
    <form @submit.prevent="handleSubmit">
      <h3>Login</h3>
      <input type="email" v-model="email" placeholder="email" />
      <input type="password" v-model="password" placeholder="password" />
      <div v-if="error" class="error">{{ error }}</div>
      <button v-if="!isPending">Log in</button>
      <button v-if="isPending">Loading</button>
      <div class="info">
        <p>No Account?</p>
        <br />
        <a href="#">Signup!</a>
      </div>
    </form>
  </div>
</template>

<script>
import useLogin from "../composables/useLogin";
import { ref } from "@vue/reactivity";

export default {
  setup() {
    const { error, login, isPending } = useLogin();
    const email = ref("");
    const password = ref("");

    const handleSubmit = async () => {
      const res = await login(email.value, password.value);
      if (!error.value) {
        console.log("user login");
      }
    };

    return { email, password, handleSubmit, error, isPending };
  },
};
</script>

<style scoped>
h1 {
  color: #e50914;
  padding: 1rem;
}
button {
  background: #e50914;
  color: white;
  width: 100%;
}

button:hover {
  filter: brightness(85%);
}
.container {
  height: 100vh;
  background-image: url("../../src/assets/loginbg.jpg");
  background-size: cover;
}
.info {
  display: flex;
  padding: 0.5rem 0;
}
.info p {
  margin-right: 5px;
}
</style>