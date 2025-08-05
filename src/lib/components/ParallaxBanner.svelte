<script lang="ts">
  export let imageUrl: string;
  export let height = "60vh";
  export let text = "";
  export let textSize = "text-4xl";
</script>

<section
  class="relative w-full overflow-hidden flex items-center justify-center"
  style="height: {height}"
>
  <!-- Side blurred fills for desktop -->
  <div class="hidden md:block absolute inset-0 z-0 pointer-events-none">
    <div
      class="absolute left-0 top-0 h-full w-1/2 bg-cover bg-center blur-xl opacity-60"
      style="background-image: url('{imageUrl}'); filter: blur(32px);"
    ></div>
    <div
      class="absolute right-0 top-0 h-full w-1/2 bg-cover bg-center blur-xl opacity-60"
      style="background-image: url('{imageUrl}'); filter: blur(32px);"
    ></div>
  </div>

  <div
    class="relative mx-auto w-full max-w-4xl h-full bg-cover bg-center z-10 transition-all duration-300"
    style="background-image: url('{imageUrl}'); height: 100%;"
  >
    {#if !imageUrl}
      <p class="absolute top-0 left-0 text-red-500 p-2">
        Error: Image not loaded
      </p>
    {/if}
  </div>

  <!-- Text overlay -->
  {#if text}
    <div
      class="absolute inset-0 flex justify-center items-center z-20 bg-black/30"
    >
      <p class="{textSize} font-bold text-white drop-shadow-lg">
        {text}
      </p>
    </div>
  {/if}
</section>
