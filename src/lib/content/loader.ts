import fs from "fs";
import path from "path";
import matter from "gray-matter";
import {
  KnowledgeChunk,
  ProfileDoc,
  ProfileFrontmatterSchema,
  ProjectDoc,
  ProjectFrontmatterSchema,
} from "./schema";

const CONTENT_DIR = path.join(process.cwd(), "content");
const PROJECTS_DIR = path.join(CONTENT_DIR, "projects");
const TIL_DIR = path.join(CONTENT_DIR, "til");

let cachedChunks: KnowledgeChunk[] | null = null;

function splitMarkdownIntoSections(
  body: string,
  defaultSection: string
): Array<{ section: string; content: string }> {
  const lines = body.split(/\r?\n/);
  const sections: Array<{ section: string; content: string }> = [];
  let currentSection = defaultSection;
  let buffer: string[] = [];

  const flush = () => {
    const text = buffer.join("\n").trim();
    if (text.length > 0) {
      sections.push({ section: currentSection, content: text });
    }
    buffer = [];
  };

  for (const line of lines) {
    const headingMatch = line.match(/^#{2,3}\s+(.+)$/);
    if (headingMatch) {
      flush();
      currentSection = headingMatch[1].trim();
    } else {
      buffer.push(line);
    }
  }
  flush();

  return sections;
}

export function getProfile(): ProfileDoc {
  const filePath = path.join(CONTENT_DIR, "profile.md");
  const raw = fs.readFileSync(filePath, "utf8");
  const parsed = matter(raw);
  const frontmatter = ProfileFrontmatterSchema.parse(parsed.data);

  return {
    ...frontmatter,
    body: parsed.content.trim(),
  };
}

export function getAllProjects(options?: { includePlanned?: boolean }): ProjectDoc[] {
  if (!fs.existsSync(PROJECTS_DIR)) return [];
  const files = fs
    .readdirSync(PROJECTS_DIR)
    .filter((f) => f.endsWith(".md") && !f.startsWith("_TEMPLATE"));

  const projects = files.map((file) => {
    const raw = fs.readFileSync(path.join(PROJECTS_DIR, file), "utf8");
    const parsed = matter(raw);
    const frontmatter = ProjectFrontmatterSchema.parse(parsed.data);
    return {
      ...frontmatter,
      body: parsed.content.trim(),
    };
  });

  const filtered = options?.includePlanned
    ? projects
    : projects.filter((p) => p.status !== "planned");

  return filtered.sort((a, b) => a.order - b.order);
}

export function getProjectBySlug(slug: string): ProjectDoc | null {
  const projects = getAllProjects({ includePlanned: false });
  return projects.find((p) => p.slug === slug) ?? null;
}

export function getKnowledgeChunks(forceReload = false): KnowledgeChunk[] {
  if (cachedChunks && !forceReload) {
    return cachedChunks;
  }

  const chunks: KnowledgeChunk[] = [];

  // 1. Profile SOT
  const profile = getProfile();
  const profileSections = splitMarkdownIntoSections(profile.body, "Profile Overview");
  profileSections.forEach((sec, idx) => {
    chunks.push({
      id: `profile-${idx + 1}`,
      scope: "profile",
      title: `${profile.name} — ${profile.role}`,
      section: sec.section,
      sourceLabel: `Profile · ${sec.section}`,
      sourceUrl: "/",
      content: `${profile.name} (${profile.role}). ${profile.headline}\n${sec.section}\n${sec.content}`,
    });
  });

  // 2. Projects SOT (Auto-discovers every non-template .md in content/projects/)
  const projects = getAllProjects({ includePlanned: false });
  for (const project of projects) {
    const metricsText = project.metrics.map((m) => `${m.label}: ${m.value}`).join(" | ");
    const stackText = project.stack.join(", ");

    // Summary chunk for high-level & comparison queries
    chunks.push({
      id: `${project.slug}-summary`,
      scope: project.slug,
      title: project.title,
      section: "Overview & Verified Metrics",
      sourceLabel: `${project.title} · Overview`,
      sourceUrl: `/projects/${project.slug}`,
      content: [
        `${project.title} (${project.shortTitle}) — ${project.tagline}`,
        `Summary (EN): ${project.summary.en}`,
        `Summary (TH): ${project.summary.th}`,
        `Category: ${project.category}`,
        `Tech Stack: ${stackText}`,
        `Verified Metrics: ${metricsText}`,
        project.demoPath ? `Live Interactive Demo Route: ${project.demoPath}` : "",
        `GitHub Repository: ${project.repoUrl}`,
      ]
        .filter(Boolean)
        .join("\n"),
    });

    const projectSections = splitMarkdownIntoSections(project.body, "Architecture");
    projectSections.forEach((sec, idx) => {
      chunks.push({
        id: `${project.slug}-sec-${idx + 1}`,
        scope: project.slug,
        title: project.title,
        section: sec.section,
        sourceLabel: `${project.title} · ${sec.section}`,
        sourceUrl: `/projects/${project.slug}`,
        content: `${project.title} — ${sec.section}\nStack: ${stackText}\n${sec.content}`,
      });
    });
  }

  // 3. Engineering TIL Highlights
  if (fs.existsSync(TIL_DIR)) {
    const tilFiles = fs
      .readdirSync(TIL_DIR)
      .filter((f) => f.endsWith(".md") && !f.startsWith("_TEMPLATE"));

    for (const file of tilFiles) {
      const raw = fs.readFileSync(path.join(TIL_DIR, file), "utf8");
      const parsed = matter(raw);
      const repoUrl =
        typeof parsed.data.repoUrl === "string"
          ? parsed.data.repoUrl
          : "https://github.com/ApecSinlapachai/ai-automation-til";
      const docTitle =
        typeof parsed.data.title === "string" ? parsed.data.title : "Engineering TIL Notes";

      const sections = splitMarkdownIntoSections(parsed.content.trim(), "TIL Highlights");
      sections.forEach((sec, idx) => {
        chunks.push({
          id: `til-${file.replace(/\.md$/, "")}-${idx + 1}`,
          scope: "til",
          title: docTitle,
          section: sec.section,
          sourceLabel: `TIL · ${sec.section}`,
          sourceUrl: repoUrl,
          content: `${docTitle} — ${sec.section}\n${sec.content}`,
        });
      });
    }
  }

  cachedChunks = chunks;
  return chunks;
}
