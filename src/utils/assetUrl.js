// Helper to resolve asset paths with the base URL from Vite
const BASE_URL = import.meta.env.BASE_URL;

export function assetUrl(path) {
  // Remove leading slash from path if present
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  // Ensure BASE_URL ends with slash
  const base = BASE_URL.endsWith('/') ? BASE_URL : BASE_URL + '/';
  return base + cleanPath;
}
