<script lang="ts">
  import LeftBar from '$lib/frontpage/LeftBar.svelte'
  import Description from '$lib/frontpage/Description.svelte'

  let isAnimating: boolean = false
  const onMouseOver = (): void => {
    if (!isAnimating) {
      isAnimating = true
    }
  }
  const onAnimationEnd = (): void => {
    isAnimating = false
  }
</script>

<div
  class="m-0 grid h-full w-full grid-cols-1 grid-rows-[20%_80%] bg-gray-100 p-0 md:grid-cols-[20%_80%] md:grid-rows-1"
>
  <LeftBar />
  <div class="grid place-items-center">
    <div class="flex flex-col flex-wrap">
      <div class="flex items-center justify-center">
        <div
          role="none"
          class="inline-block cursor-pointer text-6xl {isAnimating
            ? 'animate-[wave_2s_ease-in-out]'
            : ''}"
          on:mouseover={onMouseOver}
          on:focus={onMouseOver}
          on:animationend={onAnimationEnd}
        >
          👋
        </div>
      </div>
      <Description />
    </div>
  </div>
</div>

<style>
</style>
