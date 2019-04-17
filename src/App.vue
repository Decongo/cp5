<template>
  <div id="app">
    <div id="nav">
      <router-link to="/" class="navItem">Home</router-link>|
      <router-link to="/weeks" class="navItem">My Weeks</router-link>|
      <router-link to="/months" class="navItem">My Months</router-link>
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

<style>
body {
  background-color: #eeeeee;
  margin: 0;
  padding: 0;
  font-family: Arial, Helvetica, sans-serif;
}

#nav {
  background-color: #949494;
  padding: 1% 2% 1% 2%;
}
.navItem {
  padding: 1% 2% 1% 2%;
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
