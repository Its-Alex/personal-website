<script lang="ts">
  let props = $props()
</script>

<div class="custom-sidebar">
  <div class="custom-profil-picture">
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
    />
  </div>
  <ul class="custom-menu">
    <li>
      <a href={props.resume_link} rel="external">
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

<style>
  a {
    text-decoration: none;
    color: inherit;
    font-weight: 700;
    font-size: 1.1rem;
  }

  .custom-sidebar {
    display: grid;
    place-content: center;
    background: linear-gradient(10deg, #502be3, #9630fd);

    @media screen and (min-width: 750px) {
      max-width: 450px;
      grid-template-columns: 100%;
      grid-template-rows: 21% 20% 8% 20% 31%;
      clip-path: polygon(0 0, 100% 0, 70% 100%, 0% 100%);

      padding-right: 10%;
      grid-column: 1 / 2;
    }

    @media screen and (max-width: 750px) {
      grid-template-columns: 20% 20% 20% 20% 20%;
      grid-template-rows: 100%;

      grid-row: 1 / 2;
    }

    .custom-profil-picture {
      display: grid;
      grid-template: 100% / 100%;
      place-items: center;

      @media screen and (min-width: 750px) {
        padding: 10%;
        grid-row-start: 2;
      }

      @media screen and (max-width: 750px) {
        grid-column-start: 2;
        padding: 5%;
      }

      img {
        width: 100%;
        height: auto;
        max-width: min(300px, 80vw);
        min-width: 60px;
        border-radius: 100%;
        object-fit: cover;
        aspect-ratio: 1;
      }
    }

    .custom-menu {
      display: grid;
      place-content: center;
      font-weight: 900;
      font-size: 1.2rem;
      color: #fcfbfb;

      @media screen and (min-width: 750px) {
        grid-template-rows: 30% 20% 20% 30%;
        grid-row-start: 4;
      }

      @media screen and (max-width: 750px) {
        grid-column-start: 4;
      }

      li {
        grid-row-start: 3;

        a {
          font-size: 1.3rem;
        }
      }
    }
  }
</style>
