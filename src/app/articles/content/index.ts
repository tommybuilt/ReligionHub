import type { Article } from './types';
export type { Article, ArticleMeta, ArticleSource } from './types';
export { AUTHOR_BIOS } from './types';

import { doAllReligionsBelieveInGod } from './do-all-religions-believe-in-god';
import { whatIsTheHolyTrinity } from './what-is-the-holy-trinity';
import { howChristianitySpread } from './how-christianity-spread';
import { whatIsKosher } from './what-is-kosher-jewish-dietary-laws';
import { differenceCatholicProtestant } from './difference-catholic-protestant';
import { whoWasTheBuddha } from './who-was-the-buddha';
import { karmaExplained } from './karma-explained';
import { whyMuslimsFastRamadan } from './why-muslims-fast-ramadan';
import { baptismExplained } from './baptism-explained';
import { greatSchismCatholicOrthodox } from './great-schism-catholic-orthodox';
import { differenceSunniShia } from './difference-sunni-shia';
import { hinduFuneralRites } from './hindu-funeral-rites';
import { afterlifeBeliefs } from './afterlife-beliefs-world-religions';
import { canYouConvertToJudaism } from './can-you-convert-to-judaism';
import { isBuddhismReligionOrPhilosophy } from './is-buddhism-religion-or-philosophy';
import { howIslamBegan } from './how-islam-began';
import { meditationAcrossReligions } from './meditation-across-religions';
import { sikhBeliefsEquality } from './sikh-beliefs-equality';
import { whatIsNirvanaBuddhism } from './what-is-nirvana-buddhism';
import { whySoManyChristianDenominations } from './why-so-many-christian-denominations';
import { dietaryLawsWorldReligions } from './dietary-laws-world-religions';
import { whatIsShariaLaw } from './what-is-sharia-law';
import { buddhismAndScience } from './buddhism-and-science';
import { whatDoJehovahsWitnessesBelieve } from './what-do-jehovahs-witnesses-believe';
import { differenceReligionSpirituality } from './difference-religion-spirituality';

const ARTICLE_TIMELINE: Record<string, Pick<Article, 'publishDate' | 'displayDate'>> = {
  'difference-religion-spirituality': { publishDate: '2026-03-20', displayDate: 'March 20, 2026' },
  'what-do-jehovahs-witnesses-believe': { publishDate: '2026-03-17', displayDate: 'March 17, 2026' },
  'buddhism-and-science': { publishDate: '2026-03-14', displayDate: 'March 14, 2026' },
  'what-is-sharia-law': { publishDate: '2026-03-11', displayDate: 'March 11, 2026' },
  'dietary-laws-world-religions': { publishDate: '2026-03-08', displayDate: 'March 8, 2026' },
  'why-so-many-christian-denominations': { publishDate: '2026-03-05', displayDate: 'March 5, 2026' },
  'what-is-nirvana-buddhism': { publishDate: '2026-03-02', displayDate: 'March 2, 2026' },
  'sikh-beliefs-equality': { publishDate: '2026-02-27', displayDate: 'February 27, 2026' },
  'meditation-across-religions': { publishDate: '2026-02-24', displayDate: 'February 24, 2026' },
  'how-islam-began': { publishDate: '2026-02-21', displayDate: 'February 21, 2026' },
  'is-buddhism-religion-or-philosophy': { publishDate: '2026-02-18', displayDate: 'February 18, 2026' },
  'can-you-convert-to-judaism': { publishDate: '2026-02-15', displayDate: 'February 15, 2026' },
  'afterlife-beliefs-world-religions': { publishDate: '2026-02-12', displayDate: 'February 12, 2026' },
  'hindu-funeral-rites': { publishDate: '2026-02-09', displayDate: 'February 9, 2026' },
  'difference-sunni-shia': { publishDate: '2026-02-06', displayDate: 'February 6, 2026' },
  'great-schism-catholic-orthodox': { publishDate: '2026-02-03', displayDate: 'February 3, 2026' },
  'baptism-explained': { publishDate: '2026-01-31', displayDate: 'January 31, 2026' },
  'why-muslims-fast-ramadan': { publishDate: '2026-01-28', displayDate: 'January 28, 2026' },
  'karma-explained': { publishDate: '2026-01-25', displayDate: 'January 25, 2026' },
  'who-was-the-buddha': { publishDate: '2026-01-22', displayDate: 'January 22, 2026' },
  'difference-catholic-protestant': { publishDate: '2026-01-19', displayDate: 'January 19, 2026' },
  'what-is-kosher-jewish-dietary-laws': { publishDate: '2026-01-16', displayDate: 'January 16, 2026' },
  'how-christianity-spread': { publishDate: '2026-01-13', displayDate: 'January 13, 2026' },
  'what-is-the-holy-trinity': { publishDate: '2026-01-10', displayDate: 'January 10, 2026' },
  'do-all-religions-believe-in-god': { publishDate: '2026-01-07', displayDate: 'January 7, 2026' },
};

function applyArticleTimeline(article: Article): Article {
  const timeline = ARTICLE_TIMELINE[article.slug];

  if (!timeline) {
    return article;
  }

  return {
    ...article,
    ...timeline,
  };
}

export const ALL_ARTICLES: Article[] = [
  doAllReligionsBelieveInGod,
  whatIsTheHolyTrinity,
  howChristianitySpread,
  whatIsKosher,
  differenceCatholicProtestant,
  whoWasTheBuddha,
  karmaExplained,
  whyMuslimsFastRamadan,
  baptismExplained,
  greatSchismCatholicOrthodox,
  differenceSunniShia,
  hinduFuneralRites,
  afterlifeBeliefs,
  canYouConvertToJudaism,
  isBuddhismReligionOrPhilosophy,
  howIslamBegan,
  meditationAcrossReligions,
  sikhBeliefsEquality,
  whatIsNirvanaBuddhism,
  whySoManyChristianDenominations,
  dietaryLawsWorldReligions,
  whatIsShariaLaw,
  buddhismAndScience,
  whatDoJehovahsWitnessesBelieve,
  differenceReligionSpirituality,
].map(applyArticleTimeline).sort((a, b) => new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime());

export const ARTICLE_BY_SLUG: Record<string, Article> = Object.fromEntries(
  ALL_ARTICLES.map((a) => [a.slug, a])
);

export const ARTICLE_CATEGORIES = ['Beliefs', 'Practices', 'History', 'Culture', 'FAQ', 'Comparison'] as const;
