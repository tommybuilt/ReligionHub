import { RELIGION_CONTENT } from '@/app/religions/[slug]/content';
import { RECOMMENDED_READING } from '@/app/religions/[slug]/recommended-reading';
import { firstSentences, readingTimeLabel, slugify } from '@/lib/resource-details/helpers';
import type { ResourceDetailEntry } from '@/lib/resource-details/types';

export const BEGINNER_GUIDE_DETAILS: ResourceDetailEntry[] = Object.entries(RELIGION_CONTENT)
  .map(([slug, content]) => {
    const readingHref = RECOMMENDED_READING[slug]?.length ? `/recommended-reading/${slug}` : '/recommended-reading';

    const sections = [
      {
        heading: `Start with the center of ${content.name}`,
        body: [
          `${content.name} can feel overwhelming at first because new readers often meet it through headlines, stereotypes, or one narrow branch rather than through the tradition’s own internal center. A better starting point is to begin with the big picture first: what the tradition says about ultimate reality, what kind of life it calls people to live, and how its communities describe belonging, worship, discipline, and moral purpose [1][2]. ${content.overview}`,
          `For a beginner, the most useful question is not “What is every detail?” but “What holds this tradition together across time and geography?” ${content.name} has developed through communities, teachers, texts, and rituals that give shape to daily life as much as formal doctrine does [1][2][3]. Starting there makes later debates about denominations, schools, reform movements, and regional practice much easier to understand.`
        ]
      },
      {
        heading: 'Learn belief, practice, and sacred texts in sequence',
        body: [
          `A reliable beginner path is to move through belief, practice, and texts in that order. First understand the core claims and spiritual goals that matter most in ${content.name}. ${content.beliefs}`,
          `Then look at how those ideas are embodied. Ritual, ethics, festivals, leadership, daily devotion, and communal identity usually show what a religion values more clearly than abstract summaries alone [1][2]. ${content.practices} ${content.texts}`
        ]
      },
      {
        heading: 'Place the tradition in history and internal diversity',
        body: [
          `No religion stays frozen in the form it had at its beginning. A beginner guide should therefore include some history, because historical development explains why modern communities within the same tradition can look quite different from one another [1][2]. ${content.origins}`,
          `The next step is to notice internal diversity without losing the larger frame. Differences in authority, ritual style, interpretation, social setting, and historical memory often create multiple streams inside one tradition [2][3]. ${content.denominations} ${content.holidays}`
        ]
      },
      {
        heading: 'Best next steps on ReligionHub',
        body: [
          `Once you have the broad outline, the best next move is to read one strong introductory book, explore the main religion profile, and then compare ${content.name} with at least one neighboring tradition. That rhythm helps a new learner move from description to understanding without getting trapped in isolated facts [1][2][3].`,
          `On this site, the most useful next clicks are the full ${content.name} profile, the recommended reading list for ${content.name}, the sacred texts hub, the sacred items guide, and one comparison page that brings a nearby tradition into view. That sequence usually gives beginners enough context to recognize both similarity and real difference without flattening the tradition into a slogan.`
        ]
      }
    ];

    return {
      slug: slugify(`${content.name} for Beginners`),
      title: `${content.name} for Beginners`,
      description: `A beginner-friendly guide to ${content.name}, including what to learn first about beliefs, practices, sacred texts, historical development, and internal diversity.`,
      summary: `${firstSentences(content.overview, 2)} [1][2]`,
      categoryLabel: 'Beginner Guide',
      wordCountLabel: readingTimeLabel(sections.flatMap((section) => section.body)),
      sections,
      relatedLinks: [
        { label: `${content.name} profile`, href: `/religions/${slug}` },
        { label: `${content.name} reading list`, href: readingHref },
        { label: 'Sacred texts hub', href: '/sacred-texts' },
        { label: 'Sacred Items & Gifts', href: '/sacred-items' },
        { label: 'Compare traditions', href: '/compare' },
      ],
      sources: [
        { label: 'Encyclopaedia Britannica religion reference entries.', url: 'https://www.britannica.com/topic/religion' },
        { label: 'Oxford Reference comparative religion entries.', url: 'https://www.oxfordreference.com/' },
        { label: 'Pew Research Center religion reports and datasets.', url: 'https://www.pewresearch.org/religion/' },
        { label: content.sourceSix, url: content.sourceSixUrl },
      ],
      faq: [
        {
          question: `What should I learn first about ${content.name}?`,
          answer: `Start with the tradition’s central beliefs, then look at worship and daily practice, then move into its major texts and historical development.`
        },
        {
          question: `Is one book enough to understand ${content.name}?`,
          answer: `Usually not. A beginner overview helps, but readers learn more accurately when they pair an introduction with the religion profile, primary texts, and at least one comparison page.`
        }
      ]
    } satisfies ResourceDetailEntry;
  })
  .sort((a, b) => a.title.localeCompare(b.title));
