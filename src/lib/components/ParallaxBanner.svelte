<script lang="ts">
  import { onMount } from 'svelte';
  import { fade } from 'svelte/transition';

  export let imageUrl: string;
  export let height = '60vh';
  export let text = '';
  export let textSize = 'text-4xl';
  export let transitionDuration = 70; // Fade duration in ms

  let parallaxBg: HTMLElement;

  const handleScroll = () => {
    if (parallaxBg) {
      parallaxBg.style.transform = `translateY(${window.scrollY * 0.5}px)`;
    }
  };

  onMount(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  });
</script>

<section class="relative w-full overflow-hidden" style="height: {height}">
  <!-- Image with parallax effect and fade transition -->
  <div
    class="absolute inset-0 bg-cover bg-center bg-gray-300 z-0"
    style="background-image: url('{imageUrl}')"
    bind:this={parallaxBg}
    in:fade={{ duration: transitionDuration }}
    out:fade={{ duration: transitionDuration }}
  >
    {#if !imageUrl}
      <p class="absolute top-0 left-0 text-red-500 p-2">Error: Image not loaded</p>
    {/if}
  </div>

  <!-- Text overlay -->
  {#if text}
    <div class="absolute inset-0 flex justify-center items-center z-10 bg-black/30">
      <p 
        class="{textSize} font-bold text-white drop-shadow-lg"
        in:fade={{ delay: transitionDuration + 100, duration: 300 }}
      >
        {text}
      </p>
    </div>
  {/if}
</section>