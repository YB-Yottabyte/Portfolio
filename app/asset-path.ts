const productionBasePath = "/portfolio";

/**
 * Resolves a file from `public/` for local development and GitHub Pages.
 */
export function assetPath(asset: string): string {
  const normalizedAsset = asset.replace(/^\/+/, "");
  const basePath =
    process.env.NODE_ENV === "production" ? productionBasePath : "";

  return `${basePath}/${normalizedAsset}`;
}
