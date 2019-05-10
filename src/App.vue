<template>
  <div id="app">
    <Nav/>
    <router-view/>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Nav from '@/components/Navbar.vue'

export default Vue.extend({
  name: 'App',
  components: {
    Nav
  }
})
</script>

<style>
* {
    box-sizing: border-box;
    outline: none;
    scroll-behavior: smooth;
}

::-webkit-scrollbar-track {
    background: #bdbdbd;
}
::-webkit-scrollbar {
    width: 6px;
}
::-webkit-scrollbar-thumb {
    background-color: #757575;
}

html, body, #root, #root-container {
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100%;
    font-family: 'Lato', sans-serif;
    font-size: 1rem;
    color: #343434;
}

a {
    text-decoration: none;
    color: inherit;
}
</style>
