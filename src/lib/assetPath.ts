/**
 * Get the correct asset path with basePath for static exports
 * In development, basePath is empty. In production on GitHub Pages, it includes the repo name.
 */
export function assetPath(path: string): string {
  const basePath = process.env.NODE_ENV === 'production' ? '/cicero-demo' : ''
  return `${basePath}${path}`
}
