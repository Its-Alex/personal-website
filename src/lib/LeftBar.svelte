<script lang='ts'>
    import { _ } from 'svelte-i18n'
</script>

<div
  class="custom-sidebar"
>
  <div
    class="custom-profil-picture"
  >
    <img
      src="https://s.gravatar.com/avatar/558cb4dd16019bf6123d241ad5d6ee56?s=512"
      srcSet={`https://s.gravatar.com/avatar/558cb4dd16019bf6123d241ad5d6ee56?s=320 64w,
                  https://s.gravatar.com/avatar/558cb4dd16019bf6123d241ad5d6ee56?s=480 128w,
                  https://s.gravatar.com/avatar/558cb4dd16019bf6123d241ad5d6ee56?s=800 256w`}
      sizes="(max-width: 64px) 64px,
              (max-width: 128px) 128px,
              (max-width: 256px) 256px,
              512px"
      alt="profil"
    />
  </div>
  <ul
    class="custom-menu"
  >
    <li>
      <a
        href={$_('resume.link')}
      >
        {$_('Resume')}
      </a>
    </li>
  </ul>
</div>

<style lang="postcss">
  .custom-sidebar {
    display: grid;
    place-content: center;
    background: linear-gradient(
      10deg,
      #502be3,
      #9630fd
    );

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
      }
      img {
        width: 100%;
        max-width: 300px;
        border-radius: 100%;
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
