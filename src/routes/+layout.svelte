<script>
  import "../app.css";
  import Header from '$lib/components/Header.svelte';
  import Footer from '$lib/components/Footer.svelte';
  import { afterNavigate } from '$app/navigation';

// Force scroll to top after navigation to any non-homepage route
afterNavigate(({ to, from }) => {
  // Handle hash navigation (specifically for the about link)
  if (to?.url.hash) {
    // Use a longer timeout to ensure DOM is fully loaded
    setTimeout(() => {
      // Try multiple selector methods
      let target = document.querySelector(to.url.hash);
      
      // If querySelector fails, try getElementById as fallback
      if (!target && to.url.hash.startsWith('#')) {
        const id = to.url.hash.substring(1);
        target = document.getElementById(id);
      }
      
      if (target) {
        // Adjust scroll to account for fixed header if needed
        const headerHeight = document.querySelector('header')?.offsetHeight || 0;
        const elementPosition = target.getBoundingClientRect().top + window.scrollY;
        
        window.scrollTo({
          top: elementPosition - headerHeight,
          behavior: 'smooth'
        });
      } else {
        console.warn(`Element not found: ${to.url.hash}`);
      }
    }, 100); // Longer timeout for more reliability
  }
  // Only scroll to top for non-hash navigation and non-homepage routes
  else if (to && to.url.pathname !== '/') {
    setTimeout(() => {
      window.scrollTo({
        top: 0,
        behavior: 'instant'
      });
    }, 10);
  }
});
</script>


<Header />
<slot />
<Footer />