<script lang="ts">
  import { base } from "$app/paths";
  import { fly } from "svelte/transition";
  export let dividerImage = `${base}/images/line.png`;
</script>

<section class="py-12 fff4d4" in:fly={{ y: 50, duration: 500 }}>
  <div class="container mx-auto px-4">
    <h1
      class="font-serif text-green-900 text-3xl font-bold mb-4 mt-10 transition-all duration-500 text-center"
      in:fly={{ y: 30, duration: 400, delay: 100 }}
    >
      Available Options
    </h1>
    <!-- Thin Line Image -->
    <img
      src={dividerImage}
      alt="Divider Line"
      class="w-full h-6 mb-6"
      in:fly={{ x: -50, duration: 500, delay: 200 }}
    />

    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {#each [{ img: `${base}/images/pricing/tour/tour_image1.jpg`, title: "High elevation starlight" }, { img: `${base}/images/pricing/tour/tour_image2.jpg`, title: "The path less taken" }, { img: `${base}/images/pricing/tour/tour_image3.jpg`, title: "Secret spots" }, { img: `${base}/images/pricing/tour/tour_image4.jpg`, title: "Seasonal marine mammal" }, { img: `${base}/images/pricing/tour/tour_image5.JPG`, title: "Native birds" }, { img: `${base}/images/pricing/tour/tour_image6.JPG`, title: "Crater hike" }] as service, i}
        <div
          class="flex flex-col items-center text-center"
          in:fly={{ y: 40, duration: 600, delay: 300 + i * 100 }}
        >
          <div class="w-full h-64 bg-gray-200 rounded-md overflow-hidden">
            <img
              src={service.img}
              alt="product_image"
              class="w-full h-full object-cover"
            />
          </div>
          <h3
            class="text-xl font-semibold mt-4"
            in:fly={{ y: 20, duration: 500, delay: 400 + i * 100 }}
          >
            {service.title}
          </h3>
        </div>
      {/each}
    </div>
  </div>

  <h2
    class="text-1xl text-center mb-8 my-8"
    in:fly={{ y: 20, duration: 500, delay: 400 }}
  >
    We are working on this plan. Please check back later!
  </h2>
</section>
