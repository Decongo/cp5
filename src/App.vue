<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link>|
      <router-link to="/weeks">My Weeks</router-link>|
      <router-link to="/months">My Months</router-link>
    </div>
    <router-view/>
  </div>
</template>

<style>
body {
  background-color: #eeeeee;
  margin: 0;
  padding: 0;
  font-family: Arial, Helvetica, sans-serif;
}
</style>
