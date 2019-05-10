<template>
  <div id='header'>
    <p class='name'>ALEXANDRE</p>
    <ul class='menu'>
      <li><a href="https://github.com/Its-Alex">GITHUB</a></li>
      <li><a href="https://twitter.com/ItsNeoAlex">TWITTER</a></li>
      <li><a href="https://www.linkedin.com/in/its-alex/">LINKEDIN</a></li>
      <li><a href="https://dl.itsalex.fr/public/cv_en.pdf">CV</a></li>
    </ul>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'navbar',
  components: {
  }
})
</script>

<style>
#header {
  margin: 0;
  padding: 10px;
  width: 100%;
  position: fixed;
  top: 0;
  z-index: 2;
  display: flex;
  flex-flow: row wrap;
  justify-content: space-around;
  align-items: center;
  background-color: #304051;
  color: #f4f4f4;
}

p {
  margin: 0;
  padding: 0;
  font-family: 'lato', monospace;
  font-weight: bold;
  font-size: 3rem;
}

ul {
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  flex-flow: row wrap;
}
ul > li {
  margin: 0 6px;
  padding: 4px;
  font-family: 'Montserrat', sans-serif;
  font-weight: bold;
  font-size: 1.2rem;
  cursor: pointer;
}
</style>
