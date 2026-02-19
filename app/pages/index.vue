<script setup lang="ts">
const { fetchCategories, fetchFirstProduct, fetchSettings } =
  useTernurxSanity();

const categories = await fetchCategories();
const product = await fetchFirstProduct();
const settings = await fetchSettings();
</script>

<template>
  <div class="test-page">
    <h1 class="test-brand">
      {{ settings?.brandName ?? "Ternurx" }}
    </h1>

    <!-- Categories -->
    <section class="test-section">
      <h2 class="test-heading">01 — Categories (Index)</h2>
      <div v-if="categories?.length">
        <div v-for="cat in categories" :key="cat._id" class="test-line">
          [{{ cat.productCount > 0 ? "X" : " " }}] {{ cat.name }} —
          {{ cat.slug }} ({{ cat.productCount }} prendas)
        </div>
      </div>
      <p v-else class="test-empty">No categories found. Check Sanity Studio.</p>
    </section>

    <!-- Product data -->
    <section class="test-section">
      <h2 class="test-heading">02 — First Product (Data Block)</h2>
      <div v-if="product">
        <p class="font-semibold">{{ product.name }}</p>
        <p>{{ product.garmentType }} — Edition {{ product.edition }}</p>
        <p>Material: {{ product.material }}</p>
        <p v-if="product.print">Print: {{ product.print }}</p>
        <p>Size: {{ product.size }}</p>
        <p class="test-price">
          ${{ product.price.toLocaleString() }} {{ product.currency }}
        </p>
        <p class="test-concept">{{ product.conceptText }}</p>
        <div class="test-meta">
          <p>Made in {{ product.madeIn }}</p>
          <p>Model: {{ product.modelName }} — Size {{ product.modelSize }}</p>
        </div>
        <p class="mt-3">
          Available: {{ product.available ? "✓" : "SOLD OUT" }}
        </p>
      </div>
      <p v-else class="test-empty">
        No product found. Create one in Sanity Studio.
      </p>
    </section>

    <!-- Media -->
    <section class="test-section">
      <h2 class="test-heading">
        03 — Media ({{ product?.media?.length ?? 0 }} items)
      </h2>
      <div v-if="product?.media?.length" class="test-media-grid">
        <div v-for="m in product.media" :key="m._key" class="test-media-card">
          <NuxtImg
            v-if="m.type === 'image' && m.assetRef"
            provider="sanity"
            :src="m.assetRef"
            :alt="m.alt"
            :width="400"
            quality="80"
            format="webp"
            loading="lazy"
            class="test-media-img"
          />
          <video
            v-else-if="m.type === 'video' && m.url"
            :src="m.url"
            controls
            preload="metadata"
            class="test-media-video"
          />
          <video
            v-else-if="m.type === 'gif' && m.url"
            :src="m.url"
            autoplay
            loop
            muted
            playsinline
            class="test-media-video"
          />
          <div v-else class="test-media-placeholder">
            {{ m.type.toUpperCase() }}
          </div>
          <p class="test-media-caption">
            {{ m.type }} · {{ m.size }} · {{ m.alt }}
            <span v-if="m.dimensions">
              · {{ m.dimensions.width }}×{{ m.dimensions.height }}</span
            >
            <span v-if="m.lqip"> · lqip ✓</span>
          </p>
        </div>
      </div>
      <p v-else class="test-empty">No media found.</p>
    </section>

    <!-- Raw JSON -->
    <section class="test-section">
      <h2 class="test-heading">04 — Raw JSON</h2>
      <details>
        <summary class="cursor-pointer mb-2">product</summary>
        <pre class="test-json">{{ JSON.stringify(product, null, 2) }}</pre>
      </details>
      <details class="mt-2">
        <summary class="cursor-pointer mb-2">settings</summary>
        <pre class="test-json">{{ JSON.stringify(settings, null, 2) }}</pre>
      </details>
    </section>
  </div>
</template>

<style scoped>
@reference "tailwindcss";

.test-page {
  @apply p-10;
  font-family: var(--font-mono);
  font-size: 12px;
  line-height: 1.6;
}

.test-brand {
  @apply mb-8;
  font-family: var(--font-display);
  font-weight: var(--weight-thin);
  font-size: var(--text-4xl);
}

.test-section {
  @apply mb-12;
}

.test-heading {
  @apply mb-4;
  font-size: var(--text-3xs);
  letter-spacing: var(--tracking-wider);
  text-transform: uppercase;
  color: var(--color-text-tertiary);
}

.test-line {
  font-family: var(--font-mono);
}

.test-empty {
  color: var(--color-sold-out);
}

.test-price {
  @apply my-4;
  font-weight: var(--weight-black);
  font-size: var(--text-lg);
}

.test-concept {
  font-style: italic;
  color: var(--color-text-secondary);
}

.test-meta {
  @apply mt-3;
  font-size: var(--text-3xs);
  letter-spacing: var(--tracking-wider);
  text-transform: uppercase;
  color: var(--color-text-tertiary);
}

.test-media-grid {
  @apply flex gap-4 flex-wrap;
}

.test-media-card {
  @apply p-2;
  border: 1px solid var(--color-border-subtle);
}

.test-media-img {
  max-height: 200px;
  width: auto;
}

.test-media-video {
  max-height: 200px;
  width: auto;
}

.test-media-placeholder {
  @apply w-[200px] h-[120px] flex items-center justify-center;
  background: var(--color-border-subtle);
}

.test-media-caption {
  @apply mt-1;
  font-size: var(--text-3xs);
  color: var(--color-text-tertiary);
}

.test-json {
  @apply p-4 overflow-x-auto;
  background: var(--color-border-subtle);
}
</style>
