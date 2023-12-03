<script lang='ts'>
  import LeftBar from '$lib/LeftBar.svelte'
  import Description from '$lib/Description.svelte'
</script>

<div
  class="custom-container"
>
  <LeftBar />
  <div
    class="custom-content"
  >
    <div>
      <Description />
    </div>
  </div>
</div>

<style>
  .custom-container {
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

  .custom-content {
    display: grid;
    place-items: center;
  }
</style>
