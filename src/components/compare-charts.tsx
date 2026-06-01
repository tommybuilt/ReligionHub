'use client';

import React from 'react';
import { Reveal } from '@/components/reveal';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend,
  PieChart, Pie, Cell,
  RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar,
} from 'recharts';
import { Card, CardContent } from '@/components/ui/card';

const EARTH_COLORS = [
  'hsl(25, 55%, 42%)',   // warm brown (primary)
  'hsl(35, 40%, 55%)',   // muted gold
  'hsl(150, 25%, 45%)',  // sage green
  'hsl(15, 45%, 50%)',   // terracotta
  'hsl(200, 25%, 50%)',  // muted blue
  'hsl(45, 50%, 60%)',   // amber
];

const REGION_COLORS: Record<string, string> = {
  'Asia-Pacific': 'hsl(25, 55%, 42%)',
  'Europe': 'hsl(35, 40%, 55%)',
  'Sub-Saharan Africa': 'hsl(150, 25%, 45%)',
  'Middle East & N. Africa': 'hsl(15, 45%, 50%)',
  'Americas': 'hsl(200, 25%, 50%)',
  'Other': 'hsl(45, 50%, 60%)',
};

interface AdherentData {
  name: string;
  adherents: number;
  label: string;
}

interface RegionData {
  region: string;
  value: number;
}

interface RadarData {
  axis: string;
  [key: string]: string | number;
}

const ADHERENT_ESTIMATES: Record<string, { adherents: number; label: string }> = {
  'Christianity': { adherents: 2400, label: '~2.4B' },
  'Islam': { adherents: 1900, label: '~1.9B' },
  'Hinduism': { adherents: 1200, label: '~1.2B' },
  'Buddhism': { adherents: 500, label: '~500M' },
  'Judaism': { adherents: 15, label: '~15M' },
  'Sikhism': { adherents: 30, label: '~30M' },
  "Baha'i Faith": { adherents: 8, label: '~8M' },
  'Jainism': { adherents: 5, label: '~5M' },
  'Shinto': { adherents: 4, label: '~4M' },
  'Taoism': { adherents: 12, label: '~12M' },
  'Zoroastrianism': { adherents: 0.2, label: '~200K' },
  'Indigenous & Traditional': { adherents: 400, label: '~400M' },
  'Catholicism': { adherents: 1300, label: '~1.3B' },
  'Orthodox Christianity': { adherents: 220, label: '~220M' },
  'Protestantism': { adherents: 800, label: '~800M' },
  'Confucianism': { adherents: 6, label: '~6M' },
  'Latter-day Saints': { adherents: 17, label: '~17M' },
  "Jehovah's Witnesses": { adherents: 9, label: '~9M' },
  'Secular Humanism': { adherents: 500, label: '~500M' },
  'African Diaspora': { adherents: 100, label: '~100M' },
  'Paganism & Wicca': { adherents: 3, label: '~3M' },
  'Rastafari': { adherents: 1, label: '~1M' },
  'Druze': { adherents: 1.5, label: '~1.5M' },
  'Unitarian Universalism': { adherents: 0.8, label: '~800K' },
};

const REGION_ESTIMATES: Record<string, RegionData[]> = {
  'Christianity': [
    { region: 'Americas', value: 37 }, { region: 'Europe', value: 25 },
    { region: 'Sub-Saharan Africa', value: 24 }, { region: 'Asia-Pacific', value: 13 },
    { region: 'Middle East & N. Africa', value: 1 },
  ],
  'Islam': [
    { region: 'Asia-Pacific', value: 62 }, { region: 'Middle East & N. Africa', value: 20 },
    { region: 'Sub-Saharan Africa', value: 16 }, { region: 'Europe', value: 2 },
  ],
  'Hinduism': [
    { region: 'Asia-Pacific', value: 99 }, { region: 'Other', value: 1 },
  ],
  'Buddhism': [
    { region: 'Asia-Pacific', value: 98 }, { region: 'Other', value: 2 },
  ],
  'Judaism': [
    { region: 'Americas', value: 44 }, { region: 'Middle East & N. Africa', value: 44 },
    { region: 'Europe', value: 11 }, { region: 'Other', value: 1 },
  ],
};

const RADAR_ATTRIBUTES: Record<string, Record<string, number>> = {
  'Christianity': { 'Monotheism': 10, 'Afterlife emphasis': 9, 'Ritual complexity': 7, 'Hierarchical structure': 8, 'Scriptural authority': 9, 'Mystical tradition': 6 },
  'Islam': { 'Monotheism': 10, 'Afterlife emphasis': 10, 'Ritual complexity': 8, 'Hierarchical structure': 5, 'Scriptural authority': 10, 'Mystical tradition': 7 },
  'Hinduism': { 'Monotheism': 5, 'Afterlife emphasis': 8, 'Ritual complexity': 9, 'Hierarchical structure': 6, 'Scriptural authority': 7, 'Mystical tradition': 10 },
  'Buddhism': { 'Monotheism': 1, 'Afterlife emphasis': 7, 'Ritual complexity': 6, 'Hierarchical structure': 5, 'Scriptural authority': 6, 'Mystical tradition': 10 },
  'Judaism': { 'Monotheism': 10, 'Afterlife emphasis': 5, 'Ritual complexity': 9, 'Hierarchical structure': 4, 'Scriptural authority': 10, 'Mystical tradition': 7 },
  'Sikhism': { 'Monotheism': 10, 'Afterlife emphasis': 7, 'Ritual complexity': 5, 'Hierarchical structure': 4, 'Scriptural authority': 9, 'Mystical tradition': 8 },
  'Secular Humanism': { 'Monotheism': 0, 'Afterlife emphasis': 0, 'Ritual complexity': 1, 'Hierarchical structure': 2, 'Scriptural authority': 1, 'Mystical tradition': 0 },
};

interface CompareChartsProps {
  names: string[];
}

export function CompareCharts({ names }: CompareChartsProps) {
  const adherentData: AdherentData[] = names
    .map((name) => ({
      name: name.length > 15 ? name.slice(0, 13) + '…' : name,
      adherents: ADHERENT_ESTIMATES[name]?.adherents ?? 0,
      label: ADHERENT_ESTIMATES[name]?.label ?? 'N/A',
    }));

  const hasRegionData = names.some((n) => REGION_ESTIMATES[n]);
  const hasRadarData = names.some((n) => RADAR_ATTRIBUTES[n]);

  const radarData: RadarData[] = hasRadarData
    ? ['Monotheism', 'Afterlife emphasis', 'Ritual complexity', 'Hierarchical structure', 'Scriptural authority', 'Mystical tradition'].map((axis) => {
        const point: RadarData = { axis };
        names.forEach((name) => {
          point[name] = RADAR_ATTRIBUTES[name]?.[axis] ?? 5;
        });
        return point;
      })
    : [];

  return (
    <div className="space-y-8">
      {/* Chart 1: Adherent Population */}
      <Reveal>
        <Card>
          <CardContent className="pt-6">
          <h3 className="text-xl font-bold mb-1">Adherent Population</h3>
          <p className="text-xs text-muted-foreground mb-4">Approximate global adherents (millions). Source: Pew Research Center, World Religion Database [1][4].</p>
          <div className="overflow-x-auto">
            <div className="h-64 min-w-[560px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={adherentData} layout="vertical" margin={{ left: 10, right: 30 }}>
                  <XAxis type="number" tick={{ fontSize: 12 }} />
                  <YAxis type="category" dataKey="name" width={120} tick={{ fontSize: 12 }} />
                  <Tooltip
                    formatter={(value: number) => [`${value}M`, 'Adherents']}
                    contentStyle={{ borderRadius: '0.5rem', border: '1px solid hsl(30, 18%, 87%)' }}
                  />
                  <Bar dataKey="adherents" radius={[0, 4, 4, 0]}>
                    {adherentData.map((_, i) => (
                      <Cell key={i} fill={EARTH_COLORS[i % EARTH_COLORS.length]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
          </CardContent>
        </Card>
      </Reveal>

      {/* Chart 2: Geographic Distribution */}
      {hasRegionData && (
        <Reveal delayMs={80}>
          <Card>
            <CardContent className="pt-6">
            <h3 className="text-xl font-bold mb-1">Geographic Distribution</h3>
            <p className="text-xs text-muted-foreground mb-4">Regional share of adherents (%). Source: Pew Research Center [1].</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {names.map((name) => {
                const regions = REGION_ESTIMATES[name];
                if (!regions) return null;
                return (
                  <div key={name} className="text-center">
                    <p className="text-sm font-semibold mb-2">{name}</p>
                    <div className="h-48">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={regions}
                            dataKey="value"
                            nameKey="region"
                            cx="50%"
                            cy="50%"
                            outerRadius={70}
                            innerRadius={35}
                            label={({ region, value }) => `${region} ${value}%`}
                            labelLine={false}
                            fontSize={9}
                          >
                            {regions.map((entry) => (
                              <Cell key={entry.region} fill={REGION_COLORS[entry.region] || EARTH_COLORS[0]} />
                            ))}
                          </Pie>
                          <Tooltip formatter={(value: number) => [`${value}%`, 'Share']} />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                );
              })}
            </div>
            </CardContent>
          </Card>
        </Reveal>
      )}

      {/* Chart 3: Belief Comparison Radar */}
      {hasRadarData && (
        <Reveal delayMs={140}>
          <Card>
            <CardContent className="pt-6">
            <h3 className="text-xl font-bold mb-1">Belief Comparison</h3>
            <p className="text-xs text-muted-foreground mb-2">Simplified educational visualization, actual beliefs are far more nuanced. See Differences Explained for detail.</p>
            <p className="text-xs text-muted-foreground italic mb-4">Scale: 0 (not applicable) to 10 (central emphasis). Based on scholarly consensus [1][2][3].</p>
            <div className="overflow-x-auto">
              <div className="h-80 min-w-[560px]">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart data={radarData}>
                    <PolarGrid stroke="hsl(30, 18%, 87%)" />
                    <PolarAngleAxis dataKey="axis" tick={{ fontSize: 11 }} />
                    <PolarRadiusAxis angle={30} domain={[0, 10]} tick={{ fontSize: 10 }} />
                    {names.map((name, i) => (
                      <Radar
                        key={name}
                        name={name}
                        dataKey={name}
                        stroke={EARTH_COLORS[i % EARTH_COLORS.length]}
                        fill={EARTH_COLORS[i % EARTH_COLORS.length]}
                        fillOpacity={0.15}
                      />
                    ))}
                    <Legend wrapperStyle={{ fontSize: 12 }} />
                    <Tooltip />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </div>
            </CardContent>
          </Card>
        </Reveal>
      )}
    </div>
  );
}
