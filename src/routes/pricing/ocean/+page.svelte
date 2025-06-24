<script lang="ts">
    import ContentSection from '$lib/components/ContentSection.svelte';
  
    // Portrait data
    const portraitData = {
      title: "Surfing",
      mainImage: "/puameliaphoto_demo/images/pricing/ocean/surfing.jpg",
      description: "Dynamic photos of you in your element.",
      whatIncluded: "What's Included:",
      includes: [
        "On-location surf photography",
        "Action shots from water, shore, and air.",
        "Fast turnaround with cloud delivery"
      ],
      bookingLink: "https://puamelia-photo.formaloo.co/0n7o7b",
      priceText: "Starting at $300"
    };

    const portraitData2 = {
      title: "Underwater",
      mainImage: "/puameliaphoto_demo/images/pricing/ocean/underwater.jpg",
      description: "Immerse yourself in a breathtaking underwater session that captures the magic of the ocean from below the surface. Whether you're free diving, swimming, or simply floating in the currents, I’ll document the beauty of weightlessness and the vibrant marine world around you.",
      whatIncluded: "What's Included:",
      includes: [
        "Professional underwater photography session",
        "High-resolution, color-corrected images",
        "Guidance on poses and breath control",
        "Fast turnaround with cloud delivery"
      ],
      bookingLink: "https://puamelia-photo.formaloo.co/0n7o7b",
      priceText: "Starting at $400"
    };
  
  
  </script>
  
  
  
  
  
  <ContentSection {...portraitData} />
  <ContentSection {...portraitData2} />
