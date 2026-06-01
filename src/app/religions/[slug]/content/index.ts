export type { ReligionContent } from './types';

import { christianity } from './christianity';
import { islam } from './islam';
import { hinduism } from './hinduism';
import { buddhism } from './buddhism';
import { judaism } from './judaism';
import { sikhism } from './sikhism';
import { bahai } from './bahai';
import { jainism } from './jainism';
import { shinto } from './shinto';
import { taoism } from './taoism';
import { zoroastrianism } from './zoroastrianism';
import { indigenous } from './indigenous';
import { catholicism } from './catholicism';
import { orthodox } from './orthodox';
import { confucianism } from './confucianism';
import { protestantism } from './protestantism';
import { latterDaySaints } from './latter-day-saints';
import { jehovahsWitnesses } from './jehovahs-witnesses';
import { secularHumanism } from './secular-humanism';
import { africanDiaspora } from './african-diaspora';
import { paganism } from './paganism';
import { rastafari } from './rastafari';
import { druze } from './druze';
import { unitarianUniversalism } from './unitarian-universalism';
import type { ReligionContent } from './types';

export const RELIGION_CONTENT: Record<string, ReligionContent> = {
  christianity,
  islam,
  hinduism,
  buddhism,
  judaism,
  sikhism,
  'bahai-faith': bahai,
  jainism,
  shinto,
  taoism,
  zoroastrianism,
  'indigenous-traditions': indigenous,
  catholicism,
  'orthodox-christianity': orthodox,
  confucianism,
  protestantism,
  'latter-day-saints': latterDaySaints,
  'jehovahs-witnesses': jehovahsWitnesses,
  'secular-humanism': secularHumanism,
  'african-diaspora': africanDiaspora,
  'paganism-wicca': paganism,
  rastafari,
  druze,
  'unitarian-universalism': unitarianUniversalism,
};
