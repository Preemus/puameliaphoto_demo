<script>
    import { base } from '$app/paths';
    import ParallaxBanner from '$lib/components/ParallaxBanner.svelte';
  </script>
  
  <ParallaxBanner 
    imageUrl="{base}/images/pricing/canyoning/canyoning_top.jpg"
    text="Canyoning"
    height="60vh"
  />
  
  <slot />