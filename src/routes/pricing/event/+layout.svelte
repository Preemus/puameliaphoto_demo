<script>
    import { base } from '$app/paths';
    import ParallaxBanner from '$lib/components/ParallaxBanner.svelte';
  </script>
  
  <ParallaxBanner 
    imageUrl="{base}/images/pricing/event/event_top.JPG"
    text="Event"
    height="60vh"
  />
  
  <slot />