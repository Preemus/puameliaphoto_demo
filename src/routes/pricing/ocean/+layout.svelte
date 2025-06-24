<script>
    import { base } from '$app/paths';
    import ParallaxBanner from '$lib/components/ParallaxBanner.svelte';
  </script>
  
  <ParallaxBanner 
    imageUrl="{base}/images/pricing/ocean/ocean_top.jpg"
    text="Ocean"
    height="60vh"
  />
  
  <slot />