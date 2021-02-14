<template>
  <main-header></main-header>
  <router-view></router-view>
</template>

<script>
import MainHeader from './components/layout/MainHeader.vue'

export default {
  name: 'App',
  components: {
    MainHeader

  }
}
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Lato:wght@400;700&display=swap");

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: "Lato", sans-serif;
  font-size: 16px;
  background-color: #0e193a;
}
</style>
