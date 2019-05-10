<template>
<div id='profile' >
  <img src='https://s.gravatar.com/avatar/558cb4dd16019bf6123d241ad5d6ee56?s=512' alt='profile' />
  <div>
    <p class='work'>DEVELOPER</p>
    <div class='logo'>
      <div class='cut' />
      <img src='../assets/rocket-ship.svg' alt='logo' />
      <div class='cut' />
    </div>
  </div>
</div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'profil',
  components: {
  }
})
</script>

<style>
#profile {
  width: 100%;
  height: 100vh;
  background-color: #03A9F4;
  background-color: #f9f9f9;
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
}

#profile > img {
    width: 18vw;
    height: 18vw;
    min-width: 200px;
    min-height: 200px;
    border-radius: 100%;
}

#profile > div {
    margin: 0;
    padding: 0;
    width: 100%;
    cursor: default;
    font-family: 'Montserrat', sans-serif;
    font-weight: bold;
    font-size: 1.3rem;
    overflow-x: hidden;
    display: flex;
    flex-flow: column nowrap;
    justify-content: center;
    align-items: center;

}
#profile > div > .work {
  margin: 30px 0;
  padding: 0;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2.5rem;
}

#profile > div > .logo {
  margin: 0;
  width: 100%;
  height: 80px;
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;
}

#profile > div > .logo > .cut {
  margin: 2px 0;
  width: 15%;
  height: 2px;
  background-color: #343434;
  border-radius: 10px;
}

#profile > div > .logo > img {
  margin: 0 15px;
  height: 100%;
  width: auto;
  animation-fill-mode: forwards;
}
</style>
