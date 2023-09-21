<script lang="ts">
  import LeftBar from '$lib/LeftBar.svelte'
  import Description from '$lib/Description.svelte'

  $: mousePositionInPercent = {
    x: 0,
    y: 0
  }

  const getMousePositionInPercent = (event: MouseEvent) => {
    mousePositionInPercent.x = event.clientX / window.innerWidth * 100
    mousePositionInPercent.y = event.clientY / window.innerHeight * 100
  }

  $: console.log(mousePositionInPercent)
</script>

<svelte:window on:mousemove={getMousePositionInPercent} />
<div
  class="container"
>
  <LeftBar />
  <div
    class="content"
  >
      <span class="description">
        <Description />
      </span>
      <div class="gradient-1" />
      <div class="gradient-2" />
      <div class="gradient-3" />
      <div class="gradient-4" />
      <div class="gradient-5" />
  </div>
</div>

<style lang="postcss">
  .container {
    display: grid;
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100%;
    background-color: #fcfbfb;

    @media screen and (min-width: 750px) {
      grid-template-rows: 100%;
      grid-template-columns: 20% 80%;
    }

    @media screen and (max-width: 750px) {
      grid-template-rows: 20% 80%;
      grid-template-columns: 100%;
    }
  }

  .content {
    width: 100%;
    height: 100%;

    position: relative;
    display: grid;
    place-items: center;

    @media screen and (min-width: 750px) {
      grid-column: 2 / 2;
    }

    @media screen and (max-width: 750px) {
      grid-column: 1;
      grid-row: 2 / 2;
    }

    .description {
      z-index: 999;
    }

    .gradient-1 {
      width: 5%;
      padding-bottom: 5%;

      position: absolute;
      left: 50%;
      top: 50%;

      border-radius: 100%;
      background-color: #eee;
    }
    .gradient-2 {
      width: 5%;
      padding-bottom: 5%;

      position: absolute;
      left: 20%;
      top: 30%;

      border-radius: 100%;
      background-color: #ddd;
    }
    .gradient-3 {
      width: 5%;
      padding-bottom: 5%;

      position: absolute;
      left: 30%;
      top: 30%;

      border-radius: 100%;
      background-color: #ccc;
    }
    .gradient-4 {
      width: 5%;
      padding-bottom: 5%;

      position: absolute;
      left: 40%;
      top: 30%;

      border-radius: 100%;
      background-color: #ddc;
    }
    .gradient-5 {
      width: 5%;
      padding-bottom: 5%;

      position: absolute;
      left: 50%;
      top: 30%;

      border-radius: 100%;
      background-color: #dcc;
    }
  }
</style>
