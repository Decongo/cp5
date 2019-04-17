<template>
  <div>
    <div v-if="user" @click="logout()" class="w">Log out</div>
    <router-link v-else to="/login" class="w">Log in</router-link>
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
  width: 100%;
  text-decoration: none;
  color: black;
}
</style>
