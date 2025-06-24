<script lang="ts">
    import ContentSection from '$lib/components/ContentSection.svelte';
  
    // Portrait data
    const portraitData = {
      title: "Full-Day Events",
      mainImage: "/images/pricing/event/full_day_events.jpg",
      description: "Enjoy full coverage that ensures every significant moment of your event is captured with precision and care. I work to document the vibrant atmosphere and intricate details, delivering a comprehensive collection of high-resolution images you can treasure.",
      whatIncluded: "What's Included:",
      includes: [
        "Complete event coverage",
        "Pre-event consultation",
        "Digital gallery of high-resolution images"
      ],
      bookingLink: "https://puamelia-photo.formaloo.co/0n7o7b",
      priceText: "Starting at $4,000"
    };


    const portraitData2 = {
      title: "Half Day",
      mainImage: "/images/pricing/event/half_day.jpg",
      description: "Focus on your event’s most memorable moments with a dedicated 4-hour session that balances both candid and posed shots. This package captures the essence of your celebration, resulting in a dynamic digital gallery perfect for sharing and reminiscing.",
      whatIncluded: "What's Included:",
      includes: [
        "4-hour dedicated coverage",
        "Emphasis on key moments and guest interactions",
        "Quick digital delivery"
      ],
      bookingLink: "https://puamelia-photo.formaloo.co/0n7o7b",
      priceText: "Starting at $2,000"
    };

    const portraitData3 = {
      title: "Moments",
      mainImage: "/images/pricing/event/moments.jpg",
      description: "Capture the vibrant highlights of your event in a quick, dynamic 2–3 hour session designed for fast-paced celebrations. With an emphasis on creating social media-ready imagery, you’ll receive a curated collection of images that perfectly encapsulate your day.",
      whatIncluded: "What's Included:",
      includes: [
        "2 hour session",
        "Edited highlight reel",
        "Rapid digital turnaround"
      ],
      bookingLink: "https://puamelia-photo.formaloo.co/0n7o7b",
      priceText: "Starting at $500"
    };
  
  
  </script>
  
  
  
  
  
  <ContentSection {...portraitData} />
  <ContentSection {...portraitData2} />
  <ContentSection {...portraitData3} />
