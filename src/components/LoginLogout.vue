<template>
  <div>
    <div v-if="user" @click="logout()" class="w">Log out</div>
    <div v-else>
      <router-link to="/login" class="w">Log in</router-link>|
      <router-link to="/register" class="w">Register</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "LoginLogout",
  computed: {
    user() {
      return this.$store.state.user;
    }
  },
  methods: {
    async logout() {
      try {
        this.error = await this.$store.dispatch("logout");
      } catch (error) {
        console.log(error);
      }
    }
  }
};
</script>

<style scoped>
.w {
  text-decoration: none;
  color: black;
  display: inline-block;
  padding: 1% 2% 1% 2%;
  font-size: small;
}
.w:hover {
  background-color: #c0c7ff;
}
</style>
