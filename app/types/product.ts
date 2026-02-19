/* ═══════════════════════════════════════════════════════════════
   TERNURX — types/product.ts
   
   Interfaces matching Sanity schemas.
   Used across composables, components, and pages.
   ═══════════════════════════════════════════════════════════════ */

/* ─── Sanity primitives ─── */

export interface SanitySlug {
  _type: "slug";
  current: string;
}

export interface SanityImage {
  _type: "image";
  asset: {
    _ref: string;
    _type: "reference";
  };
  alt?: string;
  hotspot?: {
    x: number;
    y: number;
    height: number;
    width: number;
  };
}

export interface SanityFile {
  _type: "file";
  asset: {
    _ref: string;
    _type: "reference";
  };
}

/* ─── Media Block (embedded object in product) ─── */

export type MediaType = "image" | "video" | "gif";
export type MediaSize = "hero" | "large" | "medium" | "small";

export interface MediaBlock {
  _key: string;
  _type: "mediaBlock";
  type: MediaType;
  file: SanityImage | SanityFile;
  alt: string;
  size: MediaSize;
  caption?: string;
}

/* ─── Category ─── */

export interface Category {
  _id: string;
  _type: "category";
  name: string;
  slug: SanitySlug;
  order: number;
}

/* ─── Product ─── */

export interface Product {
  _id: string;
  _type: "product";
  name: string;
  slug: SanitySlug;
  category: Category;
  garmentType: string;
  edition: string;
  material: string;
  print?: string;
  size: string;
  price: number;
  currency: string;
  madeIn: string;
  conceptText: string;
  modelName: string;
  modelSize: string;
  available: boolean;
  media: MediaBlock[];
  order: number;
}

/* ─── Site Settings (singleton) ─── */

export interface SiteSettings {
  _id: string;
  _type: "siteSettings";
  brandName: string;
  logo: SanityImage;
  defaultMode: "default" | "rosa";
  infoContent: any[]; // Sanity Portable Text blocks
  contactEmail: string;
  instagram?: string;
}

/* ─── Resolved types (after GROQ projection) ─── */
/* These match what the queries actually return   */

export interface ResolvedCategory {
  _id: string;
  name: string;
  slug: string;
  order: number;
  productCount: number;
}

export interface ResolvedProduct {
  _id: string;
  name: string;
  slug: string;
  category: {
    name: string;
    slug: string;
  };
  garmentType: string;
  edition: string;
  material: string;
  print?: string;
  size: string;
  price: number;
  currency: string;
  madeIn: string;
  conceptText: string;
  modelName: string;
  modelSize: string;
  available: boolean;
  media: ResolvedMedia[];
  order: number;
}

export interface ResolvedMedia {
  _key: string;
  type: MediaType;
  assetRef: string;
  url: string;
  alt: string;
  size: MediaSize;
  caption?: string;
  lqip?: string;
  dimensions?: {
    width: number;
    height: number;
    aspectRatio: number;
  };
}

export interface ResolvedSettings {
  brandName: string;
  logoUrl: string;
  defaultMode: "default" | "rosa";
  infoContent: any[];
  contactEmail: string;
  instagram?: string;
}
