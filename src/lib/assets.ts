/** Keep public asset URLs valid locally and below the GitHub Pages repository path. */
export function assetPath(path: string): string {
  return `${process.env.NEXT_PUBLIC_BASE_PATH || ""}${path}`;
}
