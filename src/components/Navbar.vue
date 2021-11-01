<template>
  <div class="navbar">
    <nav>
      <router-link :to="{ name: 'Home' }">
        <h1>SimpleNetflix</h1>
      </router-link>
      <div class="links">
        <div class="left-links" v-show="user">
          <router-link :to="{ name: 'MyList' }">My List</router-link>
        </div>
        <div class="right-links">
          <div v-if="user">
            <button @click="handleClick">Logout</button>
          </div>
          <div v-else>
            <router-link class="btn" :to="{ name: 'Signup' }"
              >Signup</router-link
            >
            <router-link class="btn" :to="{ name: 'Login' }">Login</router-link>
          </div>
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
    return { error, handleClick, user };
  },
};
</script>

<style scoped>
nav {
  display: flex;
  align-items: center;
  padding: 0.9rem;
  width: 100%;
}

.navbar {
  display: flex;
  position: fixed;
  top: 0;
  background: #181818;
  width: 100%;
  height: 60px;
  z-index: 2;
}

nav h1 {
  color: #e50914;
}

nav .links {
  width: 88%;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

nav .links a {
  text-decoration: none;
  color: white;
}

nav .right-links {
  margin-left: auto;
}

nav .right-links a,
button {
  margin-left: 1rem;
  font-size: 14px;
  background: #e50914;
  color: white;
}
</style>