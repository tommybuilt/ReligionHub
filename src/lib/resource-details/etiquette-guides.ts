import type { ResourceDetailEntry } from '@/lib/resource-details/types';

import { buildEtiquetteGuide } from '@/lib/resource-details/etiquette-guide-builder';
import { ETIQUETTE_GUIDE_SEEDS_A } from '@/lib/resource-details/etiquette-guide-seeds-a';
import { ETIQUETTE_GUIDE_SEEDS_B } from '@/lib/resource-details/etiquette-guide-seeds-b';
import { ETIQUETTE_GUIDE_SEEDS_C } from '@/lib/resource-details/etiquette-guide-seeds-c';
import { ETIQUETTE_GUIDE_SEEDS_D } from '@/lib/resource-details/etiquette-guide-seeds-d';

export const ETIQUETTE_GUIDE_DETAILS: ResourceDetailEntry[] = [
  ...ETIQUETTE_GUIDE_SEEDS_A,
  ...ETIQUETTE_GUIDE_SEEDS_B,
  ...ETIQUETTE_GUIDE_SEEDS_C,
  ...ETIQUETTE_GUIDE_SEEDS_D,
]
  .map((seed) => buildEtiquetteGuide(seed))
  .sort((a, b) => a.title.localeCompare(b.title));
