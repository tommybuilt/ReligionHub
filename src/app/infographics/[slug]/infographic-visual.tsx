'use client';

import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

interface InfographicVisualProps {
  slug: string;
}

export function InfographicVisual({ slug }: InfographicVisualProps) {
  switch (slug) {
    case 'world-religions-by-population':
      return <WorldReligionsByPopulation />;
    case 'religions-founded-timeline':
      return <ReligionsFoundedTimeline />;
    case 'holy-books-comparison':
      return <HolyBooksComparison />;
    case 'five-pillars-of-islam':
      return <FivePillarsOfIslam />;
    case 'branches-of-christianity':
      return <BranchesOfChristianity />;
    case 'afterlife-beliefs-compared':
      return <AfterlifeBeliefs />;
    default:
      return <p className="text-muted-foreground">Infographic not found.</p>;
  }
}

/* ─── 1. World Religions by Population ─── */
const POPULATION_DATA = [
  { name: 'Christianity', value: 2.4, color: '#3B82F6', pct: 31.1 },
  { name: 'Islam', value: 1.9, color: '#10B981', pct: 24.9 },
  { name: 'Hinduism', value: 1.2, color: '#F97316', pct: 15.2 },
  { name: 'Buddhism', value: 0.5, color: '#EAB308', pct: 6.6 },
  { name: 'Folk Religions', value: 0.43, color: '#8B5CF6', pct: 5.6 },
  { name: 'Unaffiliated', value: 1.2, color: '#6B7280', pct: 15.6 },
  { name: 'Judaism', value: 0.016, color: '#6366F1', pct: 0.2 },
  { name: 'Other', value: 0.06, color: '#EC4899', pct: 0.8 },
];

function WorldReligionsByPopulation() {
  const maxVal = Math.max(...POPULATION_DATA.map((d) => d.value));
  return (
    <Card>
      <CardContent className="pt-6">
        <p className="text-sm text-muted-foreground mb-6">Estimated global adherents (billions), 2024</p>
        <div className="space-y-4">
          {POPULATION_DATA.map((d) => (
            <div key={d.name}>
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-medium">{d.name}</span>
                <span className="text-sm text-muted-foreground">{d.value >= 0.1 ? `${d.value}B` : `${Math.round(d.value * 1000)}M`} ({d.pct}%)</span>
              </div>
              <div className="h-6 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-700"
                  style={{ width: `${(d.value / maxVal) * 100}%`, backgroundColor: d.color }}
                />
              </div>
            </div>
          ))}
        </div>
        <p className="text-xs text-muted-foreground mt-6">World population: ~8.1 billion (2024). Source: Pew Research Center.</p>
      </CardContent>
    </Card>
  );
}

/* ─── 2. Religions Founded Timeline ─── */
const TIMELINE_DATA = [
  { name: 'Hinduism', year: -1500, label: '~1500 BCE', color: '#F97316' },
  { name: 'Judaism', year: -1200, label: '~1200 BCE', color: '#6366F1' },
  { name: 'Zoroastrianism', year: -1000, label: '~1000 BCE', color: '#14B8A6' },
  { name: 'Buddhism', year: -500, label: '~500 BCE', color: '#EAB308' },
  { name: 'Confucianism', year: -500, label: '~500 BCE', color: '#A855F7' },
  { name: 'Jainism', year: -500, label: '~500 BCE', color: '#EF4444' },
  { name: 'Taoism', year: -400, label: '~400 BCE', color: '#EC4899' },
  { name: 'Christianity', year: 30, label: '~30 CE', color: '#3B82F6' },
  { name: 'Islam', year: 610, label: '610 CE', color: '#10B981' },
  { name: 'Sikhism', year: 1500, label: '1500 CE', color: '#F59E0B' },
  { name: "Bahá'í Faith", year: 1844, label: '1844 CE', color: '#8B5CF6' },
];

function ReligionsFoundedTimeline() {
  const minYear = -1700;
  const maxYear = 2000;
  const range = maxYear - minYear;

  return (
    <Card>
      <CardContent className="pt-6">
        <p className="text-sm text-muted-foreground mb-6">Approximate founding or emergence dates</p>
        <div className="overflow-x-auto">
          <div className="relative min-w-[420px]" style={{ height: `${TIMELINE_DATA.length * 56 + 40}px` }}>
            {/* Vertical line */}
            <div className="absolute left-[120px] top-0 bottom-0 w-0.5 bg-border" />
            {/* Era labels */}
            <div className="absolute left-[120px] top-0 -translate-x-1/2 text-xs text-muted-foreground">1500 BCE</div>
            <div className="absolute left-[120px] bottom-0 -translate-x-1/2 text-xs text-muted-foreground">Present</div>

            {TIMELINE_DATA.map((d) => {
              const top = ((d.year - minYear) / range) * 100;
              return (
                <div
                  key={d.name}
                  className="absolute flex items-center gap-3"
                  style={{ top: `${top}%`, left: 0, right: 0 }}
                >
                  <span className="w-[110px] text-right text-xs font-medium truncate">{d.name}</span>
                  <div
                    className="h-4 w-4 rounded-full border-2 border-background shrink-0 z-10"
                    style={{ backgroundColor: d.color }}
                  />
                  <span className="text-xs text-muted-foreground">{d.label}</span>
                </div>
              );
            })}
          </div>
        </div>
        <p className="text-xs text-muted-foreground mt-4">Dates are approximate and based on scholarly consensus. Source: Encyclopaedia Britannica.</p>
      </CardContent>
    </Card>
  );
}

/* ─── 3. Sacred Texts Comparison ─── */
const TEXTS_DATA = [
  { religion: 'Christianity', text: 'Bible', language: 'Hebrew, Aramaic, Greek', chapters: '~1,189 chapters', age: '~3,400–1,900 years old' },
  { religion: 'Islam', text: 'Quran', language: 'Arabic', chapters: '114 suras', age: '~1,400 years old' },
  { religion: 'Judaism', text: 'Tanakh (+ Talmud)', language: 'Hebrew, Aramaic', chapters: '929 chapters (Tanakh)', age: '~3,400–2,100 years old' },
  { religion: 'Hinduism', text: 'Vedas, Upanishads, Gita', language: 'Sanskrit', chapters: 'Multiple texts', age: '~3,500–2,200 years old' },
  { religion: 'Buddhism', text: 'Pali Canon (Tipitaka)', language: 'Pali', chapters: '~10,000 suttas', age: '~2,400 years old' },
  { religion: 'Sikhism', text: 'Guru Granth Sahib', language: 'Gurmukhi', chapters: '1,430 pages', age: '~400 years old' },
];

function HolyBooksComparison() {
  return (
    <Card>
      <CardContent className="pt-6">
        <p className="text-sm text-muted-foreground mb-6">Key facts about the sacred scriptures of major world religions</p>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px] text-sm">
            <thead>
              <tr className="border-b">
                <th className="text-left py-2 pr-4 font-semibold">Religion</th>
                <th className="text-left py-2 pr-4 font-semibold">Text</th>
                <th className="text-left py-2 pr-4 font-semibold">Language</th>
                <th className="text-left py-2 pr-4 font-semibold">Size</th>
                <th className="text-left py-2 font-semibold">Age</th>
              </tr>
            </thead>
            <tbody>
              {TEXTS_DATA.map((d) => (
                <tr key={d.religion} className="border-b last:border-0">
                  <td className="py-3 pr-4 font-medium">{d.religion}</td>
                  <td className="py-3 pr-4 text-muted-foreground">{d.text}</td>
                  <td className="py-3 pr-4 text-muted-foreground">{d.language}</td>
                  <td className="py-3 pr-4 text-muted-foreground">{d.chapters}</td>
                  <td className="py-3 text-muted-foreground">{d.age}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-muted-foreground mt-4">Ages are approximate. Source: Encyclopaedia Britannica; Oxford Reference.</p>
      </CardContent>
    </Card>
  );
}

/* ─── 4. Five Pillars of Islam ─── */
const PILLARS = [
  { name: 'Shahada', arabic: 'الشهادة', desc: 'Declaration of faith: "There is no god but God, and Muhammad is the messenger of God."', icon: '☪️' },
  { name: 'Salat', arabic: 'الصلاة', desc: 'Five daily prayers performed facing Mecca at prescribed times.', icon: '🕌' },
  { name: 'Zakat', arabic: 'الزكاة', desc: 'Obligatory charitable giving, typically 2.5% of one\'s savings annually.', icon: '🤲' },
  { name: 'Sawm', arabic: 'الصوم', desc: 'Fasting from dawn to sunset during the holy month of Ramadan.', icon: '🌙' },
  { name: 'Hajj', arabic: 'الحج', desc: 'Pilgrimage to Mecca at least once in a lifetime for those physically and financially able.', icon: '🕋' },
];

function FivePillarsOfIslam() {
  return (
    <Card>
      <CardContent className="pt-6">
        <p className="text-sm text-muted-foreground mb-6">The five foundational practices of Islam</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {PILLARS.map((p, i) => (
            <div key={p.name} className="text-center p-4 rounded-xl border bg-muted/20">
              <div className="text-3xl mb-2" role="img" aria-label={p.name}>{p.icon}</div>
              <div className="text-xs text-muted-foreground mb-1">Pillar {i + 1}</div>
              <h3 className="font-bold text-sm">{p.name}</h3>
              <p className="text-xs text-muted-foreground mt-0.5 font-arabic">{p.arabic}</p>
              <p className="text-xs text-muted-foreground mt-2 leading-relaxed">{p.desc}</p>
            </div>
          ))}
        </div>
        <p className="text-xs text-muted-foreground mt-4">Source: Encyclopaedia Britannica, &quot;Five Pillars of Islam.&quot;</p>
      </CardContent>
    </Card>
  );
}

/* ─── 5. Branches of Christianity ─── */
const BRANCHES = [
  { name: 'Catholic', value: 1.35, pct: 50.1, color: '#3B82F6', desc: 'Led by the Pope in Rome. Largest single Christian body.' },
  { name: 'Protestant', value: 0.9, pct: 36.7, color: '#10B981', desc: 'Diverse movement from the Reformation: Lutherans, Baptists, Methodists, Pentecostals, etc.' },
  { name: 'Orthodox', value: 0.26, pct: 11.9, color: '#F59E0B', desc: 'Eastern and Oriental Orthodox churches, concentrated in Eastern Europe and Middle East.' },
  { name: 'Other Christian', value: 0.03, pct: 1.3, color: '#8B5CF6', desc: 'Includes Latter-day Saints, Jehovah\'s Witnesses, and independent churches.' },
];

function BranchesOfChristianity() {
  const total = BRANCHES.reduce((s, b) => s + b.value, 0);
  return (
    <Card>
      <CardContent className="pt-6">
        <p className="text-sm text-muted-foreground mb-6">Estimated adherents by branch (~{total.toFixed(1)} billion total)</p>
        {/* Horizontal stacked bar */}
        <div className="h-10 rounded-full overflow-hidden flex mb-6">
          {BRANCHES.map((b) => (
            <div
              key={b.name}
              className="h-full flex items-center justify-center text-white text-xs font-medium"
              style={{ width: `${b.pct}%`, backgroundColor: b.color }}
              title={`${b.name}: ${b.pct}%`}
            >
              {b.pct > 8 ? `${b.pct}%` : ''}
            </div>
          ))}
        </div>
        <div className="space-y-4">
          {BRANCHES.map((b) => (
            <div key={b.name} className="flex items-start gap-3">
              <div className="h-4 w-4 rounded-full shrink-0 mt-0.5" style={{ backgroundColor: b.color }} />
              <div>
                <p className="font-semibold text-sm">{b.name}, {b.value}B ({b.pct}%)</p>
                <p className="text-sm text-muted-foreground">{b.desc}</p>
              </div>
            </div>
          ))}
        </div>
        <p className="text-xs text-muted-foreground mt-4">Source: Pew Research Center, &quot;Global Christianity,&quot; 2011.</p>
      </CardContent>
    </Card>
  );
}

/* ─── 6. Afterlife Beliefs Compared ─── */
const AFTERLIFE_DATA = [
  { religion: 'Christianity', concept: 'Heaven & Hell', detail: 'Judgment after death; eternal life with God (heaven) or separation from God (hell). Some traditions include purgatory.' },
  { religion: 'Islam', concept: 'Jannah & Jahannam', detail: 'Day of Judgment; deeds weighed on a scale. Paradise (Jannah) for the righteous; Hellfire (Jahannam) for the wicked.' },
  { religion: 'Hinduism', concept: 'Reincarnation & Moksha', detail: 'Cycle of rebirth (samsara) governed by karma. Ultimate goal: moksha (liberation from the cycle).' },
  { religion: 'Buddhism', concept: 'Rebirth & Nirvana', detail: 'Rebirth without a permanent soul. Six realms of existence. Ultimate goal: nirvana (cessation of suffering).' },
  { religion: 'Judaism', concept: 'Olam Ha-Ba', detail: 'Relatively less emphasis on afterlife. Concepts include resurrection, the World to Come, and temporary purification (Gehinnom).' },
  { religion: 'Sikhism', concept: 'Reincarnation & Mukti', detail: 'Cycle of rebirth governed by karma. Liberation (mukti) through devotion to God and divine grace.' },
];

function AfterlifeBeliefs() {
  return (
    <Card>
      <CardContent className="pt-6">
        <p className="text-sm text-muted-foreground mb-6">How the world&apos;s major religions understand death and what follows</p>
        <div className="space-y-4">
          {AFTERLIFE_DATA.map((d) => (
            <div key={d.religion} className="p-4 rounded-xl border bg-muted/20">
              <div className="flex items-center gap-2 mb-1">
                <span className="font-bold text-sm">{d.religion}</span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary font-medium">{d.concept}</span>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">{d.detail}</p>
            </div>
          ))}
        </div>
        <p className="text-xs text-muted-foreground mt-4">Source: Encyclopaedia Britannica; comparative religion scholarship.</p>
      </CardContent>
    </Card>
  );
}
