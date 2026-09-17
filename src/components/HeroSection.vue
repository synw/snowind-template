<template>
  <section class="relative h-[calc(100vh-4rem)] min-h-[520px] bg-black w-full overflow-hidden group">
    <!-- Background image — full page, whole image visible on md+ (no cropping) -->
    <img
      src="/img/hero.jpg"
      alt="Aurora borealis over a dark landscape"
      class="absolute inset-0 w-full h-full object-cover object-center md:object-contain transition-transform duration-700 ease-out group-hover:scale-105"
    />

    <!-- Gradient overlay for readability -->
    <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
    <!-- Subtle top gradient for header blending -->
    <div class="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-black/40 to-transparent" />

    <!-- Content: bottom-aligned on mobile, centered on md+ so large screens don't feel empty -->
    <div class="relative z-10 flex flex-col justify-end min-h-[400px] sm:min-h-[500px] md:min-h-[600px] p-6 sm:p-8 md:p-12 md:absolute md:inset-0 md:justify-center">
      <div class="max-w-2xl md:max-w-3xl md:mx-auto md:text-center md:translate-y-4">
        <!-- Badges -->
        <div class="hero-fade hero-d1 flex flex-wrap items-center justify-center gap-2 mb-10 md:gap-3 md:mb-24">
          <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium tracking-wide bg-white/10 backdrop-blur-sm text-white/90 border border-white/20">
            <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            Vue 3 · TypeScript · Tailwind CSS v4
          </span>
          <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium tracking-wide bg-white/10 backdrop-blur-sm text-white/90 border border-white/20">
            <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M12 3l1.9 5.7a2 2 0 001.4 1.4L21 12l-5.7 1.9a2 2 0 00-1.4 1.4L12 21l-1.9-5.7a2 2 0 00-1.4-1.4L3 12l5.7-1.9a2 2 0 001.4-1.4L12 3z"
              />
            </svg>
            AI-Ready Template
          </span>
        </div>

        <!-- Headline -->
        <h1 class="hero-fade hero-d2 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.1] mb-5 md:mb-6">
          Build beautiful apps
          <span class="bg-gradient-to-r from-cyan-300 to-emerald-300 bg-clip-text text-transparent">faster</span>
        </h1>

        <!-- Subtitle -->
        <p class="hero-fade hero-d3 text-sm sm:text-base md:text-lg text-white/70 mb-8 max-w-lg md:max-w-xl md:mx-auto leading-relaxed md:mb-10">
          A production-ready, AI-ready starter template with 12 themes, semantic design tokens,
          and a composable component kit — built so you and your coding agents can ship fast.
        </p>

        <!-- Actions -->
        <div class="hero-fade hero-d4 flex flex-wrap items-center gap-3 md:justify-center md:gap-4">
          <router-link
            to="/components"
            class="inline-flex items-center gap-2 px-5 py-2.5 md:px-6 md:py-3 rounded-lg bg-white text-gray-900 text-sm md:text-base font-semibold hover:bg-white/90 transition-colors"
          >
            Explore Components
            <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </router-link>
          <a
            href="#themes"
            class="inline-flex items-center gap-2 px-5 py-2.5 md:px-6 md:py-3 rounded-lg bg-white/10 backdrop-blur-sm text-white text-sm md:text-base font-medium border border-white/20 hover:bg-white/20 transition-colors"
          >
            Browse Themes
          </a>
        </div>
      </div>
    </div>

    <!-- Scroll-down indicator (large screens only) -->
    <a
      href="#themes"
      class="group/scroll hidden md:flex absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex-col items-center gap-1.5 text-white/50 hover:text-white transition-colors"
      aria-label="Scroll to themes"
    >
      <span class="text-[0.65rem] font-medium uppercase tracking-[0.2em]">Scroll</span>
      <svg
        class="scroll-hint w-5 h-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        stroke-width="2"
      >
        <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
      </svg>
    </a>
  </section>
</template>

<script setup lang="ts">
// HeroSection — full-bleed hero banner with aurora background image.
// No props needed; content is static for the landing page.
</script>

<style scoped>
/* Entrance animation: staggered fade-up on load */
@keyframes heroFadeUp {
  from {
    opacity: 0;
    transform: translateY(18px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.hero-fade {
  opacity: 0;
  animation: heroFadeUp 0.7s cubic-bezier(0.22, 1, 0.36, 1) forwards;
}
.hero-d1 { animation-delay: 0.05s; }
.hero-d2 { animation-delay: 0.18s; }
.hero-d3 { animation-delay: 0.31s; }
.hero-d4 { animation-delay: 0.44s; }

/* Scroll-down chevron gentle bounce */
@keyframes scrollBounce {
  0%,
  100% {
    transform: translateY(0);
    opacity: 0.6;
  }
  50% {
    transform: translateY(6px);
    opacity: 1;
  }
}
.scroll-hint {
  animation: scrollBounce 2s ease-in-out infinite;
}

/* Respect reduced-motion: show content immediately, no bounce */
@media (prefers-reduced-motion: reduce) {
  .hero-fade {
    opacity: 1;
    animation: none;
  }
  .scroll-hint {
    animation: none;
  }
}
</style>
