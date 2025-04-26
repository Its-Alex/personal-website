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
    resume_link="https://github.com/Its-Alex/resume/releases/download/latest/resume_en.pdf"
    resume_text="Resume"
  />
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
      <div class="markdown-description">
        <p class="m-3 text-lg">I'm Alexandre.</p>
        <p class="m-3 text-lg">
          <a href="https://fr.wikipedia.org/wiki/Software_craftsmanship">Software craftsman</a>
          currently at
          <a href="https://www.xxiiai.com/">XXII</a>.
        </p>
        <p class="m-3 text-lg">
          Fervent supporter of
          <a href="https://fr.wikipedia.org/wiki/Open_source">Open source</a>.
        </p>
        <p class="m-3 text-lg">
          Former
          <a href="https://en.wikipedia.org/wiki/DevOps">DevOps</a>
          at
          <a href="https://www.scaleway.com/">Scaleway</a>
          and
          <a href="https://42.fr/">42</a>
          student.
        </p>
        <p class="m-3 text-lg">
          You can find me on
          <a href="https://github.com/Its-Alex/">Github</a>,
          <a href="https://www.linkedin.com/in/its-alex/">Linkedin</a>,
          <a href="https://piaille.fr/@itsalex">Mastodon</a>.
        </p>
      </div>
    </div>
  </div>
</div>
