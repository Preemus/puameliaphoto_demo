<script lang="ts">
  export let dividerImage = '/images/line.png';
</script>

<section class="py-12 fff4d4">
  <div class="container mx-auto px-4">
      <h2 class="text-3xl font-bold text-center mb-8">Commercial</h2>
      <!-- Thin Line Image -->
      <img src={dividerImage} alt="Divider Line" class="w-full h-6 mb-6">
  
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {#each [
          { img: "/images/pricing/product/product_image1.jpg"},
          { img: "/images/pricing/product/product_image2.jpg"},
          { img: "/images/pricing/product/product_image3.jpg"},
          { img: "/images/pricing/product/product_image4.jpg"},
          { img: "/images/pricing/product/product_image5.jpg"},
          { img: "/images/pricing/product/product_image6.jpg"},
        ] as service}
          <div class="flex flex-col items-center text-center">
              <div class="w-full h-64 bg-gray-200 rounded-md overflow-hidden">
                <img src={service.img} alt=product_image class="w-full h-full object-cover">
              </div>
            </div>
        {/each}
    </div>

  </div>

  <h2 class="text-1xl text-center mb-8 my-8">Flexible Pricing by piece or by project

  </h2>
  
</section>
