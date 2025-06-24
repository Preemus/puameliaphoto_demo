<script>
    import { base } from '$app/paths';
    import ParallaxBanner from '$lib/components/ParallaxBanner.svelte';
  </script>
  
  <ParallaxBanner 
    imageUrl="{base}/images/pricing/drone/drone_top.jpg"
    text="Drone"
    height="60vh"
  />
  
  <slot />