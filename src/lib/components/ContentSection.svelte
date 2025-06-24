<script lang="ts">
  import { fly } from 'svelte/transition';
  import { onMount } from 'svelte';
    import { base } from '$app/paths';

  export let title: string;
  export let dividerImage = `${base}/images/line.png`;
  export let mainImage: string;
  export let description: string;
  export let whatIncluded: string;
  export let includes: string[];
  export let bookingLink: string;
  export let priceText = '';
  
  // For staggered animations
  let visible = false;
  
  onMount(() => {
    visible = true;
  });
</script>

<section 
  class="flex flex-col items-center text-center px-6 md:px-24 py-12 w-full max-w-screen-lg mx-auto"
  in:fly={{ y: 50, duration: 500 }}
>
  <!-- Title -->
  <h1 
    class="font-serif text-green-900 text-3xl font-bold mb-4 mt-10 transition-all duration-500 hover:text-green-700"
    in:fly={{ y: 30, duration: 400, delay: 100 }}
  >
    {title}
  </h1>

  <!-- Thin Line Image -->
  <img 
    src={dividerImage} 
    alt="Divider Line" 
    class="w-full h-6 mb-6 transition-all duration-1000 hover:scale-x-110"
    in:fly={{ x: -50, duration: 500, delay: 200 }}
  >

  <!-- Main Image -->
  <img 
    src={mainImage} 
    alt={title} 
    class="w-full h-auto rounded-lg shadow-md mb-6 transition-all duration-500 hover:shadow-xl hover:scale-[1.01]"
    in:fly={{ y: 40, duration: 600, delay: 300 }}
  >

  <!-- Description -->
  <p 
    class="font-serif text-gray-700 mb-4 transition-all duration-500 hover:text-gray-900"
    in:fly={{ y: 20, duration: 500, delay: 400 }}
  >
    {description}
  </p>

  <!-- What's Included -->
  {#if visible} <!-- Only animate child elements when section is visible -->
    <div class="font-serif w-full text-left px-6 md:px-16">
      <p 
        class="font-serif text-gray-700 mb-4 transition-all duration-500"
        in:fly={{ x: -20, duration: 500, delay: 500 }}
      >
        {whatIncluded}
      </p>
      <ul class="text-gray-600 space-y-2">
        {#each includes as item, i}
          <li 
            class="flex items-start"
            in:fly={{ x: -30, duration: 400, delay: 600 + (i * 100) }}
          >
            <span class="text-yellow-500 font-semibold mr-2">•</span> {item}
          </li>
        {/each}
      </ul>
    </div>
  {/if}

  <!-- Booking Button -->
<a
  href={bookingLink}
  class="mt-6 px-4 py-2 border-1 border-black text-black rounded-lg 
        bg-transparent hover:shadow-md transition-all duration-300"
  target="_blank"
  rel="noopener noreferrer"
>
  {priceText}
</a>
</section>

