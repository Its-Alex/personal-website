<script lang="ts">
  import LeftBar from '$lib/frontpage/LeftBar.svelte'

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
  <LeftBar
    resume_link="https://github.com/Its-Alex/resume/releases/download/latest/resume_fr.pdf"
    resume_text="Curriculum"
  />
  <div class="grid place-items-center">
    <div class="flex flex-col flex-wrap">
      <div class="flex items-center justify-center">
        <div
          role="none"
          class="inline-block cursor-pointer text-6xl {isAnimating ? 'wave-animate' : ''}"
          on:mouseover={onMouseOver}
          on:focus={onMouseOver}
          on:click={onMouseOver}
          on:animationend={onAnimationEnd}
        >
          👋
        </div>
      </div>
      <div class="markdown-description text-center">
        <p class="m-3 text-lg font-semibold">Je suis Alexandre.</p>
        <p class="m-3 text-lg">
          <a href="https://fr.wikipedia.org/wiki/Software_craftsmanship" rel="noopener"
            >Software craftsman</a
          >
          actuellement à
          <a href="https://www.xxiiai.com/" rel="noopener">XXII</a>.
        </p>
        <p class="m-3 text-lg">
          Fervent partisan de l'
          <a href="https://fr.wikipedia.org/wiki/Open_source" rel="noopener">Open source</a>.
        </p>
        <p class="m-3 text-lg">
          Ancien
          <a href="https://fr.wikipedia.org/wiki/DevOps" rel="noopener">DevOps</a>
          à
          <a href="https://www.scaleway.com/" rel="noopener">Scaleway</a>
          et élève à
          <a href="https://42.fr/" rel="noopener">42</a>.
        </p>
        <p class="m-3 text-lg">
          Vous pouvez me trouver sur
          <a href="https://github.com/Its-Alex/" rel="noopener">Github</a>,
          <a href="https://www.linkedin.com/in/its-alex/" rel="noopener">Linkedin</a>,
          <a href="https://piaille.fr/@itsalex" rel="noopener">Mastodon</a>.
        </p>
      </div>
    </div>
  </div>
</div>

<style>
  @keyframes wave {
    0% {
      transform: rotate(0deg);
    }
    17% {
      transform: rotate(14deg);
      scale: 110%;
    }
    33% {
      transform: rotate(-8deg);
      scale: 110%;
    }
    50% {
      transform: rotate(14deg);
      scale: 110%;
    }
    67% {
      transform: rotate(-4deg);
      scale: 110%;
    }
    83% {
      transform: rotate(10deg);
      scale: 110%;
    }
    100% {
      transform: rotate(0deg);
    }
  }
  .wave-animate {
    animation: wave 1.2s cubic-bezier(0.4, 0, 0.2, 1);
    transform-origin: 70% 70%;
    display: inline-block;
  }
</style>
