<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">
        <p class="navItem">
          <strong>When is better</strong>
        </p>
      </router-link>|
      <router-link to="/weeks" class="navItem">My Weeks</router-link>|
      <router-link to="/months" class="navItem">My Months</router-link>|
      <LoginLogout class="navItem"/>
    </div>
    <router-view/>
    <footer>
      <p>
        &copy;2019 &#x7c;
        <a href="https://github.com/Decongo/cp5">Source</a>
      </p>
    </footer>
  </div>
</template>

<script>
import LoginLogout from "@/components/LoginLogout.vue";
export default {
  components: {
    LoginLogout
  }
};
</script>


<style>
body {
  background-color: #eeeeee;
  margin: 0;
  padding: 0;
  font-family: Arial, Helvetica, sans-serif;
}

#nav {
  background-color: #949494;
  padding: 0 2%;
}
#nav p {
  border: 1px solid black;
  display: inline-block;
  padding: 1% 2%;
}
.navItem {
  padding: 1% 2% 1% 2%;
  display: inline-block;
  text-decoration: none;
  color: black;
  font-size: small;
}
.navItem:hover {
  background-color: #c0c7ff;
}

footer {
  margin-top: auto;
  padding: 0.5em;
  width: 100%;
  background-color: rgb(109, 109, 109);
  text-align: center;
}
footer p,
footer a {
  color: white;
  text-decoration: none;
  font-size: x-small;
}

footer a:hover {
  text-decoration-color: white;
  text-decoration: underline;
  color: white;
}
</style>
