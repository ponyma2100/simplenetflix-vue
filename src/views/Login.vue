<template>
  <div class="container">
    <form @submit.prevent="handleSubmit">
      <h3>Login</h3>
      <input type="email" v-model="email" placeholder="email" required />
      <input
        type="password"
        v-model="password"
        placeholder="password"
        required
      />
      <div v-if="error" class="error">{{ error }}</div>
      <button v-if="!isPending">Log in</button>
      <button v-if="isPending" disabled>Loading</button>
      <div class="info">
        <p>No Account?</p>
        <br />
        <router-link :to="{ name: 'Signup' }">Signup!</router-link>
      </div>
    </form>
  </div>
</template>

<script>
import useLogin from "../composables/useLogin";
import { ref } from "@vue/reactivity";
import { useRouter } from "vue-router";

export default {
  setup() {
    const { error, login, isPending } = useLogin();
    const router = useRouter();
    const email = ref("");
    const password = ref("");

    const handleSubmit = async () => {
      const res = await login(email.value, password.value);
      if (!error.value) {
        router.push({ name: "Home" });
        // console.log("user login");
      }
    };

    return { email, password, handleSubmit, error, isPending };
  },
};
</script>

<style scoped>
button {
  background: #e50914;
  color: white;
  width: 100%;
}

button:hover {
  filter: brightness(85%);
}

button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

form {
  height: 300px;
  top: 5%;
  position: relative;
}

.container {
  margin-top: 40px;
  height: 93vh;
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