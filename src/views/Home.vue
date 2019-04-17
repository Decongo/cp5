<template>
  <div class="home">
    <div class="center">
      <h1>When is better</h1>
      <p>Mark the days you are free, send the schedule to others!</p>
      <router-link to="/weeks" class="card">Create Week Schedule</router-link>
      <router-link to="/months" class="card">Create Month Schedule</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "home"
};
</script>

<style scoped>
.home {
  height: 80vh;
}
.center {
  text-align: center;
}
.card {
  width: 120px;
  background-color: white;
  align-self: center;
  align-items: center;
  text-align: center;
  margin-bottom: 10px;
  transition: 0.3s;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  text-decoration: none;
  margin: 2%;
  padding: 1%;
  color: black;
}

.card:hover {
  box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
  cursor: pointer;
}
</style>

