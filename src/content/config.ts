import { defineCollection, z } from "astro:content";

const blog = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    tags: z.array(z.string()).optional(),
    draft: z.boolean().optional(),
    launchYear: z.number().optional(),
    displayGitHubBlock: z.boolean().optional(),
  }),
});

const projects = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    draft: z.boolean().optional(),
    docsURL: z.string().optional(),
    repoURL: z.string().optional(),
    websiteURL: z.string().optional(),
    launchYear: z.number().optional(),
    thumbnailURL: z.string(),
    activelyBeingDeveloped: z.boolean(),
    displayGitHubBlock: z.boolean(),
    tags: z.array(z.string()).optional(),
  }),
});

export const collections = { blog, projects };
