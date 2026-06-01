export interface TraditionVisual {
  accentBarClassName: string;
  imageUrl: string;
  altText?: string;
  photographerName?: string;
  photographerUrl?: string;
  sourceUrl?: string;
}

const fallbackVisual: TraditionVisual = {
  accentBarClassName: 'bg-gradient-to-r from-stone-500 via-amber-500 to-stone-600',
  imageUrl: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1600&q=80',
};

const traditionVisuals: Record<string, TraditionVisual> = {
  buddhism: {
    accentBarClassName: 'bg-gradient-to-r from-amber-500 via-orange-400 to-amber-700',
    imageUrl: 'https://images.unsplash.com/photo-1629953031870-02be15a295ee?auto=format&fit=crop&w=1600&q=80',
    altText: 'Brown Buddha statue near green mountain under blue sky during daytime',
    photographerName: 'abhijeet gourav',
    photographerUrl: 'https://unsplash.com/@abhijeet_gourav',
    sourceUrl: 'https://unsplash.com/photos/jwr0xaXsYKk',
  },
  hinduism: {
    accentBarClassName: 'bg-gradient-to-r from-orange-500 via-rose-400 to-orange-700',
    imageUrl: 'https://images.unsplash.com/photo-1625807161536-27903f2200fa?auto=format&fit=crop&w=1600&q=80',
    altText: 'A tall structure called Gopuram in Hindu Temples',
    photographerName: 'Aravind Thangaraj',
    photographerUrl: 'https://unsplash.com/@aravind_thangaraj',
    sourceUrl: 'https://unsplash.com/photos/7Ko8TpWTdTE',
  },
  islam: {
    accentBarClassName: 'bg-gradient-to-r from-emerald-500 via-teal-400 to-emerald-700',
    imageUrl: 'https://images.unsplash.com/photo-1694769473659-d1b1ae6c8040?auto=format&fit=crop&w=1600&q=80',
    altText: 'A large white building with a tall white tower',
    photographerName: 'Alim',
    photographerUrl: 'https://unsplash.com/@apyfz',
    sourceUrl: 'https://unsplash.com/photos/VOjgLmmjYvY',
  },
  christianity: {
    accentBarClassName: 'bg-gradient-to-r from-sky-500 via-blue-400 to-sky-700',
    imageUrl: 'https://images.unsplash.com/photo-1716666179312-1ec1e19cb73c?auto=format&fit=crop&w=1600&q=80',
    altText: 'A church with a cross on the front of it',
    photographerName: 'Jonny Gios',
    photographerUrl: 'https://unsplash.com/@supergios',
    sourceUrl: 'https://unsplash.com/photos/pvrJcXou78c',
  },
  catholicism: {
    accentBarClassName: 'bg-gradient-to-r from-rose-500 via-amber-400 to-rose-700',
    imageUrl: 'https://images.unsplash.com/photo-1615732224643-b000ac40c8b6?auto=format&fit=crop&w=1600&q=80',
    altText: 'White and brown concrete church under blue sky during daytime',
    photographerName: 'Josh Olalde',
    photographerUrl: 'https://unsplash.com/@josholalde',
    sourceUrl: 'https://unsplash.com/photos/qpEGHnflZvw',
  },
  'orthodox-christianity': {
    accentBarClassName: 'bg-gradient-to-r from-violet-500 via-indigo-400 to-violet-700',
    imageUrl: 'https://images.unsplash.com/photo-1594990375715-2d008aaaa31b?auto=format&fit=crop&w=1600&q=80',
    altText: 'Blue and gold cathedral with glass windows',
    photographerName: 'Rod Long',
    photographerUrl: 'https://unsplash.com/@rodlong',
    sourceUrl: 'https://unsplash.com/photos/y98wLEvLBJw',
  },
  protestantism: {
    accentBarClassName: 'bg-gradient-to-r from-blue-500 via-sky-400 to-blue-700',
    imageUrl: 'https://images.unsplash.com/photo-1573498945276-938e91c2972c?auto=format&fit=crop&w=1600&q=80',
    altText: 'Photo of white painted cathedral',
    photographerName: 'Mareks Steins',
    photographerUrl: 'https://unsplash.com/@marekssteins',
    sourceUrl: 'https://unsplash.com/photos/L9LN4BkGCOA',
  },
  'latter-day-saints': {
    accentBarClassName: 'bg-gradient-to-r from-emerald-500 via-cyan-400 to-emerald-700',
    imageUrl: 'https://images.unsplash.com/photo-1635808820042-01c0fc5a490a?auto=format&fit=crop&w=1600&q=80',
    altText: 'San Diego California Temple of the Church of Latter-day Saints with palm trees',
    photographerName: 'Bob Smith',
    photographerUrl: 'https://unsplash.com/@picturemebahb',
    sourceUrl: 'https://unsplash.com/photos/s3Jsepf2HNU',
  },
  judaism: {
    accentBarClassName: 'bg-gradient-to-r from-indigo-500 via-blue-400 to-indigo-700',
    imageUrl: 'https://images.unsplash.com/photo-1695781857590-9c1ee8847a8a?auto=format&fit=crop&w=1600&q=80',
    altText: 'A group of people standing in front of a stone wall',
    photographerName: 'JR Ross',
    photographerUrl: 'https://unsplash.com/@jeremiahjrross',
    sourceUrl: 'https://unsplash.com/photos/ynq5bNuGOCE',
  },
  sikhism: {
    accentBarClassName: 'bg-gradient-to-r from-yellow-500 via-amber-400 to-yellow-700',
    imageUrl: 'https://images.unsplash.com/photo-1757552529012-76b68fc93335?auto=format&fit=crop&w=1600&q=80',
    altText: 'Golden temple complex reflected in the water',
    photographerName: 'Sarbjit Singh',
    photographerUrl: 'https://unsplash.com/@saab97',
    sourceUrl: 'https://unsplash.com/photos/B2m_X74OSpA',
  },
  taoism: {
    accentBarClassName: 'bg-gradient-to-r from-teal-500 via-cyan-400 to-teal-700',
    imageUrl: 'https://images.unsplash.com/photo-1646445243822-70c89f8379a1?auto=format&fit=crop&w=1600&q=80',
    altText: 'A large building with a lot of decorations on top of it',
    photographerName: 'YL Lai',
    photographerUrl: 'https://unsplash.com/@amyno35',
    sourceUrl: 'https://unsplash.com/photos/3k-l1ekNg90',
  },
  shinto: {
    accentBarClassName: 'bg-gradient-to-r from-rose-500 via-red-400 to-rose-700',
    imageUrl: 'https://images.unsplash.com/photo-1565354613834-3fe89de516d1?auto=format&fit=crop&w=1600&q=80',
    altText: 'Pathway of red torii gates near trees',
    photographerName: 'Dave Weatherall',
    photographerUrl: 'https://unsplash.com/@thattravelblog',
    sourceUrl: 'https://unsplash.com/photos/akJtxwZPB84',
  },
  jainism: {
    accentBarClassName: 'bg-gradient-to-r from-lime-500 via-green-400 to-lime-700',
    imageUrl: 'https://images.unsplash.com/photo-1609151745346-c624e507baa2?auto=format&fit=crop&w=1600&q=80',
    altText: 'Brown and white Jain temple with hills in the background',
    photographerName: 'Paurav Shah',
    photographerUrl: 'https://unsplash.com/@pauravshah',
    sourceUrl: 'https://unsplash.com/photos/FrWK_4pG6yI',
  },
  zoroastrianism: {
    accentBarClassName: 'bg-gradient-to-r from-orange-500 via-amber-400 to-orange-700',
    imageUrl: 'https://images.unsplash.com/photo-1686372288132-1e65ee41c612?auto=format&fit=crop&w=1600&q=80',
    altText: 'Zoroastrian fire temple in Yazd with a reflecting pool',
    photographerName: 'Hasan Almasi',
    photographerUrl: 'https://unsplash.com/@hasanalmasi',
    sourceUrl: 'https://unsplash.com/photos/qI5IxiZ4NiU',
  },
  'bahai-faith': {
    accentBarClassName: 'bg-gradient-to-r from-violet-500 via-fuchsia-400 to-violet-700',
    imageUrl: 'https://images.unsplash.com/photo-1688257899811-d96d969416bf?auto=format&fit=crop&w=1600&q=80',
    altText: 'Lotus Temple in New Delhi with reflecting pools',
    photographerName: 'Jayanth Muppaneni',
    photographerUrl: 'https://unsplash.com/@jay_5',
    sourceUrl: 'https://unsplash.com/photos/z_De4o7rMTk',
  },
  'paganism-wicca': {
    accentBarClassName: 'bg-gradient-to-r from-fuchsia-500 via-purple-400 to-fuchsia-700',
    imageUrl: 'https://images.unsplash.com/photo-1594998100254-3c65bef09e53?auto=format&fit=crop&w=1600&q=80',
    altText: 'Moon magic book on a Wicca altar with candles and ritual items',
    photographerName: 'Content Pixie',
    photographerUrl: 'https://unsplash.com/@contentpixie',
    sourceUrl: 'https://unsplash.com/photos/pMKm9pybnTE',
  },
  'african-diaspora': {
    accentBarClassName: 'bg-gradient-to-r from-amber-500 via-emerald-400 to-amber-700',
    imageUrl: 'https://images.unsplash.com/photo-1553346717-d6f3e2de27c7?auto=format&fit=crop&w=1600&q=80',
    altText: 'Black and white photo of women at a Candomblé gathering in Santo Amaro, Bahia',
    photographerName: 'Tiago Celestino',
    photographerUrl: 'https://unsplash.com/@tcelestino',
    sourceUrl: 'https://unsplash.com/photos/VxHvUwA6Vac',
  },
  rastafari: {
    accentBarClassName: 'bg-gradient-to-r from-lime-500 via-amber-400 to-red-600',
    imageUrl: 'https://images.unsplash.com/photo-1615422079250-5d9aa901ef1b?auto=format&fit=crop&w=1600&q=80',
    altText: 'Rastafarian in the western mountains of Jamaica',
    photographerName: 'Jeremy Brady',
    photographerUrl: 'https://unsplash.com/@jeremygbrady',
    sourceUrl: 'https://unsplash.com/photos/UX0D8W5JSyg',
  },
  'indigenous-traditions': {
    accentBarClassName: 'bg-gradient-to-r from-stone-500 via-amber-400 to-stone-700',
    imageUrl: 'https://images.unsplash.com/photo-1745450310279-a28d759d6677?auto=format&fit=crop&w=1600&q=80',
    altText: 'Indigenous people perform a vibrant traditional dance',
    photographerName: 'LILIA O\'HARA',
    photographerUrl: 'https://unsplash.com/@liliaoh',
    sourceUrl: 'https://unsplash.com/photos/5v8Q8OQNndY',
  },
  druze: {
    accentBarClassName: 'bg-gradient-to-r from-cyan-500 via-emerald-400 to-cyan-700',
    imageUrl: 'https://images.unsplash.com/photo-1666272496924-6c01e131274b?auto=format&fit=crop&w=1600&q=80',
    altText: 'Rocky desert landscape with low hills in the Judean desert',
    photographerName: 'Dmitry Mishin',
    photographerUrl: 'https://unsplash.com/@dmitrymishin',
    sourceUrl: 'https://unsplash.com/photos/thTEPJ5XJdA',
  },
  'unitarian-universalism': {
    accentBarClassName: 'bg-gradient-to-r from-amber-500 via-rose-400 to-amber-700',
    imageUrl: 'https://images.unsplash.com/photo-1655290117450-1add27becaff?auto=format&fit=crop&w=1600&q=80',
    altText: 'Front of Belper Unitarian Chapel in Derbyshire with its brick walkway',
    photographerName: 'Belper Unitarians',
    photographerUrl: 'https://unsplash.com/@belperunitarians',
    sourceUrl: 'https://unsplash.com/photos/wIxvUmETwvU',
  },
  'secular-humanism': {
    accentBarClassName: 'bg-gradient-to-r from-slate-500 via-blue-400 to-slate-700',
    imageUrl: 'https://images.unsplash.com/photo-1546953304-5d96f43c2e94?auto=format&fit=crop&w=1600&q=80',
    altText: 'The Rose Main Reading Room at the New York Public Library',
    photographerName: 'Patrick Robert Doyle',
    photographerUrl: 'https://unsplash.com/@teapowered',
    sourceUrl: 'https://unsplash.com/photos/OvXht_wi5Ew',
  },
  'jehovahs-witnesses': {
    accentBarClassName: 'bg-gradient-to-r from-indigo-500 via-sky-400 to-indigo-700',
    imageUrl: 'https://images.unsplash.com/photo-1580411297422-e39730bb26dc?auto=format&fit=crop&w=1600&q=80',
    altText: 'Green treetops under a clear blue sky',
    photographerName: 'Thomas Bormans',
    photographerUrl: 'https://unsplash.com/@thomasbormans',
    sourceUrl: 'https://unsplash.com/photos/TeWgJZ4r88Q',
  },
  confucianism: {
    accentBarClassName: 'bg-gradient-to-r from-slate-500 via-stone-400 to-slate-700',
    imageUrl: 'https://images.unsplash.com/photo-1551624750-a6d4e0e7f6cf?auto=format&fit=crop&w=1600&q=80',
    altText: 'Red and beige temple with layered roof details',
    photographerName: 'Bird Liang',
    photographerUrl: 'https://unsplash.com/@birdlg',
    sourceUrl: 'https://unsplash.com/photos/nDGFOpkP2OM',
  },
};

export function getTraditionVisual(slug?: string): TraditionVisual {
  if (!slug) {
    return fallbackVisual;
  }

  return traditionVisuals[slug] || fallbackVisual;
}
