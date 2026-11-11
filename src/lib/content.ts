import fs from "node:fs";
import path from "node:path";

import matter from "gray-matter";
import { marked } from "marked";

const contentDir = path.join(process.cwd(), "content");

export type Bio = {
  name: string;
  tagline: string;
  html: string;
};

export type Artwork = {
  slug: string;
  title: string;
  alt: string;
  image: string;
  thumb: string;
  width: number;
  height: number;
  html: string;
};

export function getBio(): Bio {
  const raw = fs.readFileSync(path.join(contentDir, "bio.md"), "utf8");
  const { data, content } = matter(raw);
  return {
    name: String(data.name),
    tagline: String(data.tagline),
    html: marked.parse(content, { async: false }),
  };
}

export function getArtworks(): Artwork[] {
  const dir = path.join(contentDir, "art");
  return fs
    .readdirSync(dir)
    .filter((file) => file.endsWith(".md"))
    .sort()
    .map((file) => {
      const { data, content } = matter(fs.readFileSync(path.join(dir, file), "utf8"));
      return {
        slug: file.replace(/\.md$/, ""),
        title: String(data.title),
        alt: String(data.alt),
        image: String(data.image),
        thumb: String(data.thumb),
        width: Number(data.width),
        height: Number(data.height),
        html: marked.parse(content, { async: false }),
      };
    });
}
