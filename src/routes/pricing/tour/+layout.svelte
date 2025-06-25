<script>
    import { base } from '$app/paths';
    import ParallaxBanner from '$lib/components/ParallaxBanner.svelte';
  </script>
  
  <ParallaxBanner 
    imageUrl="{base}/images/pricing/tour/tour_top.jpg"
    text="Photo Tours"
    height="60vh"
  />
  
  <slot />