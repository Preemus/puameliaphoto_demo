<!-- style="font-family: 'Tauri', sans-serif !important; -->

<script lang="ts">
  import { onMount } from "svelte";
  import { fade } from "svelte/transition";
  import { base } from "$app/paths";

  let currentIndex = 0;
  let visibleIndex = 0;
  let headerHeight = 0;
  let footerHeight = 0;
  let transitionTimeout: ReturnType<typeof setTimeout>;
  let sections: HTMLElement[] = [];
  let scrollIndicatorVisible = true;
  let activeTextIndex = 0; // 0: Event, 1: Drone, 2: Canyoning
  let transitionProgress = 0;
  let videoElement: HTMLVideoElement | null = null;

  let backgrounds = [
    `${base}/images/top.jpg`,
    `${base}/images/homepage/bird.JPG`,
    `${base}/video/homepage/homepage_video.mp4`,
    `${base}/images/homepage/better_sky.jpg`,
    `${base}/images/homepage/puamelia_beach.jpg`,
  ];

  function updateBackgroundsForMobile() {
    const isMobile = window.innerWidth < 768;
    backgrounds = [
      `${base}/images/top.jpg`,
      isMobile
        ? `${base}/images/homepage/bird_mobile_view.JPG`
        : `${base}/images/homepage/bird.JPG`,
      `${base}/video/homepage/homepage_video.mp4`,
      `${base}/images/homepage/better_sky.jpg`,
      `${base}/images/homepage/puamelia_beach.jpg`,
    ];
  }

  onMount(() => {
    updateBackgroundsForMobile();
    window.addEventListener("resize", updateBackgroundsForMobile);
    return () =>
      window.removeEventListener("resize", updateBackgroundsForMobile);
  });

  const isVideo = (path: string) => {
    return (
      path.endsWith(".mp4") || path.endsWith(".webm") || path.endsWith(".ogg")
    );
  };

  const changeBackground = (newIndex: number) => {
    clearTimeout(transitionTimeout);
    visibleIndex = newIndex;

    // Clean up previous video tracking
    if (videoElement) {
      videoElement.ontimeupdate = null;
      videoElement = null;
    }

    // Set up new video tracking if needed
    if (isVideo(backgrounds[newIndex])) {
      videoElement = document.querySelector(
        `video[src="${backgrounds[newIndex]}"]`,
      );
      if (videoElement) {
        videoElement.ontimeupdate = handleVideoTimeUpdate;
      }
    }

    scrollIndicatorVisible = newIndex === 0;

    transitionTimeout = setTimeout(() => {
      currentIndex = newIndex;
    }, 800);
  };

  const handleVideoTimeUpdate = () => {
    if (!videoElement) return;

    const currentTime = videoElement.currentTime;
    const segmentDuration = 5; // seconds per text
    const totalSegments = 4; // number of text items

    // Determine the index of the currently active text segment (0, 1, or 2)
    // This index changes cleanly every 5 seconds.
    const currentSegmentIndex =
      Math.floor(currentTime / segmentDuration) % totalSegments;

    // Determine the progress (from 0 to 1) within the current 5-second segment.
    const progressInCurrentSegment =
      (currentTime % segmentDuration) / segmentDuration;

    // Update the Svelte reactive variables that the template uses.
    // activeTextIndex will now directly correspond to the item that should be prominent.
    activeTextIndex = currentSegmentIndex;
    // transitionProgress will represent the animation progress for that active item
    // (and correspondingly for inactive items based on the template logic).
    transitionProgress = progressInCurrentSegment;
  };

  const calculateSectionPositions = () => {
    return sections.map((section) => {
      const rect = section.getBoundingClientRect();
      return rect.top + window.scrollY - headerHeight;
    });
  };

  const handleScroll = () => {
    const scrollPos = window.scrollY;
    if (scrollPos < 0) return;

    const sectionPositions = calculateSectionPositions();
    const viewportMiddle = window.scrollY + window.innerHeight / 2;

    let newIndex = 0;
    for (let i = 0; i < sectionPositions.length; i++) {
      const sectionTop = sectionPositions[i];
      const nextSectionTop =
        i < sectionPositions.length - 1 ? sectionPositions[i + 1] : Infinity;

      if (viewportMiddle >= sectionTop && viewportMiddle < nextSectionTop) {
        newIndex = i;
        break;
      }
    }

    if (newIndex !== currentIndex && newIndex !== visibleIndex) {
      changeBackground(newIndex);
    }
  };

  function setSectionStyles() {
    const isMobile = window.innerWidth < 768; // Common mobile breakpoint

    sections.forEach((section) => {
      if (!section.classList.contains("homepage-plans-section")) {
        (section as HTMLElement).style.minHeight =
          `calc(100vh - ${headerHeight}px)`;
      }

      const dataIndex = (section as HTMLElement).getAttribute("data-index");
      let marginBottomValue = "0px";

      if (dataIndex === "1") {
        marginBottomValue = "0px";
        (section as HTMLElement).style.height = "auto";
        (section as HTMLElement).style.minHeight = "90vh";
      } else if (dataIndex === "2") {
        marginBottomValue = "100px";
      } else if (dataIndex === "3") {
        marginBottomValue = "0px";
      } else if (dataIndex === "4") {
        marginBottomValue = "100px";
      }

      if (isMobile) {
        // On mobile, use setProperty with !important to override CSS
        (section as HTMLElement).style.setProperty(
          "margin-bottom",
          marginBottomValue,
          "important",
        );
      } else {
        // On desktop, use the standard style property
        (section as HTMLElement).style.marginBottom = marginBottomValue;
      }
    });
  }

  onMount(() => {
    setTimeout(() => {
      const header = document.querySelector("header");
      const footer = document.querySelector("footer");
      headerHeight = header?.clientHeight || 0;
      footerHeight = footer?.clientHeight || 0;

      document.documentElement.style.setProperty(
        "--header-height",
        `${headerHeight}px`,
      );

      sections = Array.from(
        document.querySelectorAll(".scroll-section, .homepage-plans-section"),
      );

      setSectionStyles();
      handleScroll();
    }, 100);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio > 0.3) {
            const newIndex = parseInt(
              (entry.target as HTMLElement).getAttribute("data-index") || "0",
            );
            changeBackground(newIndex);
          }
        });
      },
      {
        threshold: [0.3, 0.5, 0.7],
        rootMargin: `-${headerHeight}px 0px -${footerHeight}px 0px`,
      },
    );

    document
      .querySelectorAll(".scroll-section, .homepage-plans-section")
      .forEach((section) => {
        observer.observe(section);
      });

    const throttledScroll = () => requestAnimationFrame(handleScroll);
    window.addEventListener("scroll", throttledScroll, { passive: true });

    const handleResize = () => {
      const header = document.querySelector("header");
      const footer = document.querySelector("footer");
      if (header) headerHeight = header.clientHeight;
      if (footer) footerHeight = footer.clientHeight;
      setSectionStyles();
      setTimeout(handleScroll, 100);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", throttledScroll);
      window.removeEventListener("resize", handleResize);
      clearTimeout(transitionTimeout);
      if (videoElement) videoElement.ontimeupdate = null;
    };
  });
</script>

<div class="page-overlay"></div>

<!-- Background containers -->
{#each backgrounds as bg, i}
  {#if isVideo(bg)}
    <div>
      <video
        class="video-container {i === visibleIndex
          ? 'current-bg'
          : 'previous-bg'}"
        src={bg}
        muted
        autoplay
        loop
        playsinline
      ></video>
      <div
        class="video-overlay {i === visibleIndex
          ? 'current-bg'
          : 'previous-bg'}"
      ></div>
    </div>
  {:else}
    <div
      class="background-container {i === visibleIndex
        ? 'current-bg'
        : 'previous-bg'}"
      style="background-image: url('{bg}')"
    >
      {#if i === visibleIndex && bg.endsWith("/bird_mobile_view.JPG")}
        <div
          style="position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; background-color: rgba(0,0,0,0.28); z-index: -1; transition: opacity 0.8s ease; pointer-events: none;"
        ></div>
      {/if}
    </div>
  {/if}
{/each}

<section class="scroll-section" data-index="0">
  <div
    class="content-wrapper absolute inset-0 flex justify-center items-center z-10"
  >
    <div
      class="relative flex flex-col justify-center items-center text-center h-full z-10 w-full max-w-screen-xl mx-auto px-6"
    >
      <h1
        class="text-4xl font-bold text-white"
        style="font-family: 'Inter', sans-serif !important;"
      >
        Puamelia Photo
      </h1>
      <p
        class="text-xl text-white mt-4"
        style="font-family: 'Inter', sans-serif !important;"
      >
        Organic Studio
      </p>
      <a
        href="https://puamelia-photo.formaloo.co/0n7o7b"
        class="mt-6 bg-yellow-500 text-white px-6 py-2 rounded-lg hover:bg-yellow-400 transition"
        style="font-family: 'Inter', sans-serif !important;"
      >
        Book today
      </a>

      {#if scrollIndicatorVisible}
        <div
          class="scroll-indicator"
          class:scroll-indicator-hidden={!scrollIndicatorVisible}
          in:fade={{
            duration: 600,
            delay: 300,
            easing: (t: number) => 1 - Math.pow(1 - t, 3),
          }}
          out:fade={{ duration: 600, easing: (t: number) => t }}
        >
          <span>Scroll</span>
          <div class="chevron"></div>
          <div class="chevron"></div>
          <div class="chevron"></div>
        </div>
      {/if}
    </div>
  </div>
</section>

<section class="scroll-section" data-index="1">
  <div class="content-wrapper flex justify-center">
    <div
      class="w-full max-w-screen-xl mx-auto px-6 md:px-10 flex flex-col md:flex-row items-center"
    >
      <div class="w-full md:w-1/2 text-left">
        <h2
          class="text-4xl font-bold text-yellow-500"
          style="font-family: 'Inter_Italic', sans-serif !important;"
        >
          Welcome!
        </h2>

        <p
          class="text-lg text-white mt-4"
          style="font-family: 'Inter', sans-serif !important;"
        >
          Pua Melia Photo is a family operated photo and video studio on the
          north shore of Maui. We specialise in genuine expression, expressive
          light and breathtaking locations.
        </p>
      </div>
    </div>
  </div>
</section>

<section class="scroll-section relative" data-index="2">
  <div
    class="content-wrapper flex justify-center items-center h-full relative z-10 max-w-screen-xl mx-auto"
  >
    <div
      class="w-full mx-auto px-4 md:px-10 max-w-md md:max-w-screen-xl text-center md:text-left text-right-override"
    >
      <h2
        class="text-3xl md:text-5xl font-extrabold text-white drop-shadow-lg tracking-wide"
      >
        <span class="block text-left">PHOTOGRAPHY &amp; </span>
        <span class="block text-right">VIDEOGRAPHY</span>
      </h2>

      <div class="ml-auto max-w-lg">
        <hr class="border-t-2 border-yellow-500 w-24 my-4 ml-auto" />

        <ul class="text-white space-y-2 text-right">
          {#each ["Commercial Photography", "Drone photography", "Canyoning and rappeling", "Event photography"] as text, i}
            {@const radius = 8}
            {@const circumference = 2 * Math.PI * radius}
            <li class="flex items-center justify-end gap-2">
              <span
                class="transition-all duration-500"
                style:font-size={activeTextIndex === i ? "1.6rem" : "1rem"}
              >
                {text}
              </span>
              {#if activeTextIndex === i}
                <svg
                  class="w-5 h-5 transform -rotate-90"
                  viewBox="0 0 20 20"
                  aria-hidden="true"
                >
                  <circle
                    cx="10"
                    cy="10"
                    r={radius}
                    fill="transparent"
                    stroke-width="2"
                    class="stroke-gray-500"
                  ></circle>
                  <circle
                    cx="10"
                    cy="10"
                    r={radius}
                    fill="transparent"
                    stroke-width="2"
                    stroke-linecap="round"
                    class="stroke-yellow-500 progress-indicator-circle"
                    style:stroke-dasharray={circumference}
                    style:stroke-dashoffset={circumference *
                      (1 - transitionProgress)}
                  ></circle>
                </svg>
              {:else}
                <div class="w-5 h-5"></div>
                <!-- Placeholder to maintain layout -->
              {/if}
            </li>
          {/each}
        </ul>

        <p class="text-white/90 text-1xl mt-6 mb-16 italic">
          
        </p>
      </div>
    </div>
  </div>
</section>

<section class="homepage-plans-section" data-index="3">
  <div class="content-wrapper relative">
    <div class="container mx-auto px-4 py-14">
      <div class="text-center mb-2">
        <h2 class="text-4xl md:text-5xl font-bold text-white mb-4 mt-28">
          <span> Choose Your Adventure </span>
        </h2>
        <div class="flex justify-center mt-6">
          <div class="w-24 h-1 bg-yellow-400"></div>
        </div>
      </div>

      <div class="connected-film-grid">
        {#each [{ img: `${base}/images/homepage/hp_portrait.JPG`, title: "Portrait", text: "Heartfelt pictures of you and your crew", href: `${base}/pricing/portrait` }, { img: `${base}/images/homepage/3-2hp_ocean.jpg`, title: "Ocean", text: "I am at least semi aquatic. Portraits underwater blue water or near the shore.", href: `${base}/pricing/ocean` }, { img: `${base}/images/homepage/3-2hp_drone.jpg`, title: "Drone", text: "Mapping and stitching services available for large areas", href: `${base}/pricing/drone` }, { img: `${base}/images/homepage/3-2hp_product.jpg`, title: "Product", text: "Showcase your work for promotion", href: `${base}/pricing/product` }, { img: `${base}/images/homepage/hp_event.JPG`, title: "Event", text: "Parties, once in a life time events, memorials, and performances", href: `${base}/pricing/event` }, { img: `${base}/images/homepage/hp_wedding.jpg`, title: "Wedding", text: "I hate weddings but if you want to pay me to do it anyway I'm going to charge you a lot", href: `${base}/pricing/wedding` }, { img: `${base}/images/homepage/hp_canyoning.jpg`, title: "Canyoning", text: "Adventure and photo experience only Maui canyons can offer", href: `${base}/pricing/canyoning` }, { img: `${base}/images/homepage/3-2hp_tour.JPG`, title: "Photo Tour", text: "Ive found some lovely places and we can go shoot there", href: `${base}/pricing/tour` }] as service, i}
          <div class="film-strip-card">
            <a href={service.href} class="block w-full h-full">
              <div class="filmstrip">
                <div class="film-content">
                  <h3 class="text-xl font-semibold mb-2 text-white">
                    {service.title}
                  </h3>
                  <div class="image-container">
                    <img
                      src={service.img}
                      alt={service.title}
                      class="w-full h-full object-cover"
                    />
                  </div>
                  <p class="text-gray-200 text-base mt-2">{service.text}</p>
                </div>
              </div>
            </a>
          </div>
        {/each}
      </div>
    </div>
  </div>
</section>

<section class="scroll-section" data-index="4" id="about">
  <div class="content-wrapper flex justify-center">
    <div
      class="w-full max-w-screen-xl mx-auto px-6 md:px-10 flex flex-col md:flex-row items-center gap-8"
    >
      <div class="w-full md:w-1/2 text-left order-1 md:ml-12">
        <h2 class="text-2xl font-bold text-white py-6">About</h2>

        <div class="md:hidden w-full my-4 flex justify-center items-center">
          <div
            class="w-full max-w-sm aspect-[3/2.5] relative overflow-hidden rounded-md shadow-lg border border-white/10 bg-black/20"
          >
            <img
              src="{base}/images/about/ab_deacon.jpg"
              alt="Deacon MacMillan"
              class="absolute inset-0 w-full h-full object-cover"
            />
          </div>
        </div>

        <h3 class="text-3xl font-bold text-yellow-400 mt-4">
          Deacon MacMillan
        </h3>
        <p class="text-lg text-white mt-4 py-2">
          When my first print came up in the developer I was awakened. since
          then I have been obsessed with making photographs I have become
          proficient in many styles and techniques. If I don't know how to get
          the results you are looking for I refer you to someone who can.
        </p>

        <a
          href="mailto:deaconmacmillan@puameliaphoto.com"
          class="mt-6 inline-flex items-center px-8 py-3 border-2 border-green-500 bg-green-500 text-white font-bold rounded-full hover:bg-green-400 hover:border-green-400 group"
        >
          Contact me
          <svg
            class="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M14 5l7 7m0 0l-7 7m7-7H3"
            ></path>
          </svg>
        </a>
      </div>

      <div
        class="hidden md:flex w-full md:w-1/2 justify-center items-center order-2"
      >
        <div
          class="w-full max-w-sm aspect-[3/2.5] relative overflow-hidden rounded-md shadow-lg border border-white/10 bg-black/20"
        >
          <img
            src="{base}/images/about/ab_deacon.jpg"
            alt="Deacon MacMillan"
            class="absolute inset-0 w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  </div>
</section>

<style>
  :global(html) {
    scroll-behavior: smooth;
    scroll-padding-top: var(--header-height, 0px);
  }

  a.block {
    text-decoration: none;
    color: inherit;
    display: block;
    position: relative;
    height: 100%;
    width: 100%;
  }

  a.block .film-content h3::after {
    content: "\00a0\00a0 →";
    display: inline-block;
    opacity: 0;
    transform: translateX(-10px);
    margin-left: 0;
    transition: all 0.3s ease;
  }

  a.block:hover .film-content h3::after {
    opacity: 1;
    transform: translateX(0);
    margin-left: 0.1em;
  }

  .scroll-indicator {
    position: absolute;
    bottom: calc(30px + env(safe-area-inset-bottom));
    display: flex;
    flex-direction: column;
    align-items: center;
    opacity: 0.8;
    animation: fadeInOut 2.5s infinite;
  }

  .scroll-indicator span {
    color: white;
    font-size: 0.9rem;
    letter-spacing: 1px;
    margin-bottom: 6px;
  }

  .chevron {
    width: 20px;
    height: 8px;
    opacity: 0;
    transform: scale(0.3);
    animation: move-chevron 3s infinite;
  }

  .chevron:before,
  .chevron:after {
    content: "";
    position: absolute;
    top: 0;
    height: 100%;
    width: 50%;
    background: white;
  }

  .chevron:before {
    left: 0;
    transform: skewY(30deg);
  }

  .chevron:after {
    right: 0;
    transform: skewY(-30deg);
  }

  .chevron:first-child {
    animation-delay: 0s;
  }

  .chevron:nth-child(2) {
    animation-delay: 0.8s;
  }

  .chevron:nth-child(3) {
    animation-delay: 0.4s;
  }

  @keyframes move-chevron {
    25% {
      opacity: 1;
      transform: translateY(9px) scale(0.8);
    }
    33% {
      opacity: 1;
      transform: translateY(16px) scale(0.8);
    }
    50% {
      opacity: 0;
      transform: translateY(24px) scale(0.8);
    }
    66% {
      opacity: 0;
      transform: translateY(16px) scale(0.8);
    }
    100% {
      opacity: 0;
      transform: translateY(0) scale(0.8);
    }
  }

  @keyframes fadeInOut {
    0%,
    100% {
      opacity: 0.5;
    }
    50% {
      opacity: 0.8;
    }
  }

  .scroll-indicator-hidden {
    display: none !important;
  }

  .background-container {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    transition: opacity 0.8s ease;
    will-change: opacity;
    z-index: -2;
  }

  .video-container {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    transition: opacity 0.8s ease;
    will-change: opacity;
    z-index: -2;
    object-fit: cover;
  }

  .video-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: -1;
    transition: opacity 0.8s ease;
  }

  .current-bg {
    opacity: 1;
  }

  .previous-bg {
    opacity: 0;
  }

  .scroll-section {
    position: relative;
    z-index: 1;
    width: 100%;
    padding-top: var(--header-height, 0px);
    height: 100vh;
    margin-bottom: 0 !important;
  }

  .content-wrapper {
    display: flex;
    flex-direction: column;
    min-height: calc(100vh - var(--header-height, 0px));
    justify-content: center;
  }

  .text-right-override {
    text-align: left !important;
    width: 100%;
  }

  .homepage-plans-section {
    height: auto !important;
  }

  @media (min-width: 768px) {
    .text-right-override {
      width: 50%;
    }
  }

  .page-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    z-index: -1;
    background-color: rgba(0, 0, 0, 0);
    pointer-events: none;
  }

  .film-strip-card {
    display: flex;
    justify-content: center;
    align-items: center;
    perspective: 1000px;
    z-index: 1;
    position: relative;
    margin: 0 -2px;
  }

  .filmstrip {
    --background: black;
    --size: 8px;
    width: 100%;
    height: 370px;
    background-image: linear-gradient(
        to right,
        var(--background) var(--size),
        transparent var(--size)
      ),
      linear-gradient(
        to bottom,
        var(--background) var(--size),
        transparent var(--size)
      ),
      linear-gradient(
        to right,
        transparent calc(100% - var(--size)),
        var(--background) calc(100% - var(--size))
      ),
      linear-gradient(
        to bottom,
        transparent calc(100% - var(--size)),
        var(--background) calc(100% - var(--size))
      );
    background-size:
      var(--size) 100%,
      100% var(--size),
      var(--size) 100%,
      100% var(--size);
    background-repeat: no-repeat;
    background-position:
      top left,
      top left,
      top right,
      bottom left;
    padding: 0;
    box-sizing: border-box;
    position: relative;
    transition: filter 0.3s ease;
    transform: translateZ(0);
    backface-visibility: hidden;
    display: flex;
    align-items: stretch;
  }

  .connected-film-grid {
    display: flex;
    flex-wrap: wrap;
    margin-bottom: 2rem;
    position: relative;
    justify-content: center;
    font-size: 0;
  }

  .film-strip-card {
    width: 100%;
    margin-right: -1px;
    position: relative;
    z-index: 1;
  }

  @media (min-width: 640px) {
    .film-strip-card {
      width: 49.2%;
    }

    .film-strip-card:nth-child(even) {
      margin-right: 0;
    }
  }

  @media (min-width: 1024px) {
    .film-strip-card {
      width: 32.6%;
    }

    .film-strip-card:nth-child(3n) {
      margin-right: 0;
    }
  }

  .filmstrip {
    width: calc(100%);
    position: relative;
  }

  .filmstrip::after {
    content: "";
    position: absolute;
    top: 0;
    bottom: 0;
    right: -1px;
    width: calc(var(--size) + -8px);
    background-color: var(--background);
    z-index: 2;
    pointer-events: none;
  }

  @media (min-width: 1280px) and (max-width: 1535px) {
    .film-strip-card {
      width: 32.2%;
    }

    .filmstrip {
      width: calc(100% + 2px);
    }

    .filmstrip::after {
      right: -2px;
    }
  }

  @media (min-width: 1536px) {
    .film-strip-card {
      width: 27%;
    }
  }

  .filmstrip::before {
    width: calc(var(--size) + 2px);
    left: -2px;
  }

  .film-strip-card:hover {
    z-index: 10;
  }

  .film-content {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    padding: calc(var(--size) + 8px) calc(var(--size) + 8px);
    background-color: black;
    overflow: hidden;
    position: relative;
    z-index: 1;
  }

  .film-content h3 {
    font-size: 1.25rem;
    font-weight: 600;
    margin-bottom: 0.1rem;
    color: white;
    line-height: 1.4;
    min-height: 2.8em;
    flex-shrink: 0;
  }

  .image-container {
    height: 200px;
    aspect-ratio: 3/2;
    flex-grow: 0;
    flex-shrink: 0;
    overflow: hidden;
    margin: 0.5rem 0;
    border-radius: 2px;
    position: relative;
  }

  .image-container img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }

  .film-content p {
    color: #e5e7eb;
    font-size: 1rem;
    line-height: 1.5;
    margin-top: 0.5rem;
    height: 4.5em;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    line-clamp: 3;
    -webkit-box-orient: vertical;
    flex-shrink: 0;
  }

  .filmstrip:hover {
    filter: sepia(0) brightness(1.1);
  }

  @media (max-width: 600px),
    (min-width: 601px) and (max-width: 767px),
    (min-width: 768px) and (max-width: 1023px),
    (min-width: 1024px) and (max-width: 1279px),
    (min-width: 1280px) and (max-width: 1535px),
    (min-width: 1536px) {
    .filmstrip {
      height: auto !important;
      min-height: unset;
    }

    .film-strip-card {
      margin: -1px;
    }

    .image-container {
      height: auto !important;
      aspect-ratio: 3 / 2;
      width: 100%;
      flex-shrink: 0;
      position: relative;
    }

    .image-container img {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    li span {
      display: inline-block;
      transition:
        font-size 0.5s cubic-bezier(0.25, 0.1, 0.25, 1),
        opacity 0.5s ease;
    }

    .progress-indicator-circle {
      transition-property: stroke-dashoffset;
      transition-duration: 100ms;
      transition-timing-function: linear;
    }
  }
</style>
