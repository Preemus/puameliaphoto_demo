<script lang="ts">
    import { base } from "$app/paths";

  export let dividerImage = `${base}/images/line.png`;
</script>

<section class="py-12 fff4d4">
  <div class="container mx-auto px-4">
      <h2 class="text-3xl font-bold text-center mb-8">Available Options</h2>
      <!-- Thin Line Image -->
      <img src={dividerImage} alt="Divider Line" class="w-full h-6 mb-6">
  
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {#each [
          { img: `${base}/images/pricing/tour/tour_image1.jpg`, title: "High elevation starlight"},
          { img: `${base}/images/pricing/tour/tour_image2.jpg`, title: "The path less taken"},
          { img: `${base}/images/pricing/tour/tour_image3.jpg`, title: "Secret spots"},
          { img: `${base}/images/pricing/tour/tour_image4.jpg`, title: "Seasonal marine mammal"},
          { img: `${base}/images/pricing/tour/tour_image5.JPG`, title: "Native birds"},
          { img: `${base}/images/pricing/tour/tour_image6.JPG`, title: "Crater hike"},
        ] as service}
          <div class="flex flex-col items-center text-center">
              <div class="w-full h-64 bg-gray-200 rounded-md overflow-hidden">
                <img src={service.img} alt=product_image class="w-full h-full object-cover">
              </div>
              <h3 class="text-xl font-semibold mt-4">{service.title}</h3>
            </div>
        {/each}
    </div>

  </div>

  <h2 class="text-1xl text-center mb-8 my-8">We are working on this plan. Please check back later!

  </h2>
  
</section>
