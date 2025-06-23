<script lang="ts">
  import ContentSection from '$lib/components/ContentSection.svelte';

  // Portrait data
  const portraitData = {
    title: "Family Portraits",
    mainImage: "/images/pricing/portrait/family_portrait.jpg",
    description: "Shoot at place of your choice or I am happy to recommend somewhere you will love. beaches, grassy sea cliffs, jungle, or waterfalls.",
    whatIncluded: "What's Included:",
    includes: [
      "1 hour shoot ",
      "Mornings or evening",
      "Fast turnaround with cloud delivery"
    ],
    bookingLink: "https://your-google-form.com",
    priceText: "Starting at $400"
  };

  const portraitData2 = {
  title: "Personal Shots",
  mainImage: "/images/pricing/portrait/personal_shot.jpg",
  description: "Experience a relaxed, on-location shoot that celebrates your authentic self through spontaneous, everyday moments. I create a comfortable environment that allows your personality to shine, resulting in a natural and engaging collection of images.",
  whatIncluded: "What's Included:",
  includes: [
    "1 hour shoot",
    "100 fully edited images",
    "Fast turnaround with cloud delivery",
  ],
  bookingLink: "https://your-google-form.com",
  priceText: "Starting at $300"
}

const portraitData3 = {
  title: "Pets",
  mainImage: "/images/pricing/portrait/pet.jpg",
  description: "We love animals too. Let us make images that will make you smile for years.",
  whatIncluded: "What's Included:",
  includes: [
    "Up to 3 hour photo shoot (can take a while for the model to get comfortable and they notoriously don't take directions)",
    "Some photos!",
    "Two day turnaround with cloud delivery",
  ],
  bookingLink: "https://your-google-form.com",
  priceText: "Starting at $500"
}


</script>





<ContentSection {...portraitData} />
<ContentSection {...portraitData2} />
<ContentSection {...portraitData3} />
