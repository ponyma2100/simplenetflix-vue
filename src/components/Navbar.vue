<template>
  <div class="navbar">
    <nav>
      <h1>SimpleNetflix</h1>
      <div class="links">
        <div v-if="user">
          <button @click="handleClick">Logout</button>
        </div>
        <div v-else>
          <router-link class="btn" :to="{ name: 'Signup' }">Signup</router-link>
          <router-link class="btn" :to="{ name: 'Login' }">Login</router-link>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
import useLogout from "../composables/useLogout";
import getUser from "../composables/getUser";
import { useRouter } from "vue-router";

export default {
  setup() {
    const { error, logout } = useLogout();
    const { user } = getUser();
    const router = useRouter();

    const handleClick = async () => {
      await logout();
      console.log("user logged out");
      router.push({ name: "Login" });
    };
    console.log("user", user);
    return { error, handleClick, user };
  },
};
</script>

<style scoped>
nav {
  display: flex;
  align-items: center;
  padding: 0.9rem;
}

nav h1 {
  color: #e50914;
}

nav .links {
  margin-left: auto;
}

nav .links a,
button {
  margin-left: 1rem;
  font-size: 14px;
  background: #e50914;
  color: white;
}
</style>