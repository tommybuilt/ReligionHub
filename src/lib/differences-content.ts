import type { ReligionContent } from '@/app/religions/[slug]/content/types';

interface DifferenceSection {
  heading: string;
  contentKey: keyof ReligionContent;
  topic: string;
  question: string;
}

interface ReligionEntry {
  name: string;
  content: ReligionContent;
}

const SECTIONS: DifferenceSection[] = [
  { heading: 'How Their Origins Differ', contentKey: 'origins', topic: 'origins and historical formation', question: 'Where did each tradition begin?' },
  { heading: 'Core Beliefs Compared', contentKey: 'beliefs', topic: 'ultimate belief and doctrine', question: 'What does each tradition finally claim about reality, God, or liberation?' },
  { heading: 'Practices & Rituals', contentKey: 'practices', topic: 'ritual life and daily practice', question: 'How is devotion expressed in ordinary religious life?' },
  { heading: 'Sacred Texts & Scriptures', contentKey: 'texts', topic: 'scripture and textual authority', question: 'Which texts carry the most weight, and how are they used?' },
  { heading: 'Demographics & Global Reach', contentKey: 'demographics', topic: 'population, geography, and global reach', question: 'Where are followers concentrated today, and how widely has each tradition spread?' },
  { heading: 'Views on the Afterlife', contentKey: 'afterlife', topic: 'death, judgment, rebirth, and final destiny', question: 'What happens after death?' },
  { heading: 'Ethical Frameworks', contentKey: 'ethics', topic: 'ethics and moral reasoning', question: 'What makes an action right, wrong, or spiritually harmful?' },
  { heading: 'Leadership & Authority', contentKey: 'leadership', topic: 'leadership and institutional authority', question: 'Who has the standing to teach, guide, or decide?' },
  { heading: 'Denominations & Internal Diversity', contentKey: 'denominations', topic: 'internal diversity and denominational life', question: 'How much diversity exists inside each tradition?' },
  { heading: 'Holidays & Observances', contentKey: 'holidays', topic: 'seasonal observance and sacred time', question: 'Which feasts, fasts, and observances shape the year?' },
  { heading: 'Symbols & Iconography', contentKey: 'symbols', topic: 'symbols, imagery, and visual identity', question: 'Which images, objects, or signs best express the tradition?' },
];

function sentenceList(text: string): string[] {
  return text
    .replace(/\n\n/g, ' ')
    .split(/(?<=[.!?])\s+/)
    .map((sentence) => sentence.trim())
    .filter((sentence) => sentence.length > 20);
}

function extractKeyPoints(text: string, maxSentences = 2): string {
  return sentenceList(text).slice(0, maxSentences).join(' ');
}

function hashString(value: string): number {
  let hash = 0;

  for (let index = 0; index < value.length; index += 1) {
    hash = (hash * 31 + value.charCodeAt(index)) % 2147483647;
  }

  return Math.abs(hash);
}

function rotateEntries(entries: ReligionEntry[], offset: number): ReligionEntry[] {
  if (entries.length === 0) {
    return entries;
  }

  const normalizedOffset = offset % entries.length;
  return [...entries.slice(normalizedOffset), ...entries.slice(0, normalizedOffset)];
}

function joinNames(names: string[]): string {
  if (names.length <= 1) {
    return names[0] || '';
  }

  if (names.length === 2) {
    return `${names[0]} and ${names[1]}`;
  }

  return `${names.slice(0, -1).join(', ')}, and ${names[names.length - 1]}`;
}

function twoTraditionOpening(entries: ReligionEntry[], section: DifferenceSection, variant: number): string {
  const [first, second] = entries;

  switch (variant % 8) {
    case 0:
      return `One of the clearest ways to separate ${first.name} from ${second.name} is to look at ${section.topic}.`;
    case 1:
      return `${section.question} ${first.name} and ${second.name} do not answer that question in the same way.`;
    case 2:
      return `Both ${first.name} and ${second.name} devote serious attention to ${section.topic}, but they organize the conversation differently.`;
    case 3:
      return `History helps explain why ${section.topic} developed along different lines in ${first.name} and ${second.name}.`;
    case 4:
      return `At first glance, ${first.name} and ${second.name} can sound closer on ${section.topic} than they really are.`;
    case 5:
      return `Move from ${first.name} to ${second.name}, and the language of ${section.topic} shifts almost immediately.`;
    case 6:
      return `A close read of ${section.topic} makes it hard to treat ${first.name} and ${second.name} as simple variations on one model.`;
    default:
      return `Shared vocabulary can hide real differences, and ${section.topic} is one of the best places to see that between ${first.name} and ${second.name}.`;
  }
}

function twoTraditionBody(entries: ReligionEntry[], section: DifferenceSection, variant: number): string {
  const [first, second] = entries;
  const firstSummary = extractKeyPoints(first.content[section.contentKey], 2);
  const secondSummary = extractKeyPoints(second.content[section.contentKey], 2);

  switch (variant % 4) {
    case 0:
      return `${first.name} provides one starting point. ${firstSummary} ${second.name} introduces a different emphasis. ${secondSummary}`;
    case 1:
      return `Start with ${first.name}. ${firstSummary} Then turn to ${second.name}. ${secondSummary}`;
    case 2:
      return `${firstSummary} ${second.name}, however, frames the same territory differently. ${secondSummary}`;
    default:
      return `${first.name} keeps one set of concerns in focus. ${firstSummary} ${second.name} answers with a different set of priorities. ${secondSummary}`;
  }
}

function multiTraditionOpening(entries: ReligionEntry[], section: DifferenceSection, variant: number): string {
  const nameList = joinNames(entries.map((entry) => entry.name));

  switch (variant % 8) {
    case 0:
      return `Place ${nameList} side by side on ${section.topic}, and distinct priorities come into focus quickly.`;
    case 1:
      return `${section.question} A multi tradition comparison makes the range of answers much easier to see across ${nameList}.`;
    case 2:
      return `The comparison becomes sharper once ${nameList} are read together on ${section.topic}, because each tradition stresses something different.`;
    case 3:
      return `Even where ${nameList} share vocabulary, historical contact, or broad themes, ${section.topic} pushes them in different directions.`;
    case 4:
      return `One useful way to compare ${nameList} is to track how each handles ${section.topic} in its own terms.`;
    case 5:
      return `The overlap is real, but so are the differences. ${nameList} do not rank or explain ${section.topic} in the same order.`;
    case 6:
      return `Readers often flatten traditions into neat categories, yet ${section.topic} shows why ${nameList} resist that shortcut.`;
    default:
      return `This category becomes more interesting with three or more traditions on the page, because ${section.topic} rarely lines up cleanly across ${nameList}.`;
  }
}

function multiTraditionBody(entries: ReligionEntry[], section: DifferenceSection, variant: number): string {
  const summaries = entries.map((entry) => ({
    name: entry.name,
    summary: extractKeyPoints(entry.content[section.contentKey], 2),
  }));

  switch (variant % 4) {
    case 0:
      return summaries
        .map((entry, index) => {
          if (index === 0) return `Begin with ${entry.name}. ${entry.summary}`;
          if (index === 1) return `Then turn to ${entry.name}. ${entry.summary}`;
          if (index === summaries.length - 1) return `Finally, ${entry.name} widens the contrast further. ${entry.summary}`;
          return `${entry.name} adds another layer to the picture. ${entry.summary}`;
        })
        .join(' ');
    case 1:
      return summaries
        .map((entry, index) => {
          if (index === 0) return `${entry.name} sets one baseline. ${entry.summary}`;
          if (index === 1) return `${entry.name} shifts the emphasis. ${entry.summary}`;
          return `${entry.name}, meanwhile, answers the same question differently. ${entry.summary}`;
        })
        .join(' ');
    case 2:
      return summaries
        .map((entry, index) => {
          if (index === 0) return `Rather than treating one tradition as the default, start with ${entry.name}. ${entry.summary}`;
          if (index === summaries.length - 1) return `${entry.name} completes the comparison with a further adjustment in tone and priority. ${entry.summary}`;
          return `${entry.name} belongs in the middle of the comparison, not on the margins. ${entry.summary}`;
        })
        .join(' ');
    default:
      return summaries
        .map((entry, index) => {
          if (index === 0) return `${entry.name} frames the issue one way. ${entry.summary}`;
          if (index === 1) return `${entry.name} responds from a different historical and theological setting. ${entry.summary}`;
          return `${entry.name} shows that the category can be organized differently again. ${entry.summary}`;
        })
        .join(' ');
  }
}

function closingLine(section: DifferenceSection, nextSection: DifferenceSection | undefined, variant: number): string {
  const nextTopic = nextSection?.topic;

  switch (variant % 6) {
    case 0:
      return nextTopic ? `Those priorities carry forward into ${nextTopic}.` : 'That difference is not cosmetic, it changes how the tradition is taught and practiced.';
    case 1:
      return 'Seen together, the contrast is less about simple opposition and more about different ways of ordering religious life.';
    case 2:
      return 'A short definition can flatten that complexity, but the side by side view makes the distinctions easier to hold in mind.';
    case 3:
      return 'Readers usually feel the consequences most clearly in lived practice, not only in abstract doctrine.';
    case 4:
      return 'That leaves a useful follow-up question for the next section: how do these differences appear in daily religious life?';
    default:
      return '';
  }
}

function buildNarrative(
  names: string[],
  contents: (ReligionContent | undefined)[],
  section: DifferenceSection,
  sectionIndex: number,
  nextSection: DifferenceSection | undefined
): string {
  const validEntries = names
    .map((name, index) => {
      const content = contents[index];
      return content ? { name, content } : null;
    })
    .filter((entry): entry is ReligionEntry => entry !== null);

  if (validEntries.length < 2) {
    return '';
  }

  const pageSeed = hashString(validEntries.map((entry) => entry.name).join('|'));
  const orderedEntries = rotateEntries(validEntries, (pageSeed + sectionIndex) % validEntries.length);
  const openingVariant = (pageSeed + sectionIndex * 3) % 8;
  const bodyVariant = (Math.floor(pageSeed / 7) + sectionIndex * 5) % 4;
  const closingVariant = (Math.floor(pageSeed / 11) + sectionIndex * 2) % 6;

  const opening = orderedEntries.length === 2
    ? twoTraditionOpening(orderedEntries, section, openingVariant)
    : multiTraditionOpening(orderedEntries, section, openingVariant);

  const body = orderedEntries.length === 2
    ? twoTraditionBody(orderedEntries, section, bodyVariant)
    : multiTraditionBody(orderedEntries, section, bodyVariant);

  const closing = closingLine(section, nextSection, closingVariant);

  return [opening, body, closing].filter(Boolean).join(' ').trim();
}

export interface DifferencesData {
  sections: { heading: string; narrative: string }[];
}

export function generateDifferencesContent(
  names: string[],
  contents: (ReligionContent | undefined)[]
): DifferencesData {
  const sections = SECTIONS
    .map((section, index) => ({
      heading: section.heading,
      narrative: buildNarrative(names, contents, section, index, SECTIONS[index + 1]),
    }))
    .filter((section) => section.narrative.length > 0);

  return { sections };
}
