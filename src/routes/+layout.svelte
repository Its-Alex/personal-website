<style>
  /* Used only for global CSS */
  :global(*) {
    box-sizing: border-box;
    outline: none;
    scroll-behavior: smooth;
    font-family: 'Lato', sans-serif;
    font-size: 1rem;
  }

  :global(*)::-webkit-scrollbar-track {
    background: #bdbdbd;
  }

  :global(*)::-webkit-scrollbar {
    width: 6px;
  }

  :global(*)::-webkit-scrollbar-thumb {
    background-color: #757575;
  }

  :global(li) {
    list-style-type: none;
  }

  :global(ul) {
    margin: 0;
    padding: 0;
  }

  :global(a) {
    text-decoration: none;
    color: inherit;
    font-weight: 700;
    font-size: 1.1rem;
  }
</style>

<slot />