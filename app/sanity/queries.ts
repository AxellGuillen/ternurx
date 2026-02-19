/* ═══════════════════════════════════════════════════════════════
   TERNURX — sanity/queries.ts
   
   All GROQ queries in one place.
   Consumed by useSanity composable.
   ═══════════════════════════════════════════════════════════════ */

/* ─── Categories for index ─── */
export const categoriesQuery = `
  *[_type == "category"] | order(order asc) {
    _id,
    "name": name,
    "slug": slug.current,
    order,
    "productCount": count(*[_type == "product" && references(^._id)])
  }
`;

/* ─── Single product by slug ─── */
export const productBySlugQuery = `
  *[_type == "product" && slug.current == $slug][0] {
    _id,
    name,
    "slug": slug.current,
    "category": category-> {
      "name": name,
      "slug": slug.current
    },
    garmentType,
    edition,
    material,
    print,
    size,
    price,
    currency,
    madeIn,
    conceptText,
    modelName,
    modelSize,
    available,
    media[] {
      _key,
      type,
      "assetRef": image.asset._ref,
      "url": image.asset->url,
      alt,
      size,
      caption,
      "lqip": image.asset->metadata.lqip,
      "dimensions": file.asset->metadata.dimensions {
        width,
        height,
        aspectRatio
      }
    },
    order
  }
`;

/* ─── All products in a category ─── */
export const productsByCategoryQuery = `
  *[_type == "product" && category->slug.current == $categorySlug] | order(order asc) {
    _id,
    name,
    "slug": slug.current,
    "category": category-> {
      "name": name,
      "slug": slug.current
    },
    garmentType,
    edition,
    material,
    print,
    size,
    price,
    currency,
    madeIn,
    conceptText,
    modelName,
    modelSize,
    available,
    media[] {
      _key,
      type,
      "assetRef": image.asset._ref,
      "url": image.asset->url,
      alt,
      size,
      caption,
      "lqip": image.asset->metadata.lqip,
      "dimensions": file.asset->metadata.dimensions {
        width,
        height,
        aspectRatio
      }
    },
    order
  }
`;

/* ─── First product (default on load) ─── */
export const firstProductQuery = `
  *[_type == "product"] | order(category->order asc, order asc) [0] {
    _id,
    name,
    "slug": slug.current,
    "category": category-> {
      "name": name,
      "slug": slug.current
    },
    garmentType,
    edition,
    material,
    print,
    size,
    price,
    currency,
    madeIn,
    conceptText,
    modelName,
    modelSize,
    available,
    media[] {
      _key,
      type,
      "assetRef": image.asset._ref,
      "url": image.asset->url,
      alt,
      size,
      caption,
      "lqip": image.asset->metadata.lqip,
      "dimensions": file.asset->metadata.dimensions {
        width,
        height,
        aspectRatio
      }
    },
    order
  }
`;

/* ─── Site settings (singleton) ─── */
export const siteSettingsQuery = `
  *[_type == "siteSettings"][0] {
    brandName,
    "logoUrl": logo.asset->url,
    defaultMode,
    infoContent,
    contactEmail,
    instagram
  }
`;

/* ─── All slugs (for prerendering if needed) ─── */
export const allProductSlugsQuery = `
  *[_type == "product"] {
    "slug": slug.current
  }
`;
