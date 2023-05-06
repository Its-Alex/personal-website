<script>
  import SvelteMarkdown from 'svelte-markdown'

  const source = `I'm [Alexandre](githubLink).

I'm [software craftsman](https://en.wikipedia.org/wiki/Software_craftsmanship) at [jobName](jobLink) as a freelance.

[Open source](https://en.wikipedia.org/wiki/Open_source) lover.

Old student at [42](fortyTwoLink).

you can find me on [Github](githubLink),
[Linkedin](linkedinLink),
[Twitter](twitterLink).`
</script>

<style>

</style>

<div>
  <SvelteMarkdown {source} />
</div>