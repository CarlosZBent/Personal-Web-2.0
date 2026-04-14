import {defineCollection} from "astro:content";
import { z } from "astro/zod";
import {glob, file} from 'astro/loaders'

const blogSchema = z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    // slug: z.string(),
    updatedDate: z.string().optional(),
    heroImage: z.string().optional(),
    badge: z.string().optional(),
});

export type BlogSchema = z.infer<typeof blogSchema>;

const blog = defineCollection({
    loader: glob({
        pattern: "src/content/blog/**/*.md",
        //generateId: ({ entry }) => entry.replace(/^src\/content\/blog\//, "").replace(/\.md$/, "")
    }),
    schema: blogSchema
});

export const collections = { blog }