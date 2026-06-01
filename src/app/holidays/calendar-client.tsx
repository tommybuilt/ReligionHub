'use client';

import React, { useState, useMemo } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { List, Grid3X3, CalendarDays, Download, ChevronDown, ChevronUp } from 'lucide-react';
import { HOLIDAYS_2026, TRADITIONS, MONTHS } from './data';
import type { ReligiousHoliday } from './data';

const TRADITION_COLORS: Record<string, string> = {
  'Christianity': 'bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300',
  'Islam': 'bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-300',
  'Judaism': 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/40 dark:text-indigo-300',
  'Hinduism': 'bg-orange-100 text-orange-800 dark:bg-orange-900/40 dark:text-orange-300',
  'Buddhism': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/40 dark:text-yellow-300',
  'Sikhism': 'bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300',
  "Bahá'í": 'bg-purple-100 text-purple-800 dark:bg-purple-900/40 dark:text-purple-300',
  'Jainism': 'bg-red-100 text-red-800 dark:bg-red-900/40 dark:text-red-300',
  'Shinto': 'bg-pink-100 text-pink-800 dark:bg-pink-900/40 dark:text-pink-300',
  'Zoroastrianism': 'bg-teal-100 text-teal-800 dark:bg-teal-900/40 dark:text-teal-300',
};

type ViewMode = 'list' | 'grid' | 'timeline';

export function HolidaysCalendar() {
  const [view, setView] = useState<ViewMode>('list');
  const [selectedTraditions, setSelectedTraditions] = useState<Set<string>>(new Set());
  const [expandedMonth, setExpandedMonth] = useState<number | null>(null);

  const filtered = useMemo(() => {
    if (selectedTraditions.size === 0) return HOLIDAYS_2026;
    return HOLIDAYS_2026.filter((h) => selectedTraditions.has(h.tradition));
  }, [selectedTraditions]);

  const byMonth = useMemo(() => {
    const groups: Record<number, ReligiousHoliday[]> = {};
    for (const h of filtered) {
      const month = new Date(h.date).getMonth();
      if (!groups[month]) groups[month] = [];
      groups[month].push(h);
    }
    return groups;
  }, [filtered]);

  function toggleTradition(t: string) {
    setSelectedTraditions((prev) => {
      const next = new Set(prev);
      if (next.has(t)) next.delete(t);
      else next.add(t);
      return next;
    });
  }

  function clearFilters() {
    setSelectedTraditions(new Set());
  }

  function generateIcs(holiday: ReligiousHoliday): string {
    const dtStart = holiday.date.replace(/-/g, '');
    const dtEnd = holiday.endDate
      ? holiday.endDate.replace(/-/g, '')
      : incrementDate(holiday.date).replace(/-/g, '');
    return [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//ReligionCompare//Holidays//EN',
      'BEGIN:VEVENT',
      `DTSTART;VALUE=DATE:${dtStart}`,
      `DTEND;VALUE=DATE:${dtEnd}`,
      `SUMMARY:${holiday.name}`,
      `DESCRIPTION:${holiday.description.replace(/,/g, '\\,')}`,
      `CATEGORIES:${holiday.tradition}`,
      'END:VEVENT',
      'END:VCALENDAR',
    ].join('\r\n');
  }

  function downloadIcs(holiday: ReligiousHoliday) {
    const ics = generateIcs(holiday);
    const blob = new Blob([ics], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${holiday.id}.ics`;
    a.click();
    URL.revokeObjectURL(url);
  }

  function downloadAll() {
    const events = filtered.map((h) => {
      const dtStart = h.date.replace(/-/g, '');
      const dtEnd = h.endDate
        ? h.endDate.replace(/-/g, '')
        : incrementDate(h.date).replace(/-/g, '');
      return [
        'BEGIN:VEVENT',
        `DTSTART;VALUE=DATE:${dtStart}`,
        `DTEND;VALUE=DATE:${dtEnd}`,
        `SUMMARY:${h.name}`,
        `DESCRIPTION:${h.description.replace(/,/g, '\\,')}`,
        `CATEGORIES:${h.tradition}`,
        'END:VEVENT',
      ].join('\r\n');
    });
    const ics = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//ReligionCompare//Holidays//EN',
      ...events,
      'END:VCALENDAR',
    ].join('\r\n');
    const blob = new Blob([ics], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'religious-holidays-2026.ics';
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div>
      {/* Tradition Filters */}
      <div className="flex flex-wrap gap-2 mb-4" role="group" aria-label="Filter by tradition">
        <button
          onClick={clearFilters}
          className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
            selectedTraditions.size === 0
              ? 'bg-primary text-primary-foreground'
              : 'bg-muted text-muted-foreground hover:bg-muted/80'
          }`}
        >
          All Traditions
        </button>
        {TRADITIONS.map((t) => (
          <button
            key={t}
            onClick={() => toggleTradition(t)}
            className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
              selectedTraditions.has(t)
                ? 'bg-primary text-primary-foreground'
                : 'bg-muted text-muted-foreground hover:bg-muted/80'
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {/* View Toggles + Download */}
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap gap-1 rounded-lg border p-0.5">
          <button
            onClick={() => setView('list')}
            className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors flex items-center gap-1.5 ${
              view === 'list' ? 'bg-primary text-primary-foreground' : 'hover:bg-muted'
            }`}
            aria-label="List view"
          >
            <List className="h-4 w-4" /> List
          </button>
          <button
            onClick={() => setView('grid')}
            className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors flex items-center gap-1.5 ${
              view === 'grid' ? 'bg-primary text-primary-foreground' : 'hover:bg-muted'
            }`}
            aria-label="Grid view"
          >
            <Grid3X3 className="h-4 w-4" /> Month
          </button>
          <button
            onClick={() => setView('timeline')}
            className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors flex items-center gap-1.5 ${
              view === 'timeline' ? 'bg-primary text-primary-foreground' : 'hover:bg-muted'
            }`}
            aria-label="Timeline view"
          >
            <CalendarDays className="h-4 w-4" /> Timeline
          </button>
        </div>
        <Button variant="outline" size="sm" onClick={downloadAll} className="gap-1.5 self-start sm:self-auto">
          <Download className="h-4 w-4" /> Download All (.ics)
        </Button>
      </div>

      <p className="text-sm text-muted-foreground mb-4">{filtered.length} holidays shown</p>

      {/* LIST VIEW */}
      {view === 'list' && (
        <div className="space-y-3">
          {filtered.map((h) => (
            <HolidayCard key={h.id} holiday={h} onDownload={downloadIcs} />
          ))}
        </div>
      )}

      {/* GRID / MONTH VIEW */}
      {view === 'grid' && (
        <div className="space-y-4">
          {MONTHS.map((monthName, idx) => {
            const holidays = byMonth[idx];
            if (!holidays || holidays.length === 0) return null;
            const isExpanded = expandedMonth === null || expandedMonth === idx;
            return (
              <div key={idx} className="border rounded-lg overflow-hidden">
                <button
                  onClick={() => setExpandedMonth(expandedMonth === idx ? null : idx)}
                  className="w-full flex items-center justify-between p-4 bg-muted/30 hover:bg-muted/50 transition-colors"
                >
                  <h3 className="font-semibold text-lg">{monthName} 2026</h3>
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary" className="text-xs">{holidays.length} holiday{holidays.length !== 1 ? 's' : ''}</Badge>
                    {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                  </div>
                </button>
                {isExpanded && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 p-4">
                    {holidays.map((h) => (
                      <HolidayCard key={h.id} holiday={h} compact onDownload={downloadIcs} />
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* TIMELINE VIEW */}
      {view === 'timeline' && (
        <div className="relative pl-6 border-l-2 border-border space-y-6">
          {filtered.map((h) => {
            const colorClass = TRADITION_COLORS[h.tradition] || 'bg-muted text-muted-foreground';
            return (
              <div key={h.id} className="relative">
                <div className="absolute -left-[25px] top-1 h-3 w-3 rounded-full border-2 border-background bg-primary" />
                <div className="flex flex-col sm:flex-row sm:items-start gap-2">
                  <div className="text-sm font-medium text-muted-foreground sm:w-40 sm:shrink-0">
                    {h.displayDate}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h4 className="font-semibold text-sm">{h.name}</h4>
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${colorClass}`}>
                        {h.tradition}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1 leading-relaxed">{h.description}</p>
                    <button
                      onClick={() => downloadIcs(h)}
                      className="text-xs text-primary hover:underline mt-1 inline-flex items-center gap-1"
                    >
                      <Download className="h-3 w-3" /> Add to calendar
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {filtered.length === 0 && (
        <p className="text-muted-foreground text-center py-12">No holidays found for the selected traditions.</p>
      )}

      {/* Sources */}
      <section className="mt-10 pt-6 border-t" aria-labelledby="holiday-sources-heading">
        <h2 id="holiday-sources-heading" className="text-lg font-semibold mb-3">Sources</h2>
        <p className="text-sm text-muted-foreground">
          Holiday dates sourced from Encyclopaedia Britannica, timeanddate.com, and official religious organization calendars.
          Islamic dates are approximate and may vary by 1–2 days depending on moon sighting in your region.
        </p>
      </section>
    </div>
  );
}

function HolidayCard({
  holiday,
  compact,
  onDownload,
}: {
  holiday: ReligiousHoliday;
  compact?: boolean;
  onDownload: (h: ReligiousHoliday) => void;
}) {
  const colorClass = TRADITION_COLORS[holiday.tradition] || 'bg-muted text-muted-foreground';
  return (
    <Card className={compact ? 'h-full' : ''}>
      <CardContent className={compact ? 'p-4' : 'p-4 flex flex-col gap-3 sm:flex-row sm:items-start'}>
        {!compact && (
          <div className="text-sm font-medium text-muted-foreground sm:w-36 sm:shrink-0">
            {holiday.displayDate}
          </div>
        )}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap mb-1">
            <h3 className="font-semibold text-sm">{holiday.name}</h3>
            <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${colorClass}`}>
              {holiday.tradition}
            </span>
          </div>
          {compact && (
            <p className="text-xs text-muted-foreground mb-1">{holiday.displayDate}</p>
          )}
          <p className="text-sm text-muted-foreground leading-relaxed">{holiday.description}</p>
          <button
            onClick={() => onDownload(holiday)}
            className="text-xs text-primary hover:underline mt-2 inline-flex items-center gap-1"
          >
            <Download className="h-3 w-3" /> Add to calendar
          </button>
        </div>
      </CardContent>
    </Card>
  );
}

function incrementDate(isoDate: string): string {
  const d = new Date(isoDate);
  d.setDate(d.getDate() + 1);
  return d.toISOString().split('T')[0];
}
