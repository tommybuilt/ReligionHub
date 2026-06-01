export interface ResourceDetailSection {
  heading: string;
  body: string[];
}

export interface ResourceDetailSource {
  label: string;
  url?: string;
}

export interface ResourceDetailLink {
  label: string;
  href: string;
}

export interface ResourceDetailEntry {
  slug: string;
  title: string;
  description: string;
  summary: string;
  categoryLabel: string;
  wordCountLabel: string;
  sections: ResourceDetailSection[];
  relatedLinks: ResourceDetailLink[];
  sources: ResourceDetailSource[];
  faq?: { question: string; answer: string }[];
}
