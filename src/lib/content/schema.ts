import { z } from "zod";

export const MetricSchema = z.object({
  label: z.string().min(1),
  labelTh: z.string().min(1).optional(),
  value: z.string().min(1),
  valueTh: z.string().min(1).optional(),
});

export const LocalizedTextSchema = z.object({
  en: z.string().min(1),
  th: z.string().min(1),
});

export const ProjectFrontmatterSchema = z.object({
  slug: z
    .string()
    .min(1)
    .regex(/^[a-z0-9-]+$/, "slug must be lowercase kebab-case"),
  title: z.string().min(1),
  shortTitle: z.string().min(1),
  tagline: z.string().min(1),
  summary: LocalizedTextSchema,
  status: z.enum(["live", "beta", "planned"]),
  featured: z.boolean().default(false),
  order: z.number().int().min(1),
  category: z.string().min(1),
  demoPath: z.string().startsWith("/").optional(),
  repoUrl: z.string().url(),
  liveBackendUrl: z.string().url().optional(),
  stack: z.array(z.string().min(1)).min(1),
  metrics: z.array(MetricSchema).min(1),
  starterPrompts: z.array(z.string().min(1)).min(1),
});

export const ProfileFrontmatterSchema = z.object({
  name: z.string().min(1),
  role: z.string().min(1),
  headline: z.string().min(1),
  headlineTh: z.string().min(1).optional(),
  location: z.string().min(1),
  locationTh: z.string().min(1).optional(),
  githubUrl: z.string().url(),
  linkedinUrl: z.string().url(),
  tilRepoUrl: z.string().url(),
});

export type LocalizedText = z.infer<typeof LocalizedTextSchema>;
export type ProjectFrontmatter = z.infer<typeof ProjectFrontmatterSchema>;
export type ProfileFrontmatter = z.infer<typeof ProfileFrontmatterSchema>;

export interface ProjectDoc extends ProjectFrontmatter {
  body: string;
}

export interface ProfileDoc extends ProfileFrontmatter {
  body: string;
}

export interface KnowledgeChunk {
  id: string;
  scope: string; // "profile" | "til" | project slug
  title: string;
  section: string;
  sourceLabel: string;
  sourceUrl: string;
  content: string;
}
