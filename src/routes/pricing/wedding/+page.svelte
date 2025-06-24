<script lang="ts">
    import ContentSection from '$lib/components/ContentSection.svelte';
  
    // Portrait data
    const portraitData = {
      title: "Weddings",
      mainImage: "/puameliaphoto_demo/images/pricing/wedding/weddings.jpg",
      description: "I'm sure you are going to be beautiful and are doing this for a good reason just don't come to me in 3 years when he hasn't touched you in 4 months and ask me why I didn't stop you.",
      whatIncluded: "What's Included:",
      includes: [
        "I'll be your passive aggressive bitch",
        "Giant folder of images some of which will actually be good... probably, I don't know.",
        "Evidence of your agreement with the state to legitimize who gets your shit if you die suddenly and haven't made a will."
      ],
      bookingLink: "https://puamelia-photo.formaloo.co/0n7o7b",
      priceText: "Starting at $2,000"
    };

    const portraitData2 = {
      title: "Dress Portrait Session",
      mainImage: "/puameliaphoto_demo/images/pricing/wedding/dress_portrait_session.jpg",
      description: "Ah yes, the fun part. I'm into this",
      whatIncluded: "What's Included:",
      includes: [
        "Location guidance and advice",
        "Hiking buddy to bring champagne"
      ],
      bookingLink: "https://puamelia-photo.formaloo.co/0n7o7b",
      priceText: "Starting at $300"
    };
  
  
  </script>
  
  
  
  
  
  <ContentSection {...portraitData} />
  <ContentSection {...portraitData2} />
