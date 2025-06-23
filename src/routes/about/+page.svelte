<!-- Name: Deacon MacMillan
  // Description: 
  // Profile: /images/about/ab_deacon.jpg -->

<script lang="ts">
  const profile = {
    name: "Deacon MacMillan",
    description:
      "When my first print came up in the developer I was awakened. since then I have been obsessed with making photographs I have become proficient in many styles and techniques. If I don't know how to get the results you are looking for I refer you to someone who can. ",
    image: "/images/about/ab_deacon.jpg",
  };

  // Gallery images
  const galleryItems = [
    {
      src: "/images/about/gallery_1.jpg",
      title: "Ocean life",
      category: "Nature",
      cols: "md:col-span-4",
    },
    {
      src: "/images/about/gallery_2.jpg",
      title: "Portrait",
      category: "People",
      cols: "md:col-span-4",
    },
    {
      src: "/images/about/gallery_3.jpeg",
      title: "Adventure",
      category: "Travel",
      cols: "md:col-span-4",
    },
    {
      src: "/images/about/canyoning.jpg",
      title: "Canyoning",
      category: "Adventure",
      cols: "md:col-span-6",
    },
    {
      src: "/images/about/gallery_7.JPG",
      title: "Birdwatching",
      category: "Nature",
      cols: "md:col-span-6",
    },
    {
      src: "/images/about/drone_shot.jpg",
      title: "Drone Shot",
      category: "Aerial",
      cols: "md:col-span-12",
    },
  ];
</script>

<!-- Profile Section -->
<section class="py-16">
  <div class="container max-w-screen-xl mx-auto px-4">
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
      <!-- Profile Image -->
      <div>
        <img
          src={profile.image}
          alt={profile.name}
          class="w-full h-auto rounded-lg object-cover max-h-[500px]"
        />
      </div>

      <!-- Profile Text -->
      <div class="lg:col-span-2 flex flex-col justify-center">
        <h1 class="text-4xl font-bold mb-4">{profile.name}</h1>
        <p class="text-lg text-gray-700 leading-relaxed mb-6">
          {profile.description}
        </p>
        <div class="flex gap-4">
          <a href="#" class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
            Flickr
          </a>
          <a href="#" class="px-4 py-2 border border-gray-300 rounded hover:bg-gray-100 transition">
            Google Photos
          </a>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- Gallery Section -->
<section class="py-16">
  <div class="container max-w-screen-xl mx-auto px-4">
    <div class="grid grid-cols-12 gap-4">
      {#each galleryItems as item}
        <div class={`col-span-12 ${item.cols}`}>
          <figure class="img-container relative overflow-hidden rounded-lg group">
            <img
              src={item.src}
              alt={item.title}
              class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <figcaption class="absolute bottom-0 left-0 p-6">
              <div class="relative pl-0 group-hover:pl-4 transition-all duration-300">
                <div class="absolute left-0 top-0 h-full w-0 border-l-0 group-hover:border-l-4 group-hover:border-white transition-all duration-150"></div>
                <h2 class="text-xl font-bold text-white [text-shadow:_0_1px_3px_rgb(0_0_0_/_80%)]">
                  {item.title}
                </h2>
                <h3 class="text-sm text-white/80 [text-shadow:_0_1px_2px_rgb(0_0_0_/_80%)] mt-1">
                  {item.category}
                </h3>
              </div>
            </figcaption>
          </figure>
        </div>
      {/each}
    </div>
  </div>
</section>

<style>
  .img-container {
    height: 0;
    padding-bottom: 75%;
    position: relative;
  }

  .img-container img {
    position: absolute;
    top: 0;
    left: 0;
  }
</style>