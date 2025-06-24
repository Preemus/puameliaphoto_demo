<script lang="ts">
    import ContentSection from '$lib/components/ContentSection.svelte';
  
    // Portrait data
    const portraitData = {
      title: "Canyons",
      mainImage: "/images/pricing/drone/drone_image1.jpg",
      description: "Bring your wet-suit and a lunch, this may go long. I'll shoot your canyon adventure here on Maui we can collaborate to find the perfect canyon for you.",
      whatIncluded: "What's Included:",
      includes: [
        "Full-day canyon shoot",
        "Action-packed photography",
        "Safety consultation & itinerary planning"
      ],
      bookingLink: "https://puamelia-photo.formaloo.co/0n7o7b",
      priceText: "Starting at $3,000"
    };

    const portraitData2 = {
      title: "Short Canyon",
      mainImage: "/images/pricing/drone/drone_image2.jpg",
      description: "Easier route, smaller scale. You will make it on time to your dinner reservation.",
      whatIncluded: "What's Included:",
      includes: [
        "Half day canyoning experience",
        "Emphasis on candid action shots",
        "Customized route guidance"
      ],
      bookingLink: "https://puamelia-photo.formaloo.co/0n7o7b",
      priceText: "Starting at $1,500"
    };
  
  
  </script>
  
  
  
  
  
  <ContentSection {...portraitData} />
  <ContentSection {...portraitData2} />
