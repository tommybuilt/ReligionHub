'use client';

import React, { useState, useCallback } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ChevronRight, ChevronLeft, CheckCircle, RotateCcw } from 'lucide-react';
import { stripInlineCitations } from '@/lib/utils';

export interface QuizQuestion {
  id: string;
  question: string;
  options: { label: string; value: string }[];
  correctAnswer?: string; // for knowledge quizzes
  weights?: Record<string, Record<string, number>>; // for alignment quizzes: { optionValue: { religionSlug: weight } }
  explanation?: string;
  citation?: string;
}

interface QuizEngineProps {
  title: string;
  description: string;
  questions: QuizQuestion[];
  type: 'knowledge' | 'alignment';
  onComplete?: (results: QuizResults) => void;
}

export interface QuizResults {
  type: 'knowledge' | 'alignment';
  totalQuestions: number;
  answers: Record<string, string>;
  score?: number; // knowledge quiz
  percentCorrect?: number;
  alignmentScores?: { religion: string; score: number; percentage: number }[];
}

export function QuizEngine({ title, description: _description, questions, type, onComplete }: QuizEngineProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [showResult, setShowResult] = useState(false);
  const [results, setResults] = useState<QuizResults | null>(null);

  const currentQuestion = questions[currentIndex];
  const isAnswered = currentQuestion ? answers[currentQuestion.id] !== undefined : false;
  const progress = ((currentIndex + 1) / questions.length) * 100;

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

  const finish = useCallback(() => {
    let quizResults: QuizResults;

    if (type === 'knowledge') {
      let score = 0;
      for (const q of questions) {
        if (q.correctAnswer && answers[q.id] === q.correctAnswer) score++;
      }
      quizResults = {
        type: 'knowledge',
        totalQuestions: questions.length,
        answers,
        score,
        percentCorrect: Math.round((score / questions.length) * 100),
      };
    } else {
      const religionScores: Record<string, number> = {};
      for (const q of questions) {
        const selectedValue = answers[q.id];
        if (selectedValue && q.weights && q.weights[selectedValue]) {
          for (const [religion, weight] of Object.entries(q.weights[selectedValue])) {
            religionScores[religion] = (religionScores[religion] || 0) + weight;
          }
        }
      }
      const maxPossible = questions.length * 3;
      const alignmentScores = Object.entries(religionScores)
        .map(([religion, score]) => ({
          religion,
          score,
          percentage: Math.round((score / maxPossible) * 100),
        }))
        .sort((a, b) => b.score - a.score);

      quizResults = {
        type: 'alignment',
        totalQuestions: questions.length,
        answers,
        alignmentScores,
      };
    }

    setResults(quizResults);
    setShowResult(true);
    onComplete?.(quizResults);
  }, [type, questions, answers, onComplete]);

  const restart = useCallback(() => {
    setCurrentIndex(0);
    setAnswers({});
    setShowResult(false);
    setResults(null);
  }, []);

  if (showResult && results) {
    return (
      <Card className="max-w-2xl mx-auto">
        <CardHeader className="text-center">
          <div className="mx-auto mb-3">
            <CheckCircle className="h-12 w-12 text-green-500" aria-hidden="true" />
          </div>
          <CardTitle className="text-2xl">Quiz Complete!</CardTitle>
          <CardDescription>{title}</CardDescription>
        </CardHeader>
        <CardContent>
          {results.type === 'knowledge' && (
            <div className="text-center space-y-4">
              <div className="text-5xl font-bold text-primary">{results.percentCorrect}%</div>
              <p className="text-muted-foreground">
                You got {results.score} out of {results.totalQuestions} questions correct.
              </p>
            </div>
          )}
          {results.type === 'alignment' && results.alignmentScores && (
            <div className="space-y-3">
              <p className="text-sm text-muted-foreground text-center mb-4">
                Based on your answers, here are the traditions that most align with your responses:
              </p>
              {results.alignmentScores.slice(0, 5).map((item, i) => (
                <div key={item.religion} className="flex items-center gap-3">
                  <span className="text-sm font-medium w-8 text-right text-muted-foreground">#{i + 1}</span>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium capitalize">{item.religion.replace(/-/g, ' ')}</span>
                      <span className="text-sm text-muted-foreground">{item.percentage}%</span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary rounded-full transition-all duration-500"
                        style={{ width: `${item.percentage}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
        <CardFooter className="justify-center">
          <Button onClick={restart} variant="outline" className="gap-2">
            <RotateCcw className="h-4 w-4" aria-hidden="true" />
            Take Again
          </Button>
        </CardFooter>
      </Card>
    );
  }

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
            const isCorrectOption = type === 'knowledge' && currentQuestion.correctAnswer === opt.value;
            const userAnswered = isAnswered && type === 'knowledge';
            const isWrongSelection = userAnswered && isSelected && !isCorrectOption;
            const showCorrectHighlight = userAnswered && isCorrectOption;

            let className = 'w-full text-left p-3 rounded-lg border text-sm transition-all duration-200 ';
            if (showCorrectHighlight) {
              className += 'border-green-600/40 bg-[#D4EDDA] dark:bg-green-900/30 text-green-900 dark:text-green-200 font-medium';
            } else if (isWrongSelection) {
              className += 'border-red-400/40 bg-[#F8D7DA] dark:bg-red-900/30 text-red-900 dark:text-red-200 font-medium';
            } else if (isSelected && type === 'alignment') {
              className += 'border-primary bg-primary/10 text-primary font-medium';
            } else if (userAnswered) {
              className += 'border-border opacity-60';
            } else {
              className += 'border-border hover:border-primary/50 hover:bg-muted/50';
            }

            return (
              <button
                key={opt.value}
                onClick={() => !isAnswered && selectAnswer(currentQuestion.id, opt.value)}
                className={`${className} break-words`}
                role="radio"
                aria-checked={isSelected}
                disabled={isAnswered && type === 'knowledge'}
              >
                <span className="flex items-center gap-2">
                  {showCorrectHighlight && <span className="text-green-600 dark:text-green-400 font-bold" aria-label="Correct">✓</span>}
                  {isWrongSelection && <span className="text-red-500 dark:text-red-400 font-bold" aria-label="Incorrect">✗</span>}
                  {opt.label}
                </span>
              </button>
            );
          })}
        </div>
        {isAnswered && type === 'knowledge' && currentQuestion.correctAnswer && (
          <div className="mt-3">
            {answers[currentQuestion.id] === currentQuestion.correctAnswer ? (
              <p className="text-sm font-medium text-green-700 dark:text-green-400">Correct!</p>
            ) : (
              <p className="text-sm font-medium text-red-600 dark:text-red-400">Not quite, see the correct answer highlighted above.</p>
            )}
          </div>
        )}
        {isAnswered && type === 'alignment' && (
          <div className="mt-3">
            <p className="text-sm text-muted-foreground italic">Your selection has been recorded. This influences your alignment results.</p>
          </div>
        )}
        {isAnswered && (currentQuestion.explanation || currentQuestion.citation) && (
          <div className="mt-3 rounded-lg border bg-muted/30 p-3 text-xs text-muted-foreground space-y-1">
            {currentQuestion.explanation && (
              <p>
                <strong className="text-foreground">Explanation:</strong> {stripInlineCitations(currentQuestion.explanation)}
              </p>
            )}
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
            Finish Quiz
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
