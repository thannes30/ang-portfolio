/* Prefixes public-folder asset paths with the deploy base path (empty unless set). */
export function withBase(src: string): string {
  return `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}${src}`;
}
