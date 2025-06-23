<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import { fade } from 'svelte/transition';

  export let imageUrl: string;
  export let height = '60vh';
  export let text = '';
  export let textSize = 'text-4xl';
  export let shutterDuration = 350; // Total duration for both close and open

  let parallaxBg: HTMLElement;
  let canvas: HTMLCanvasElement;
  let animationFrame: number;
  let shutterState: 'closing' | 'opening' = 'closing';
  let startTime: number;
  let showShutter = true;

  // Shutter configuration
  const polygon_sides = 10;
  let vertices = Array(polygon_sides).fill(null);
  const angle_increment = Math.PI * 2 / polygon_sides;
  const exterior_angle = angle_increment;
  let center_x: number;
  let center_y: number;
  let longestSide: number;

  // Temporary canvas for shutter blades
  const triangle_canvas = document.createElement("canvas");
  const triangle_ctx = triangle_canvas.getContext("2d");

  const handleScroll = () => {
    if (parallaxBg) {
      parallaxBg.style.transform = `translateY(${window.scrollY * 0.5}px)`;
    }
  };

  function setVertices(currentRadius: number) {
    for (let i = 0; i < polygon_sides; i++) {
      const x = center_x + currentRadius * Math.cos(angle_increment * i);
      const y = center_y - currentRadius * Math.sin(angle_increment * i);
      vertices[i] = { x, y };
    }
  }

  function updateTriangle() {
    if (!triangle_ctx) return;
    
    const gradient = triangle_ctx.createLinearGradient(triangle_canvas.width, 0, 0, 0);
    gradient.addColorStop(0, "#222");
    gradient.addColorStop(0.7, "#000");
    triangle_ctx.fillStyle = gradient;
    triangle_ctx.strokeStyle = "#444";
    triangle_ctx.clearRect(0, 0, triangle_canvas.width, triangle_canvas.height);
    triangle_ctx.beginPath();
    triangle_ctx.moveTo(0, 0);
    triangle_ctx.lineTo(triangle_canvas.width, 0);
    triangle_ctx.lineTo(
      triangle_canvas.width * Math.cos(exterior_angle),
      triangle_canvas.height * Math.sin(exterior_angle)
    );
    triangle_ctx.closePath();
    triangle_ctx.fill();
    triangle_ctx.stroke();
  }

  function placeTriangle(vertex: {x: number, y: number}, i: number) {  
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    
    ctx.save();
    ctx.translate(vertex.x, vertex.y);
    ctx.rotate(Math.PI / 2 - exterior_angle / 2 - exterior_angle * i);
    ctx.drawImage(triangle_canvas, 0, 0);
    ctx.restore();
  }

  function drawShutter(progress: number) {
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    let currentRadius: number;
    if (shutterState === 'closing') {
      currentRadius = center_x * (1 - progress); // Close: radius decreases
    } else {
      currentRadius = center_x * progress; // Open: radius increases
    }
    
    setVertices(currentRadius);
    vertices.forEach((vertex, i) => placeTriangle(vertex, i));
  }

  function setSize() {
    if (!canvas) return;
    
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    center_x = canvas.width / 2;
    center_y = canvas.height / 2;
    longestSide = Math.max(canvas.width, canvas.height);
    triangle_canvas.width = longestSide;
    triangle_canvas.height = longestSide;
    updateTriangle();
    setVertices(center_x); // Start fully open
  }

  function animateShutter(timestamp: number) {
    if (!startTime) startTime = timestamp;
    const elapsed = timestamp - startTime;
    
    if (shutterState === 'closing') {
      const progress = Math.min(elapsed / (shutterDuration / 2), 1);
      drawShutter(progress);
      
      if (progress >= 1) {
        shutterState = 'opening';
        startTime = timestamp;
      }
    } else {
      const progress = Math.min(elapsed / (shutterDuration / 2), 1);
      drawShutter(progress);
      
      if (progress >= 1) {
        showShutter = false;
        return;
      }
    }
    
    animationFrame = requestAnimationFrame(animateShutter);
  }

  onMount(() => {
    window.addEventListener('scroll', handleScroll);
    setSize();
    animationFrame = requestAnimationFrame(animateShutter);
    window.addEventListener('resize', setSize);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', setSize);
      cancelAnimationFrame(animationFrame);
    };
  });
</script>

<section class="relative w-full overflow-hidden" style="height: {height}">
  <!-- Image with parallax effect -->
  <div
    class="absolute inset-0 bg-cover bg-center bg-gray-300 z-0"
    style="background-image: url('{imageUrl}')"
    bind:this={parallaxBg}
    in:fade={{ duration: 0 }}
  >
    {#if !imageUrl}
      <p class="absolute top-0 left-0 text-red-500 p-2">Error: Image not loaded</p>
    {/if}
  </div>

  <!-- Canvas shutter effect -->
  {#if showShutter}
    <canvas
      bind:this={canvas}
      class="absolute inset-0 z-20 w-full h-full pointer-events-none"
      style="touch-action: none;"
    ></canvas>
  {/if}

  <!-- Text overlay -->
  {#if text}
    <div class="absolute inset-0 flex justify-center items-center z-10 bg-black/30">
      <p 
        class="{textSize} font-bold text-white drop-shadow-lg"
        in:fade={{ delay: shutterDuration + 300, duration: 800 }}
      >
        {text}
      </p>
    </div>
  {/if}
</section>