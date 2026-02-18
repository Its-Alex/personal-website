<script lang="ts">
  let props = $props()
</script>

<div
  class="grid place-content-center bg-[linear-gradient(10deg,#502be3,#9630fd)]
    max-[749px]:row-start-1 max-[749px]:grid-cols-[20%_20%_20%_20%_20%] max-[749px]:grid-rows-[100%]
    min-[750px]:col-start-1 min-[750px]:max-w-112.5 min-[750px]:grid-cols-[100%]
    min-[750px]:grid-rows-[21%_20%_8%_20%_31%] min-[750px]:pr-[10%]
    min-[750px]:[clip-path:polygon(0_0,100%_0,70%_100%,0_100%)]"
>
  <div
    class="grid h-full w-full place-items-center
      max-[749px]:col-start-2 max-[749px]:p-[5%]
      min-[750px]:row-start-2 min-[750px]:p-[10%]"
  >
    <img
      src="https://s.gravatar.com/avatar/558cb4dd16019bf6123d241ad5d6ee56?s=300"
      srcSet={`https://s.gravatar.com/avatar/558cb4dd16019bf6123d241ad5d6ee56?s=80 80w,
                  https://s.gravatar.com/avatar/558cb4dd16019bf6123d241ad5d6ee56?s=150 150w,
                  https://s.gravatar.com/avatar/558cb4dd16019bf6123d241ad5d6ee56?s=300 300w,
                  https://s.gravatar.com/avatar/558cb4dd16019bf6123d241ad5d6ee56?s=600 600w`}
      sizes="(max-width: 750px) 80px,
              (max-width: 1200px) 150px,
              300px"
      alt="profil"
      loading="eager"
      decoding="async"
      fetchpriority="high"
      class="aspect-square w-full max-w-[min(300px,80vw)] min-w-15 rounded-full object-cover"
    />
  </div>
  <ul
    class="grid place-content-center text-xl font-black text-[#fcfbfb]
      max-[749px]:col-start-4
      min-[750px]:row-start-4 min-[750px]:grid-rows-[30%_20%_20%_30%]"
  >
    <li class="min-[750px]:row-start-3">
      <a
        href={props.resume_link}
        rel="external"
        class="text-[1.1rem] font-bold text-inherit no-underline min-[750px]:text-[1.3rem]"
      >
        {props.resume_text}
      </a>
    </li>
    <!-- Hidden for now because feature not finished -->
    <!-- <li>
      <a href="/blog">
        {$_('Blog')}
      </a>
    </li> -->
  </ul>
</div>
