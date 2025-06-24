
<script lang="ts">
  import { base } from "$app/paths";
  const pricings = [
    { name: "Portrait", href: `${base}/pricing/portrait` },
    { name: "Ocean", href: `${base}/pricing/ocean` },
    { name: "Drone", href: `${base}/pricing/drone` },
    { name: "Product", href: `${base}/pricing/product` },
    { name: "Event", href: `${base}/pricing/event` },
    { name: "Wedding", href: `${base}/pricing/wedding` },
    { name: "Canyoning", href: `${base}/pricing/canyoning` },
    { name: "Photo Tour", href: `${base}/pricing/tour` },
  ];

  const resources = [
    { name: "Weather", href: "https://mauinow.com/weather/" },
    {
      name: "Surf Report",
      href: "https://www.surfline.com/surf-reports-forecasts-cams/united-states/hawaii/maui/5850862",
    },
    {
      name: "Sunrise & Sunset",
      href: "https://www.timeanddate.com/sun/@5850862",
    },
  ];

  const contact = [
    {
      icon: `${base}/images/mail.png`,
      text: "Email",
      href: "mailto:deaconmacmillan@puameliaphoto.com",
    },
    {
      icon: `${base}/images/phone-call.png`,
      text: "+1 808-250-2198",
      href: "tel:+18082502198",
    },
  ];
</script>

<footer
  class="bg-[#1d333c] text-gray-500 py-10 px-6 md:px-16 border-t border-gray-800"
>
  <!-- Mobile-first grid layout -->
  <div
    class="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-5 gap-x-4 gap-y-8 text-sm"
  >
    <!-- TOP ROW (Mobile): Logo + Thank You + Social -->
    <div class="col-span-1 md:col-span-2 order-1 flex flex-col items-start">
      <img src="{base}/images/logo.png" alt="Logo" class="w-50 mb-4" />
      <p class="text-sm text-white">
        Thank you so much for considering our services.
      </p>

      <div class="flex items-center gap-4 mt-4">
        <a
          href="https://www.instagram.com/opalakea?igsh=MW94cWR3cnNrdGRydg=="
          class="text-green-800 hover:text-green-700 transition"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Follow us on Instagram"
        >
          <img src="{base}/images/instagram.png" alt="" class="w-7 h-7 social-icon" />
        </a>
        
      </div>
    </div>

    <!-- MIDDLE ROW (Mobile): Split into two columns -->
    <div class="grid grid-cols-2 gap-4 col-span-1 md:hidden order-2">
      <!-- Left: Services & Pricing (removed scrolling) -->
      <div class="flex flex-col items-start">
        <h2 class="font-semibold mb-2 text-[#fbf2d0]">Services & Pricing</h2>
        <ul class="space-y-1">
          {#each pricings as pricing}
            <li class="list-none">
              <a href={pricing.href} class="text-white hover:text-yellow-200"
                >{pricing.name}</a
              >
            </li>
          {/each}
        </ul>
      </div>

      <!-- Right: Resources -->
      <div class="flex flex-col items-start">
        <h2 class="font-semibold mb-2 text-[#fbf2d0]">Resources</h2>
        <ul class="space-y-1">
          {#each resources as resource}
            <li class="list-none">
              <a 
                href={resource.href} 
                class="text-white hover:text-yellow-200"
                target="_blank"
                rel="noopener noreferrer"
                >{resource.name}</a
              >
            </li>
          {/each}
        </ul>
      </div>
    </div>

    <!-- BOTTOM ROW (Mobile): Contact -->
    <div class="col-span-1 md:hidden order-3 flex flex-col items-start">
      <h2 class="font-semibold mb-2 text-[#fbf2d0]">Contact</h2>
      <ul class="space-y-2">
        {#each contact as item}
          <li class="flex items-center gap-2">
            <img src={item.icon} alt="" class="w-5 h-5 contact-icon" />
            <a 
              href={item.href} 
              class="text-white hover:text-yellow-200"
              target="_blank"
              rel="noopener noreferrer"
              >{item.text}</a
            >
          </li>
        {/each}
      </ul>
    </div>

    <!-- Services & Pricing (Desktop) -->
    <div class="hidden md:block md:col-span-1 order-4">
      <h2 class="font-semibold mb-2 text-[#fbf2d0]">Services & Pricing</h2>
      <ul class="space-y-1">
        {#each pricings as pricing}
          <li class="list-none">
            <a href={pricing.href} class="text-white hover:text-yellow-200"
              >{pricing.name}</a
            >
          </li>
        {/each}
      </ul>
    </div>

    <!-- Resources (Desktop) -->
    <div class="hidden md:block md:col-span-1 order-5">
      <h2 class="font-semibold mb-2 text-[#fbf2d0]">Resources</h2>
      <ul class="space-y-1">
        {#each resources as resource}
          <li class="list-none">
            <a 
              href={resource.href} 
              class="text-white hover:text-yellow-200"
              target="_blank"
              rel="noopener noreferrer"
              >{resource.name}</a
            >
          </li>
        {/each}
      </ul>
    </div>

    <!-- Contact (Desktop) -->
    <div class="hidden md:block md:col-span-1 order-6">
      <h2 class="font-semibold mb-2 text-[#fbf2d0]">Contact</h2>
      <ul class="space-y-2">
        {#each contact as item}
          <li class="flex items-start gap-2">
            <img src={item.icon} alt="" class="w-5 h-5 contact-icon" />
            <a 
              href={item.href} 
              class="text-white hover:text-yellow-200"
              target="_blank"
              rel="noopener noreferrer"
              >{item.text}</a
            >
          </li>
        {/each}
      </ul>
    </div>
  </div>
</footer>

<style>
  .social-icon {
    transition:
      transform 0.2s ease,
      filter 0.2s ease;
  }

  .social-icon:hover {
    transform: scale(1.1);
    filter: brightness(1.2);
  }

  .contact-icon {
    filter: brightness(0) invert(1); /* This makes icon white */
  }
</style>
