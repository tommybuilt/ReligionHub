import Link from 'next/link';
import type { Metadata } from 'next';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ChevronRight, Brain, Compass, Sparkles, Shapes, MapPin, Clock, BarChart3, Scale } from 'lucide-react';
import { generateBreadcrumbJsonLd, generateMetadata as genMeta } from '@/lib/seo';

/* SOURCE LOG: /quiz */
/* Last updated: 2026-02-15 (attribution pass) */
/* References consulted for fact verification (no text copied):
   - Encyclopaedia Britannica religion portal
   - Pew Research Center religion reports
   - Oxford Reference comparative religion resources
   - Quiz item source lists used in /quiz/knowledge, /quiz/alignment, /quiz/traditions, /quiz/symbols
*/
/* ALL VISIBLE TEXT IS ORIGINAL. */

 export async function generateMetadata({
   params,
 }: {
   params: Promise<Record<string, never>>;
 }): Promise<Metadata> {
   return genMeta({
     title: 'Quizzes',
     description:
       'Eight citation-backed quizzes covering knowledge, alignment, traditions, symbols, sacred places, history, demographics, and ethics.',
     path: '/quiz',
     type: 'website',
   });
 }

export default function QuizPage() {
  const breadcrumbJsonLd = generateBreadcrumbJsonLd([
    { name: 'Home', url: '/' },
    { name: 'Quizzes', url: '/quiz' },
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
            <li className="text-foreground font-medium" aria-current="page">Quizzes</li>
          </ol>
        </nav>

        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Quizzes</h1>
          <p className="text-muted-foreground max-w-2xl">
            Test your knowledge of world religions or discover which beliefs align with yours. All questions are based on carefully sourced facts.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* What Religion Am I? Quiz, Featured */}
          <Card className="border-2 border-primary/30 hover:border-primary/50 transition-colors md:col-span-2">
            <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Compass className="h-5 w-5 text-primary" aria-hidden="true" />
                </div>
                <Badge>Featured</Badge>
              </div>
              <CardTitle className="text-xl">What Religion Am I?</CardTitle>
              <CardDescription className="leading-relaxed">
                Answer 25 thought-provoking questions about your beliefs, values, and worldview to discover which world religions resonate most with your answers. Educational, not prescriptive.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                <span>25 questions</span>
                <span>~10 minutes</span>
              </div>
              <Button className="w-full" asChild>
                <Link href="/quiz/what-religion-am-i">Take the Quiz</Link>
              </Button>
            </CardContent>
          </Card>

          {/* Knowledge Quiz */}
          <Card className="border-2 hover:border-primary/30 transition-colors">
            <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Brain className="h-5 w-5 text-primary" aria-hidden="true" />
                </div>
                <Badge>Knowledge</Badge>
              </div>
              <CardTitle className="text-xl">World Religions Knowledge Quiz</CardTitle>
              <CardDescription className="leading-relaxed">
                How much do you know about the world&apos;s major religions? Test your knowledge with questions about beliefs, practices, history, and sacred texts.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                <span>20 questions</span>
                <span>~15 minutes</span>
              </div>
              <Button className="w-full" asChild>
                <Link href="/quiz/knowledge">Start Quiz</Link>
              </Button>
            </CardContent>
          </Card>

          {/* Alignment Quiz */}
          <Card className="border-2 hover:border-primary/30 transition-colors">
            <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Compass className="h-5 w-5 text-primary" aria-hidden="true" />
                </div>
                <Badge variant="secondary">Alignment</Badge>
              </div>
              <CardTitle className="text-xl">Belief Alignment Explorer</CardTitle>
              <CardDescription className="leading-relaxed">
                Curious which religions share your values? Answer questions about ethics, spirituality, and worldview to see which traditions align with your beliefs.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                <span>8 questions</span>
                <span>~8 minutes</span>
              </div>
              <Button className="w-full" variant="outline" asChild>
                <Link href="/quiz/alignment">Explore Alignment</Link>
              </Button>
            </CardContent>
          </Card>
          {/* Traditions Quiz */}
          <Card className="border-2 hover:border-primary/30 transition-colors">
            <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Sparkles className="h-5 w-5 text-primary" aria-hidden="true" />
                </div>
                <Badge variant="outline">Traditions</Badge>
              </div>
              <CardTitle className="text-xl">Traditions &amp; Practices Quiz</CardTitle>
              <CardDescription className="leading-relaxed">
                How well do you know religious festivals, rituals, and daily practices from around the world?
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                <span>20 questions</span>
                <span>~15 minutes</span>
              </div>
              <Button className="w-full" variant="outline" asChild>
                <Link href="/quiz/traditions">Start Quiz</Link>
              </Button>
            </CardContent>
          </Card>

          {/* Symbols Quiz */}
          <Card className="border-2 hover:border-primary/30 transition-colors">
            <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Shapes className="h-5 w-5 text-primary" aria-hidden="true" />
                </div>
                <Badge variant="outline">Symbols</Badge>
              </div>
              <CardTitle className="text-xl">Religious Symbols &amp; Icons Quiz</CardTitle>
              <CardDescription className="leading-relaxed">
                Can you match sacred symbols to their traditions? Test your knowledge of crosses, crescents, wheels, and more.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                <span>20 questions</span>
                <span>~15 minutes</span>
              </div>
              <Button className="w-full" variant="outline" asChild>
                <Link href="/quiz/symbols">Start Quiz</Link>
              </Button>
            </CardContent>
          </Card>

          {/* Sacred Places Quiz */}
          <Card className="border-2 hover:border-primary/30 transition-colors">
            <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <MapPin className="h-5 w-5 text-primary" aria-hidden="true" />
                </div>
                <Badge variant="outline">Sacred Places</Badge>
              </div>
              <CardTitle className="text-xl">Sacred Places Quiz</CardTitle>
              <CardDescription className="leading-relaxed">
                How well do you know the world&apos;s most important sacred sites, temples, and pilgrimage destinations?
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                <span>15 questions</span>
                <span>~12 minutes</span>
              </div>
              <Button className="w-full" variant="outline" asChild>
                <Link href="/quiz/sacred-places">Start Quiz</Link>
              </Button>
            </CardContent>
          </Card>

          {/* History Quiz */}
          <Card className="border-2 hover:border-primary/30 transition-colors">
            <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Clock className="h-5 w-5 text-primary" aria-hidden="true" />
                </div>
                <Badge variant="outline">History</Badge>
              </div>
              <CardTitle className="text-xl">History &amp; Origins Quiz</CardTitle>
              <CardDescription className="leading-relaxed">
                Test your knowledge of the key events, founders, and turning points in the history of world religions.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                <span>15 questions</span>
                <span>~12 minutes</span>
              </div>
              <Button className="w-full" variant="outline" asChild>
                <Link href="/quiz/history">Start Quiz</Link>
              </Button>
            </CardContent>
          </Card>

          {/* Demographics Quiz */}
          <Card className="border-2 hover:border-primary/30 transition-colors">
            <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <BarChart3 className="h-5 w-5 text-primary" aria-hidden="true" />
                </div>
                <Badge variant="outline">Demographics</Badge>
              </div>
              <CardTitle className="text-xl">Religion Demographics Quiz</CardTitle>
              <CardDescription className="leading-relaxed">
                How well do you know the numbers behind world religions? Populations, growth trends, and geographic distribution.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                <span>15 questions</span>
                <span>~12 minutes</span>
              </div>
              <Button className="w-full" variant="outline" asChild>
                <Link href="/quiz/demographics">Start Quiz</Link>
              </Button>
            </CardContent>
          </Card>

          {/* Ethics Quiz */}
          <Card className="border-2 hover:border-primary/30 transition-colors">
            <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Scale className="h-5 w-5 text-primary" aria-hidden="true" />
                </div>
                <Badge variant="outline">Ethics</Badge>
              </div>
              <CardTitle className="text-xl">Ethics &amp; Philosophy Quiz</CardTitle>
              <CardDescription className="leading-relaxed">
                Explore the moral teachings, ethical principles, and philosophical foundations of world religions.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                <span>15 questions</span>
                <span>~12 minutes</span>
              </div>
              <Button className="w-full" variant="outline" asChild>
                <Link href="/quiz/ethics">Start Quiz</Link>
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="mt-8 p-4 bg-muted/30 rounded-lg text-sm text-muted-foreground">
          <p>
            <strong>Disclaimer:</strong> These quizzes are for educational and entertainment purposes only.
            The alignment quiz does not constitute religious advice. Beliefs are complex and personal;
            no quiz can fully capture the depth of any religious tradition.
          </p>
        </div>

        <section className="mt-8 rounded-xl border bg-muted/30 p-5" aria-labelledby="quiz-sources-heading">
          <h2 id="quiz-sources-heading" className="text-xl font-semibold mb-3">Sources &amp; Further Reading</h2>
          <ol className="space-y-2 text-sm text-muted-foreground list-decimal pl-5">
            <li>
              Encyclopaedia Britannica, religion reference portal.
              <a href="https://www.britannica.com/topic/religion" target="_blank" rel="noreferrer" className="underline hover:text-foreground ml-1">
                https://www.britannica.com/topic/religion
              </a>
            </li>
            <li>
              Pew Research Center, religion reports and datasets.
              <a href="https://www.pewresearch.org/religion/" target="_blank" rel="noreferrer" className="underline hover:text-foreground ml-1">
                https://www.pewresearch.org/religion/
              </a>
            </li>
            <li>
              Oxford Reference, comparative religion topics.
              <a href="https://www.oxfordreference.com/" target="_blank" rel="noreferrer" className="underline hover:text-foreground ml-1">
                https://www.oxfordreference.com/
              </a>
            </li>
            <li>
              ReligionCompare quiz item bank (knowledge, alignment, traditions, and symbols question sets).
            </li>
            <li>
              World Religion Database, contextual demographic reference.
              <a href="https://www.worldreligiondatabase.org/" target="_blank" rel="noreferrer" className="underline hover:text-foreground ml-1">
                https://www.worldreligiondatabase.org/
              </a>
            </li>
          </ol>
        </section>
      </div>
    </>
  );
}
