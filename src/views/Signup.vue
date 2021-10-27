<template>
  <div class="container">
    <form @submit.prevent="handleSubmit">
      <h3>Signup</h3>
      <input
        type="text"
        v-model="displayname"
        placeholder="displayname"
        required
      />
      <input type="email" v-model="email" placeholder="email" required />
      <input
        type="password"
        v-model="password"
        placeholder="password"
        required
      />
      <div v-if="error" class="error">{{ error }}</div>
      <button v-if="!isPending">Sign up</button>
      <button v-if="isPending" disabled>Loading</button>
      <div class="info">
        <p>Already have a account?</p>
        <br />
        <router-link :to="{ name: 'Login' }">Login!</router-link>
      </div>
    </form>
  </div>
</template>

<script>
import { ref } from "@vue/reactivity";
import useSignup from "../composables/useSignup";

export default {
  setup() {
    const { error, signup, isPending } = useSignup();
    const email = ref("");
    const password = ref("");
    const displayname = ref("");

    const handleSubmit = async () => {
      const res = await signup(email.value, password.value, displayname.value);
      console.log("🚀 ~ file: Signup.vue ~ line 35 ~ handleSubmit ~ res", res);
      if (!error.value) {
        console.log("user signed up");
      }
    };

    return { email, password, displayname, isPending, error, handleSubmit };
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