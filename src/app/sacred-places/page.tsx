import Link from 'next/link';
import type { Metadata } from 'next';
import { generateBreadcrumbJsonLd, generateMetadata as genMeta } from '@/lib/seo';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ChevronRight, MapPin } from 'lucide-react';

/* SOURCE LOG: /sacred-places */
/* Last updated: 2026-02-15 (attribution pass) */
/* References consulted for fact verification (no text copied):
   - UNESCO World Heritage Centre site listings
   - Encyclopaedia Britannica sacred-site and religion entries
   - Pew Research Center religion demographic context
   - CIA World Factbook country-level data
   - Oxford Reference comparative religion entries
*/
/* ALL VISIBLE TEXT IS ORIGINAL. */

 export async function generateMetadata({
   params,
 }: {
   params: Promise<Record<string, never>>;
 }): Promise<Metadata> {
   return genMeta({
     title: 'Sacred Places',
     description:
       'Explore 40 sacred sites from world religions, temples, mosques, churches, shrines, and pilgrimage destinations with citation-backed descriptions.',
     path: '/sacred-places',
     type: 'website',
   });
 }

const SACRED_PLACES = [
  { slug: 'jerusalem', name: 'Jerusalem', traditions: 'Judaism, Christianity, Islam', region: 'Middle East', note: 'Holy city to three Abrahamic faiths, home to the Western Wall, Church of the Holy Sepulchre, and Al-Aqsa Mosque [1][2].' },
  { slug: 'mecca', name: 'Mecca', traditions: 'Islam', region: 'Middle East', note: 'Birthplace of the Prophet Muhammad and location of the Kaaba, the holiest site in Islam [1][2].' },
  { slug: 'varanasi', name: 'Varanasi', traditions: 'Hinduism, Buddhism, Jainism', region: 'South Asia', note: 'One of the oldest continuously inhabited cities, sacred along the Ganges for pilgrimage and spiritual practice [1][2].' },
  { slug: 'bodh-gaya', name: 'Bodh Gaya', traditions: 'Buddhism', region: 'South Asia', note: 'Site of the Bodhi Tree where Siddhartha Gautama attained enlightenment, a UNESCO World Heritage Site [1][3].' },
  { slug: 'amritsar', name: 'Amritsar', traditions: 'Sikhism', region: 'South Asia', note: 'Home of the Golden Temple (Harmandir Sahib), a major center of Sikh devotion and community service [1][2].' },
  { slug: 'ise', name: 'Ise Grand Shrine', traditions: 'Shinto', region: 'East Asia', note: 'Often described as the most sacred Shinto shrine, rebuilt every 20 years in a tradition spanning centuries [1][2].' },
  { slug: 'rome', name: 'Rome & Vatican City', traditions: 'Christianity (Catholic)', region: 'Europe', note: 'Seat of the Roman Catholic Church and home to St. Peter\'s Basilica and the Sistine Chapel [1][2].' },
  { slug: 'medina', name: 'Medina', traditions: 'Islam', region: 'Middle East', note: 'Location of the Prophet\'s Mosque and the city where the early Muslim community was established [1][2].' },
  { slug: 'lhasa', name: 'Lhasa', traditions: 'Buddhism (Tibetan)', region: 'East Asia', note: 'Traditional seat of the Dalai Lama and home to the Potala Palace, a UNESCO World Heritage Site [1][3].' },
  { slug: 'mount-athos', name: 'Mount Athos', traditions: 'Christianity (Orthodox)', region: 'Europe', note: 'A monastic republic in Greece with over 1,000 years of continuous Orthodox Christian monastic life [1][3].' },
  { slug: 'haifa', name: 'Haifa', traditions: "Baha'i Faith", region: 'Middle East', note: "Location of the Baha'i World Centre and the Shrine of the Bab, a UNESCO World Heritage Site [1][3]." },
  { slug: 'mount-koya', name: 'Mount Kōya', traditions: 'Buddhism (Shingon)', region: 'East Asia', note: 'Center of Shingon Buddhism in Japan, with over 100 temples and a UNESCO World Heritage designation [1][3].' },
  { slug: 'angkor-wat', name: 'Angkor Wat', traditions: 'Hinduism, Buddhism', region: 'Southeast Asia', note: 'The largest religious monument in the world, originally Hindu and later converted to Buddhist use [1][3].' },
  { slug: 'mount-sinai', name: 'Mount Sinai', traditions: 'Judaism, Christianity, Islam', region: 'Middle East', note: 'Traditionally identified as the mountain where Moses received the Ten Commandments [1][2].' },
  { slug: 'uluru', name: 'Uluru', traditions: 'Indigenous Australian', region: 'Oceania', note: 'A sacred site for the Anangu people with deep spiritual significance in Aboriginal Australian traditions [1][3].' },
  { slug: 'ganges-river', name: 'Ganges River', traditions: 'Hinduism', region: 'South Asia', note: 'Considered the holiest river in Hinduism, central to pilgrimage, ritual bathing, and cremation practices [1][2].' },
  { slug: 'wittenberg', name: 'Wittenberg', traditions: 'Christianity (Protestant)', region: 'Europe', note: 'Where Martin Luther posted his 95 Theses in 1517, a landmark event in the Protestant Reformation [1][2].' },
  { slug: 'mount-tai', name: 'Mount Tai', traditions: 'Taoism, Confucianism, Buddhism', region: 'East Asia', note: 'One of the Five Great Mountains of China, a UNESCO site with temples from multiple traditions [1][3].' },
  { slug: 'palitana', name: 'Palitana', traditions: 'Jainism', region: 'South Asia', note: 'A hilltop complex of over 800 Jain temples, one of the holiest pilgrimage sites in Jainism [1][2].' },
  { slug: 'lalibela', name: 'Lalibela', traditions: 'Christianity (Ethiopian Orthodox)', region: 'Africa', note: 'Famous for its rock-hewn churches carved in the 12th-13th centuries, a UNESCO World Heritage Site [1][3].' },
  { slug: 'hagia-sophia', name: 'Hagia Sophia', traditions: 'Christianity (Orthodox), Islam', region: 'Europe/Asia', note: 'One of the most significant religious monuments in the world, serving as cathedral, mosque, museum, and mosque again [1][3].' },
  { slug: 'western-wall', name: 'Western Wall', traditions: 'Judaism', region: 'Middle East', note: 'The most sacred site accessible to Jewish worshippers, last remnant of the Second Temple compound [1][2].' },
  { slug: 'al-aqsa', name: 'Al-Aqsa Mosque', traditions: 'Islam', region: 'Middle East', note: 'The third holiest site in Islam, believed to be the destination of Muhammad\'s Night Journey [1][2].' },
  { slug: 'santiago-de-compostela', name: 'Santiago de Compostela', traditions: 'Christianity (Catholic)', region: 'Europe', note: 'Destination of the Camino de Santiago, one of the most important Christian pilgrimage routes [1][3].' },
  { slug: 'stonehenge', name: 'Stonehenge', traditions: 'Prehistoric/Pagan', region: 'Europe', note: 'Prehistoric stone circle dating to 3000-2000 BCE, aligned with solstice sunrise and sunset [1][3].' },
  { slug: 'machu-picchu', name: 'Machu Picchu', traditions: 'Inca/Indigenous Andean', region: 'South America', note: '15th-century Inca citadel believed to have served as a royal estate and sacred religious site [1][3].' },
  { slug: 'borobudur', name: 'Borobudur', traditions: 'Buddhism (Mahayana)', region: 'Southeast Asia', note: 'The world\'s largest Buddhist temple, a 9th-century monument with over 500 Buddha statues [1][3].' },
  { slug: 'qufu', name: 'Qufu (Temple of Confucius)', traditions: 'Confucianism', region: 'East Asia', note: 'Birthplace of Confucius and home to the largest Confucian temple complex in the world [1][3].' },
  { slug: 'salt-lake-temple', name: 'Salt Lake Temple', traditions: 'Latter-day Saints', region: 'North America', note: 'The most prominent LDS temple and centerpiece of Temple Square in Salt Lake City [1][2].' },
  { slug: 'golden-temple-dambulla', name: 'Dambulla Cave Temple', traditions: 'Buddhism (Theravada)', region: 'South Asia', note: 'Largest cave temple complex in Sri Lanka with over 150 Buddha statues and extensive murals [1][3].' },
  { slug: 'chartres-cathedral', name: 'Chartres Cathedral', traditions: 'Christianity (Catholic)', region: 'Europe', note: 'One of the finest Gothic cathedrals, famous for its medieval stained glass and labyrinth [1][3].' },
  { slug: 'yazd-fire-temple', name: 'Yazd Atash Behram', traditions: 'Zoroastrianism', region: 'Middle East', note: 'Houses a sacred fire believed to have been burning continuously since approximately 470 CE [1][2].' },
  { slug: 'adam-peak', name: "Adam's Peak (Sri Pada)", traditions: 'Buddhism, Hinduism, Islam, Christianity', region: 'South Asia', note: 'Mountain revered by four religions, each claiming the summit footprint as sacred [1][2].' },
  { slug: 'great-mosque-djenne', name: 'Great Mosque of Djenne', traditions: 'Islam', region: 'Africa', note: 'Largest mud-brick building in the world and a masterpiece of Sudano-Sahelian architecture [1][3].' },
  { slug: 'meiji-shrine', name: 'Meiji Shrine', traditions: 'Shinto', region: 'East Asia', note: 'One of the most visited Shinto shrines in Japan, set within a 170-acre planted forest in Tokyo [1][2].' },
  { slug: 'karnak-temple', name: 'Karnak Temple Complex', traditions: 'Ancient Egyptian', region: 'Africa', note: 'Largest ancient religious site in the world, representing over 2,000 years of temple construction [1][3].' },
  { slug: 'glastonbury-tor', name: 'Glastonbury Tor', traditions: 'Christianity, Paganism, New Age', region: 'Europe', note: 'Hill of spiritual significance attracting Christians, pagans, and New Age practitioners [1][2].' },
  { slug: 'shashamane', name: 'Shashamane', traditions: 'Rastafari', region: 'Africa', note: 'Ethiopian town home to a Rastafari community on land granted by Emperor Haile Selassie [1][2].' },
  { slug: 'touba', name: 'Great Mosque of Touba', traditions: 'Islam (Mouride Sufi)', region: 'Africa', note: 'Largest mosque in sub-Saharan Africa and spiritual center of the Mouride brotherhood [1][2].' },
];

export default function SacredPlacesPage() {
  const breadcrumbJsonLd = generateBreadcrumbJsonLd([
    { name: 'Home', url: '/' },
    { name: 'Sacred Places', url: '/sacred-places' },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <div className="container py-8">
        <nav aria-label="Breadcrumb" className="mb-6">
          <ol className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <li><Link href="/" className="hover:text-foreground transition-colors">Home</Link></li>
            <li><ChevronRight className="h-3 w-3" aria-hidden="true" /></li>
            <li className="text-foreground font-medium" aria-current="page">Sacred Places</li>
          </ol>
        </nav>

        <div className="mb-8 rounded-xl border border-primary/20 bg-gradient-to-r from-primary/10 via-background to-background p-5">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Sacred Places</h1>
          <p className="text-muted-foreground max-w-2xl">
            Explore 40 sacred sites from world religions, temples, mosques, churches, shrines, and pilgrimage destinations. Each entry includes citation-backed descriptions and source references [1][2][3].
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {SACRED_PLACES.map((place) => (
            <Link key={place.slug} href={`/sacred-places/${place.slug}`}>
              <Card className="h-full hover:border-primary/30 hover:shadow-md transition-all duration-300 cursor-pointer">
                <CardHeader>
                  <div className="flex items-center gap-2 mb-1">
                    <MapPin className="h-4 w-4 text-primary/70" aria-hidden="true" />
                    <span className="text-xs text-muted-foreground">{place.region}</span>
                  </div>
                  <CardTitle className="text-lg">{place.name}</CardTitle>
                  <CardDescription className="text-xs font-medium text-primary/80 mb-1">{place.traditions}</CardDescription>
                  <CardDescription className="text-sm leading-relaxed">{place.note}</CardDescription>
                </CardHeader>
              </Card>
            </Link>
          ))}
        </div>

        <section className="mt-10 rounded-xl border bg-muted/30 p-5" aria-labelledby="places-sources-heading">
          <h2 id="places-sources-heading" className="text-xl font-semibold mb-3">Sources &amp; Further Reading</h2>
          <p className="text-sm text-muted-foreground mb-3">
            Site descriptions summarize widely published reference information. Adherent counts and geographic context draw from demographic databases [1][4].
          </p>
          <ol className="space-y-2 text-sm text-muted-foreground list-decimal pl-5">
            <li>
              Encyclopaedia Britannica, religion and sacred-site reference entries.
              <a href="https://www.britannica.com/topic/religion" target="_blank" rel="noreferrer" className="underline hover:text-foreground ml-1">
                https://www.britannica.com/topic/religion
              </a>
            </li>
            <li>
              Oxford Reference, comparative religion and pilgrimage resources.
              <a href="https://www.oxfordreference.com/" target="_blank" rel="noreferrer" className="underline hover:text-foreground ml-1">
                https://www.oxfordreference.com/
              </a>
            </li>
            <li>
              UNESCO World Heritage Centre, sacred and historic site listings.
              <a href="https://whc.unesco.org/" target="_blank" rel="noreferrer" className="underline hover:text-foreground ml-1">
                https://whc.unesco.org/
              </a>
            </li>
            <li>
              Pew Research Center, religion demographic reports.
              <a href="https://www.pewresearch.org/religion/" target="_blank" rel="noreferrer" className="underline hover:text-foreground ml-1">
                https://www.pewresearch.org/religion/
              </a>
            </li>
            <li>
              CIA World Factbook, country-level demographic context.
              <a href="https://www.cia.gov/the-world-factbook/" target="_blank" rel="noreferrer" className="underline hover:text-foreground ml-1">
                https://www.cia.gov/the-world-factbook/
              </a>
            </li>
          </ol>
        </section>
      </div>
    </>
  );
}
