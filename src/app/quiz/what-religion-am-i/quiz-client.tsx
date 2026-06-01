'use client';

import React, { useState, useCallback } from 'react';
import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ChevronRight, ChevronLeft, RotateCcw, Share2, Link2, Check, ExternalLink } from 'lucide-react';
import { siteConfig } from '@/lib/config';
import { WHAT_RELIGION_QUESTIONS, RELIGION_RESULTS } from './questions';

export function WhatReligionQuiz() {
  const [currentIndex, setCurrentIndex] = useState(-1); // -1 = intro screen
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [showResult, setShowResult] = useState(false);
  const [copied, setCopied] = useState(false);

  const questions = WHAT_RELIGION_QUESTIONS;
  const currentQuestion = currentIndex >= 0 ? questions[currentIndex] : null;
  const isAnswered = currentQuestion ? answers[currentQuestion.id] !== undefined : false;
  const progress = currentIndex >= 0 ? ((currentIndex + 1) / questions.length) * 100 : 0;

  const selectAnswer = useCallback((questionId: string, value: string) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
  }, []);

  const next = useCallback(() => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((i) => i + 1);
    }
  }, [currentIndex, questions.length]);

  const prev = useCallback(() => {
    if (currentIndex > 0) {
      setCurrentIndex((i) => i - 1);
    }
  }, [currentIndex]);

  const start = useCallback(() => {
    setCurrentIndex(0);
  }, []);

  const computeResults = useCallback(() => {
    const religionScores: Record<string, number> = {};
    for (const q of questions) {
      const selectedValue = answers[q.id];
      if (selectedValue && q.weights && q.weights[selectedValue]) {
        for (const [religion, weight] of Object.entries(q.weights[selectedValue])) {
          religionScores[religion] = (religionScores[religion] || 0) + weight;
        }
      }
    }
    const maxScore = Math.max(...Object.values(religionScores), 1);
    return Object.entries(religionScores)
      .map(([religion, score]) => ({
        religion,
        score,
        percentage: Math.round((score / maxScore) * 100),
        ...RELIGION_RESULTS[religion],
      }))
      .sort((a, b) => b.score - a.score);
  }, [questions, answers]);

  const finish = useCallback(() => {
    setShowResult(true);
  }, []);

  const restart = useCallback(() => {
    setCurrentIndex(-1);
    setAnswers({});
    setShowResult(false);
    setCopied(false);
  }, []);

  const shareUrl = `${siteConfig.url}/quiz/what-religion-am-i`;

  async function copyUrl() {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // silent
    }
  }

  // Intro screen
  if (currentIndex === -1 && !showResult) {
    return (
      <Card className="max-w-2xl mx-auto">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
            <span className="text-3xl" role="img" aria-label="Thinking">🤔</span>
          </div>
          <CardTitle className="text-2xl md:text-3xl">What Religion Am I?</CardTitle>
          <CardDescription className="text-base leading-relaxed mt-2 max-w-lg mx-auto">
            Answer 25 thought-provoking questions about your beliefs, values, and worldview. Your responses will be matched
            against 10 major world religions and philosophical traditions to show you which ones resonate most with your answers.
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          <div className="flex flex-wrap justify-center gap-3 text-sm text-muted-foreground">
            <span className="flex items-center gap-1">📝 25 questions</span>
            <span className="flex items-center gap-1">⏱️ ~10 minutes</span>
            <span className="flex items-center gap-1">📊 Instant results</span>
          </div>
          <div className="text-xs text-muted-foreground max-w-md mx-auto">
            This quiz is educational, it reflects how your values overlap with various traditions, not a diagnosis of what you &quot;should&quot; believe.
          </div>
        </CardContent>
        <CardFooter className="justify-center">
          <Button onClick={start} size="lg" className="gap-2">
            Start the Quiz
            <ChevronRight className="h-4 w-4" aria-hidden="true" />
          </Button>
        </CardFooter>
      </Card>
    );
  }

  // Results screen
  if (showResult) {
    const results = computeResults();
    const topResult = results[0];
    const topReligionInfo = topResult ? RELIGION_RESULTS[topResult.religion] : null;

    return (
      <div className="max-w-2xl mx-auto space-y-6">
        <Card>
          <CardHeader className="text-center">
            <div className="mx-auto mb-3 h-14 w-14 rounded-full bg-primary/10 flex items-center justify-center">
              <span className="text-2xl" role="img" aria-label="Star">⭐</span>
            </div>
            <CardTitle className="text-2xl">Your Results</CardTitle>
            <CardDescription className="break-words">Based on your 25 answers, here are the traditions that most align with your values and worldview.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Top result highlight */}
            {topResult && topReligionInfo && (
              <div className="p-5 rounded-xl border-2 border-primary/30 bg-primary/5">
                <div className="mb-2 flex flex-wrap items-center gap-2">
                  <Badge className="text-xs">Top Match</Badge>
                  <span className="text-sm text-muted-foreground">{topResult.percentage}% alignment</span>
                </div>
                <h3 className="mb-2 break-words text-xl font-bold">{topReligionInfo.name}</h3>
                <p className="break-words text-sm text-muted-foreground leading-relaxed">{topReligionInfo.summary}</p>
                {topReligionInfo.slug !== 'secular-humanism' && (
                  <Link
                    href={`/religions/${topReligionInfo.slug}`}
                    className="mt-3 inline-flex items-center gap-1 break-words text-sm font-medium text-primary hover:underline"
                  >
                    Learn more about {topReligionInfo.name}
                    <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                  </Link>
                )}
              </div>
            )}

            {/* Full rankings */}
            <div className="space-y-3">
              <h4 className="text-sm font-semibold text-muted-foreground">Full Rankings</h4>
              {results.slice(0, 8).map((item, i) => {
                const info = RELIGION_RESULTS[item.religion];
                return (
                  <div key={item.religion} className="flex items-center gap-3">
                    <span className="text-sm font-medium w-6 text-right text-muted-foreground">#{i + 1}</span>
                    <div className="flex-1 min-w-0">
                      <div className="mb-1 flex items-start justify-between gap-2">
                        <span className="min-w-0 break-words text-sm font-medium">{info?.name || item.religion}</span>
                        <span className="text-sm text-muted-foreground ml-2">{item.percentage}%</span>
                      </div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all duration-700 ${i === 0 ? 'bg-primary' : 'bg-primary/60'}`}
                          style={{ width: `${item.percentage}%` }}
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:justify-center">
            <Button onClick={restart} variant="outline" className="w-full gap-2 sm:w-auto">
              <RotateCcw className="h-4 w-4" aria-hidden="true" />
              Take Again
            </Button>
            <Button onClick={copyUrl} variant="outline" className="w-full gap-2 sm:w-auto">
              {copied ? <Check className="h-4 w-4 text-green-600" /> : <Link2 className="h-4 w-4" />}
              {copied ? 'Copied!' : 'Copy Link'}
            </Button>
            <a
              href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent('I just took the "What Religion Am I?" quiz on ReligionCompare!')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto"
            >
              <Button variant="outline" className="w-full gap-2 sm:w-auto">
                <Share2 className="h-4 w-4" aria-hidden="true" />
                Share on X
              </Button>
            </a>
          </CardFooter>
        </Card>

        {/* Explore traditions */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Explore Your Top Matches</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {results.slice(0, 6).map((item) => {
                const info = RELIGION_RESULTS[item.religion];
                if (!info || info.slug === 'secular-humanism') return null;
                return (
                  <Link
                    key={item.religion}
                    href={`/religions/${info.slug}`}
                    className="px-3 py-2 rounded-lg border text-sm font-medium text-center hover:bg-muted/50 hover:border-primary/30 transition-all"
                  >
                    {info.name}
                  </Link>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Question screen
  if (!currentQuestion) return null;

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <div className="mb-2 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <Badge className="text-xs">Question {currentIndex + 1} of {questions.length}</Badge>
          <span className="text-xs text-muted-foreground">{Math.round(progress)}% complete</span>
        </div>
        <div className="h-1.5 bg-muted rounded-full overflow-hidden mb-4">
          <div
            className="h-full bg-primary rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
        <CardTitle className="text-lg leading-relaxed">{currentQuestion.question}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2" role="radiogroup" aria-label={`Question ${currentIndex + 1}`}>
          {currentQuestion.options.map((opt) => {
            const isSelected = answers[currentQuestion.id] === opt.value;
            return (
              <button
                key={opt.value}
                onClick={() => selectAnswer(currentQuestion.id, opt.value)}
                className={`w-full break-words text-left p-3 rounded-lg border text-sm transition-all duration-200 ${
                  isSelected
                    ? 'border-primary bg-primary/10 text-primary font-medium'
                    : 'border-border hover:border-primary/50 hover:bg-muted/50'
                }`}
                role="radio"
                aria-checked={isSelected}
              >
                {opt.label}
              </button>
            );
          })}
        </div>
        {isAnswered && (
          <div className="mt-3">
            <p className="text-sm text-muted-foreground italic">Your selection has been recorded.</p>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-between">
        <Button variant="outline" onClick={prev} disabled={currentIndex === 0} className="gap-1">
          <ChevronLeft className="h-4 w-4" aria-hidden="true" />
          Previous
        </Button>
        {currentIndex < questions.length - 1 ? (
          <Button onClick={next} disabled={!isAnswered} className="gap-1">
            Next
            <ChevronRight className="h-4 w-4" aria-hidden="true" />
          </Button>
        ) : (
          <Button onClick={finish} disabled={!isAnswered}>
            See My Results
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
