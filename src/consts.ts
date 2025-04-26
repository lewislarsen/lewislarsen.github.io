import type { Site, Metadata, Socials } from "@types";

export const SITE: Site = {
  NAME: "Lewis Larsen",
  EMAIL: "lewis@larsens.dev",
  NUM_POSTS_ON_HOMEPAGE: 3,
  NUM_PROJECTS_ON_HOMEPAGE: 3,
};

export const HOME: Metadata = {
  TITLE: "Home",
  DESCRIPTION: "The personal website of Lewis Larsen.",
};

export const BLOG: Metadata = {
  TITLE: "Blog",
  DESCRIPTION: "My musings, primarily about web development but other topics too!",
};

export const PROJECTS: Metadata = {
  TITLE: "Projects",
  DESCRIPTION:
    "The projects I have been working on.",
};

export const USES: Metadata = {
  TITLE: "Uses",
  DESCRIPTION:
      "The projects I have been working on.",
};

export const SOCIALS: Socials = [
  {
    NAME: "GitHub",
    ICON: "github",
    HREF: "https://github.com/lewislarsen",
  },
];
