<script lang="ts">
  import { onMount } from "svelte";
  import { pricingOptions } from "$lib/data/pricing";

  let isScrolled = false;
  let isPricingDropdownOpen = false;
  let isMenuOpen = false;
  let clickedPricing = false;
  let hoverTimeout: ReturnType<typeof setTimeout>; // Use the correct return type

  const handleScroll = () => {
    isScrolled = window.scrollY > 20;
  };

  const openPricingDropdown = () => {
    clearTimeout(hoverTimeout);
    isPricingDropdownOpen = true;
  };

  const closePricingDropdown = () => {
    hoverTimeout = setTimeout(() => {
      if (!clickedPricing) {
        isPricingDropdownOpen = false;
      }
    }, 200);
  };

  const togglePricingDropdown = (fromClick = false) => {
    if (fromClick) {
      clickedPricing = !clickedPricing;
      isPricingDropdownOpen = clickedPricing;
    }
  };

  const toggleMenu = () => {
    isMenuOpen = !isMenuOpen;
    isPricingDropdownOpen = false;
    clickedPricing = false;
  };

  const closeAll = () => {
    isPricingDropdownOpen = false;
    isMenuOpen = false;
    clickedPricing = false;
  };

  const handleClickOutside = (event: MouseEvent | TouchEvent) => {
    const target = event.target as HTMLElement;
    if (
      !target.closest(".pricing-dropdown") &&
      !target.closest(".mobile-menu") &&
      !target.closest(".hamburger")
    ) {
      closeAll();
    }
  };

  const handleResize = () => {
    if (window.innerWidth >= 768) {
      closeAll();
    }
  };

  onMount(() => {
    const scrollHandler = () => {
      handleScroll();
      requestAnimationFrame(scrollHandler);
    };
    scrollHandler();

    window.addEventListener("resize", handleResize);
    document.addEventListener("click", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);

    return () => {
      clearTimeout(hoverTimeout);
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("click", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  });
</script>

<header
  class="fixed top-0 left-0 w-full z-50 transition-colors duration-180"
  class:bg-black={isScrolled}
  class:text-white={isScrolled}
  class:bg-transparent={!isScrolled}
>
  <nav
    class="w-full mx-auto flex justify-between items-center px-4 py-2 relative"
  >
    <a href="/" class="text-lg font-bold">Puamelia Photo</a>

    <button
      class="hamburger md:hidden text-2xl focus:outline-none font-bold"
      on:click={toggleMenu}
    >
      ☰
    </button>

    <div class="hidden md:flex gap-4 items-center">
      <a href="/" class="hover:text-gray-300 font-bold">Home</a>
      <a href="/#about" class="hover:text-gray-300 font-bold">About</a>

      <!-- Fix for the pricing dropdown container -->
      <div
        class="relative pricing-dropdown"
        on:mouseenter={openPricingDropdown}
        on:mouseleave={closePricingDropdown}
        role="navigation"
        aria-label="Pricing navigation"
      >
        <button
          on:click={() => togglePricingDropdown(true)}
          class="hover:text-gray-300 focus:outline-none font-bold flex items-center gap-1"
          aria-expanded={isPricingDropdownOpen}
          aria-controls="pricing-dropdown-menu"
        >
          Pricing
          <span
            class="text-xs transform transition-transform"
            class:rotate-180={isPricingDropdownOpen}>▼</span
          >
        </button>

        {#if isPricingDropdownOpen}
          <div
            id="pricing-dropdown-menu"
            class="absolute left-[-16px] mt-2 w-32 rounded-lg bg-gray-900 shadow-lg max-h-[70vh] overflow-y-auto"
            on:mouseenter={openPricingDropdown}
            on:mouseleave={closePricingDropdown}
            role="menu"
            aria-orientation="vertical"
            tabindex="0"
          >
            {#each pricingOptions as option}
              <a
                href={option.href}
                class="block px-4 py-2 text-gray-200 hover:bg-gray-700 font-bold"
                on:click={closeAll}
                role="menuitem"
              >
                {option.name}
              </a>
            {/each}
          </div>
        {/if}
      </div>

      <a
        href="/reserve"
        class="hover:text-gray-800 font-bold px-6 py-1.5 bg-white/40 text-white rounded-lg hover:bg-white transition"
      >
        Reserve
      </a>
    </div>

    {#if isMenuOpen}
      <div
        class="mobile-menu absolute top-14 right-4 w-48 bg-gray-900 rounded-lg shadow-lg flex flex-col md:hidden z-50"
      >
        <a
          href="/"
          class="block px-4 py-2 text-gray-200 hover:bg-gray-700 font-bold"
          >Home</a
        >
        <a
          href="/#about"
          class="block px-4 py-2 text-gray-200 hover:bg-gray-700 font-bold"
          >About</a
        >

        <div class="relative mb-4">
          <button
            on:click={() => togglePricingDropdown(true)}
            class="w-full text-left px-4 py-2 text-gray-200 hover:bg-gray-700 flex justify-between items-center font-bold"
          >
            Pricing
            <span
              class="transform transition-transform"
              class:rotate-90={isPricingDropdownOpen}>›</span
            >
          </button>
          {#if isPricingDropdownOpen}
            <div class="bg-gray-800">
              {#each pricingOptions as option}
                <a
                  href={option.href}
                  class="block px-6 py-2 text-gray-200 hover:bg-gray-700 font-bold"
                  on:click={closeAll}
                >
                  {option.name}
                </a>
              {/each}
            </div>
          {/if}
        </div>

        <a
          href="/reserve"
          class="block px-4 py-2 text-white hover:text-gray-800 hover:bg-white font-bold bg-white/40 rounded-lg mx-2 mb-2 text-center"
        >
          Reserve
        </a>
      </div>
    {/if}
  </nav>
</header>

<style>
  header.bg-transparent {
    color: white;
  }
  .hamburger {
    cursor: pointer;
  }
  /* Animation for dropdown arrow */
  span {
    transition: transform 0.2s ease;
  }
  .rotate-90 {
    transform: rotate(90deg);
  }
  .rotate-180 {
    transform: rotate(180deg);
  }
</style>
