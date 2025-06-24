<script>
    import { base } from '$app/paths';
  import ParallaxBanner from '$lib/components/ParallaxBanner.svelte';
</script>

<ParallaxBanner 
  imageUrl="{base}/images/pricing/portrait/portrait_top.jpg"
  text="Portrait"
  height="60vh"
/>

<slot />