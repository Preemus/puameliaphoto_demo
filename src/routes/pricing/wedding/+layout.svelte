<script>
    import { base } from '$app/paths';
    import ParallaxBanner from '$lib/components/ParallaxBanner.svelte';
  </script>
  
  <ParallaxBanner 
    imageUrl="{base}/images/pricing/wedding/wedding_top.jpg"
    text="Weddings"
    height="60vh"
  />
  
  <slot />