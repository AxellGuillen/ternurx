/* ═══════════════════════════════════════════════════════════════
   TERNURX — composables/useSanity.ts
   
   Typed wrapper over @nuxtjs/sanity.
   All data fetching goes through here.
   ═══════════════════════════════════════════════════════════════ */

import {
  categoriesQuery,
  productBySlugQuery,
  productsByCategoryQuery,
  firstProductQuery,
  siteSettingsQuery,
} from "~/sanity/queries";

import type {
  ResolvedCategory,
  ResolvedProduct,
  ResolvedSettings,
} from "~/types/product";

export function useTernurxSanity() {
  const sanity = useSanity();

  /**
   * Fetch all categories for the index.
   * Ordered by `order` field, includes product count.
   */
  async function fetchCategories(): Promise<ResolvedCategory[]> {
    return await sanity.fetch<ResolvedCategory[]>(categoriesQuery);
  }

  /**
   * Fetch a single product by its slug.
   * Returns null if not found.
   */
  async function fetchProduct(slug: string): Promise<ResolvedProduct | null> {
    return await sanity.fetch<ResolvedProduct | null>(productBySlugQuery, {
      slug,
    });
  }

  /**
   * Fetch all products within a category.
   * Ordered by `order` field.
   */
  async function fetchProductsByCategory(
    categorySlug: string,
  ): Promise<ResolvedProduct[]> {
    return await sanity.fetch<ResolvedProduct[]>(productsByCategoryQuery, {
      categorySlug,
    });
  }

  /**
   * Fetch the first product (default view on page load).
   * Ordered by category order, then product order.
   */
  async function fetchFirstProduct(): Promise<ResolvedProduct | null> {
    return await sanity.fetch<ResolvedProduct | null>(firstProductQuery);
  }

  /**
   * Fetch site settings singleton.
   */
  async function fetchSettings(): Promise<ResolvedSettings> {
    return await sanity.fetch<ResolvedSettings>(siteSettingsQuery);
  }

  return {
    fetchCategories,
    fetchProduct,
    fetchProductsByCategory,
    fetchFirstProduct,
    fetchSettings,
  };
}
