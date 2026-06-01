import type { QuizQuestion } from '@/components/quiz-engine';

export interface ReligionResult {
  slug: string;
  name: string;
  summary: string;
}

export const RELIGION_RESULTS: Record<string, ReligionResult> = {
  christianity: { slug: 'christianity', name: 'Christianity', summary: 'Your answers suggest a resonance with Christianity, a tradition centered on the life and teachings of Jesus Christ, the concept of grace, and a personal relationship with God.' },
  islam: { slug: 'islam', name: 'Islam', summary: 'Your answers suggest a resonance with Islam, a tradition built on submission to one God (Allah), the prophethood of Muhammad, and a comprehensive ethical framework governing daily life.' },
  hinduism: { slug: 'hinduism', name: 'Hinduism', summary: 'Your answers suggest a resonance with Hinduism, a tradition embracing many paths to the divine, the cycle of rebirth, and the pursuit of liberation (moksha) through knowledge, devotion, or action.' },
  buddhism: { slug: 'buddhism', name: 'Buddhism', summary: 'Your answers suggest a resonance with Buddhism, a tradition focused on understanding suffering, cultivating mindfulness, and achieving liberation through the Middle Way.' },
  judaism: { slug: 'judaism', name: 'Judaism', summary: 'Your answers suggest a resonance with Judaism, a tradition emphasizing covenant with God, ethical living, communal identity, and engagement with sacred text and tradition.' },
  sikhism: { slug: 'sikhism', name: 'Sikhism', summary: 'Your answers suggest a resonance with Sikhism, a tradition that emphasizes one God, radical equality, selfless service, honest living, and remembrance of the divine Name.' },
  taoism: { slug: 'taoism', name: 'Taoism', summary: 'Your answers suggest a resonance with Taoism, a tradition centered on harmony with the Tao (the Way), simplicity, spontaneity, and living in balance with nature.' },
  'unitarian-universalism': { slug: 'unitarian-universalism', name: 'Unitarian Universalism', summary: 'Your answers suggest a resonance with Unitarian Universalism, a non-creedal tradition that draws wisdom from many sources, values individual spiritual seeking, and emphasizes justice and compassion.' },
  'secular-humanism': { slug: 'secular-humanism', name: 'Secular Humanism', summary: 'Your answers suggest a resonance with Secular Humanism, a worldview grounded in reason, ethics, and human values without reliance on supernatural belief.' },
  jainism: { slug: 'jainism', name: 'Jainism', summary: 'Your answers suggest a resonance with Jainism, a tradition devoted to nonviolence (ahimsa), self-discipline, and the purification of the soul through ethical conduct.' },
};

export const WHAT_RELIGION_QUESTIONS: QuizQuestion[] = [
  {
    id: 'wrai-1',
    question: 'Which statement best describes your view of the divine or ultimate reality?',
    options: [
      { label: 'There is one personal God who created and sustains the universe.', value: 'a' },
      { label: 'The divine is present in all things, God and nature are deeply interconnected.', value: 'b' },
      { label: 'The ultimate reality is beyond description, it is an impersonal force or principle.', value: 'c' },
      { label: 'I am uncertain whether God exists, or I find meaning without belief in a deity.', value: 'd' },
    ],
    weights: {
      a: { christianity: 3, islam: 3, judaism: 3, sikhism: 2 },
      b: { hinduism: 3, taoism: 2, sikhism: 1, 'unitarian-universalism': 1 },
      c: { buddhism: 3, taoism: 3, jainism: 2 },
      d: { 'secular-humanism': 3, buddhism: 2, 'unitarian-universalism': 2 },
    },
  },
  {
    id: 'wrai-2',
    question: 'What do you think happens after we die?',
    options: [
      { label: 'We face a judgment and enter heaven, hell, or another state based on our lives.', value: 'a' },
      { label: 'We are reborn in a new life based on our actions (karma) until we achieve liberation.', value: 'b' },
      { label: 'I am not sure, and that uncertainty is okay, the focus should be on this life.', value: 'c' },
      { label: 'The soul merges with the divine or returns to a universal source.', value: 'd' },
    ],
    weights: {
      a: { christianity: 3, islam: 3, judaism: 1 },
      b: { hinduism: 3, buddhism: 3, jainism: 3, sikhism: 2 },
      c: { 'secular-humanism': 3, judaism: 2, 'unitarian-universalism': 2 },
      d: { hinduism: 2, sikhism: 3, taoism: 2 },
    },
  },
  {
    id: 'wrai-3',
    question: 'How do you believe people should determine right from wrong?',
    options: [
      { label: 'Through sacred scripture revealed by God.', value: 'a' },
      { label: 'Through reason, empathy, and human experience.', value: 'b' },
      { label: 'Through a combination of tradition, community wisdom, and personal conscience.', value: 'c' },
      { label: 'By following the principle of causing the least harm to all living beings.', value: 'd' },
    ],
    weights: {
      a: { islam: 3, christianity: 2, judaism: 2 },
      b: { 'secular-humanism': 3, 'unitarian-universalism': 2 },
      c: { judaism: 3, sikhism: 2, hinduism: 2, 'unitarian-universalism': 2 },
      d: { jainism: 3, buddhism: 3 },
    },
  },
  {
    id: 'wrai-4',
    question: 'How important is organized religious community to you?',
    options: [
      { label: 'Very important, regular communal worship and belonging are central to my spiritual life.', value: 'a' },
      { label: 'Somewhat important, community is valuable but I also need personal spiritual space.', value: 'b' },
      { label: 'I prefer a personal, individual spiritual practice over organized religion.', value: 'c' },
      { label: 'Community matters, but it does not need to be religiously defined.', value: 'd' },
    ],
    weights: {
      a: { islam: 3, christianity: 2, sikhism: 3, judaism: 2 },
      b: { hinduism: 2, buddhism: 2, judaism: 2 },
      c: { taoism: 3, buddhism: 2, hinduism: 1 },
      d: { 'secular-humanism': 3, 'unitarian-universalism': 3 },
    },
  },
  {
    id: 'wrai-5',
    question: 'Which best describes your approach to sacred texts or scriptures?',
    options: [
      { label: 'There is one definitive scripture that is the direct word of God.', value: 'a' },
      { label: 'Multiple texts contain wisdom, and no single book has a monopoly on truth.', value: 'b' },
      { label: 'Texts are valuable guides but must be interpreted through reason and experience.', value: 'c' },
      { label: 'I find wisdom in philosophy, science, and literature rather than religious scripture.', value: 'd' },
    ],
    weights: {
      a: { islam: 3, christianity: 2 },
      b: { hinduism: 3, 'unitarian-universalism': 3, sikhism: 2 },
      c: { judaism: 3, buddhism: 2, christianity: 1 },
      d: { 'secular-humanism': 3, taoism: 1 },
    },
  },
  {
    id: 'wrai-6',
    question: 'What role does prayer or meditation play in your ideal spiritual practice?',
    options: [
      { label: 'Prayer is a conversation with a personal God who listens and responds.', value: 'a' },
      { label: 'Meditation is a way to quiet the mind, cultivate awareness, and reduce suffering.', value: 'b' },
      { label: 'Chanting, remembrance, or devotional singing connects me to the divine.', value: 'c' },
      { label: 'I find reflection and contemplation valuable, but I would not call it prayer.', value: 'd' },
    ],
    weights: {
      a: { christianity: 3, islam: 3, judaism: 2 },
      b: { buddhism: 3, taoism: 2, jainism: 2 },
      c: { hinduism: 3, sikhism: 3 },
      d: { 'secular-humanism': 3, 'unitarian-universalism': 2 },
    },
  },
  {
    id: 'wrai-7',
    question: 'How do you view suffering?',
    options: [
      { label: 'Suffering is a test or trial from God that can strengthen faith.', value: 'a' },
      { label: 'Suffering arises from craving and attachment, and can be overcome through practice.', value: 'b' },
      { label: 'Suffering is a result of past actions (karma) and teaches important lessons.', value: 'c' },
      { label: 'Suffering is a natural part of life that we should address through compassion and action.', value: 'd' },
    ],
    weights: {
      a: { christianity: 3, islam: 3 },
      b: { buddhism: 3, taoism: 1 },
      c: { hinduism: 3, jainism: 3, sikhism: 2 },
      d: { 'secular-humanism': 3, 'unitarian-universalism': 2, sikhism: 1 },
    },
  },
  {
    id: 'wrai-8',
    question: 'What is your view on the natural world?',
    options: [
      { label: 'Nature is God\'s creation and humans have a responsibility to be good stewards.', value: 'a' },
      { label: 'Nature is sacred, the divine is present in rivers, mountains, and all living things.', value: 'b' },
      { label: 'Harmony with nature is the highest wisdom; we should flow with its rhythms, not resist them.', value: 'c' },
      { label: 'Nature is valuable and worth protecting based on science and ethics, not supernatural belief.', value: 'd' },
    ],
    weights: {
      a: { christianity: 2, islam: 2, judaism: 2 },
      b: { hinduism: 3, sikhism: 2, jainism: 2 },
      c: { taoism: 3, buddhism: 2 },
      d: { 'secular-humanism': 3, 'unitarian-universalism': 2 },
    },
  },
  {
    id: 'wrai-9',
    question: 'How important is social justice and serving others in your worldview?',
    options: [
      { label: 'Extremely important, faith must be expressed through action for justice and service.', value: 'a' },
      { label: 'Important, compassion for all beings, including animals, is a central value.', value: 'b' },
      { label: 'Important, but inner spiritual development must come first.', value: 'c' },
      { label: 'Central, human rights and dignity are my primary ethical commitments.', value: 'd' },
    ],
    weights: {
      a: { sikhism: 3, christianity: 2, islam: 2 },
      b: { jainism: 3, buddhism: 2, hinduism: 1 },
      c: { hinduism: 2, taoism: 2, buddhism: 2 },
      d: { 'secular-humanism': 3, 'unitarian-universalism': 3 },
    },
  },
  {
    id: 'wrai-10',
    question: 'What is your view on religious diversity?',
    options: [
      { label: 'My tradition holds the fullest truth, but I respect others.', value: 'a' },
      { label: 'Many paths lead to the same ultimate reality.', value: 'b' },
      { label: 'Each tradition offers partial truths; wisdom is found by drawing from many.', value: 'c' },
      { label: 'Religious claims should be evaluated by the same standards as any other claims.', value: 'd' },
    ],
    weights: {
      a: { christianity: 2, islam: 3 },
      b: { hinduism: 3, sikhism: 3 },
      c: { 'unitarian-universalism': 3, buddhism: 1 },
      d: { 'secular-humanism': 3, buddhism: 1 },
    },
  },
  {
    id: 'wrai-11',
    question: 'How do you feel about dietary restrictions as a spiritual practice?',
    options: [
      { label: 'I value specific dietary laws as expressions of obedience to God.', value: 'a' },
      { label: 'Vegetarianism or veganism is important to me as an expression of nonviolence.', value: 'b' },
      { label: 'Periodic fasting is a meaningful spiritual discipline.', value: 'c' },
      { label: 'I make food choices based on health and ethics, not religious rules.', value: 'd' },
    ],
    weights: {
      a: { judaism: 3, islam: 2 },
      b: { jainism: 3, hinduism: 3, buddhism: 1 },
      c: { islam: 3, christianity: 2 },
      d: { 'secular-humanism': 3, 'unitarian-universalism': 2 },
    },
  },
  {
    id: 'wrai-12',
    question: 'What best describes your view of the self or soul?',
    options: [
      { label: 'Each person has an immortal soul created by God.', value: 'a' },
      { label: 'The self is an illusion, there is no permanent, unchanging soul.', value: 'b' },
      { label: 'The soul is eternal and passes through many lifetimes.', value: 'c' },
      { label: 'I see human identity as a product of biology, experience, and culture.', value: 'd' },
    ],
    weights: {
      a: { christianity: 3, islam: 3, judaism: 2 },
      b: { buddhism: 3 },
      c: { hinduism: 3, jainism: 3, sikhism: 2 },
      d: { 'secular-humanism': 3 },
    },
  },
  {
    id: 'wrai-13',
    question: 'Which approach to spiritual authority appeals to you most?',
    options: [
      { label: 'A central religious authority (such as a pope, council, or scripture) provides essential guidance.', value: 'a' },
      { label: 'A teacher or guru who has walked the path can guide my spiritual development.', value: 'b' },
      { label: 'Religious scholars and their interpretive tradition are important but not infallible.', value: 'c' },
      { label: 'I am my own spiritual authority, no one else can tell me what to believe.', value: 'd' },
    ],
    weights: {
      a: { christianity: 2, islam: 2 },
      b: { hinduism: 3, buddhism: 2, sikhism: 1 },
      c: { judaism: 3, islam: 2 },
      d: { 'secular-humanism': 3, 'unitarian-universalism': 3, taoism: 2 },
    },
  },
  {
    id: 'wrai-14',
    question: 'How do you feel about forgiveness?',
    options: [
      { label: 'Forgiveness is a divine gift, God forgives us, and we should forgive others.', value: 'a' },
      { label: 'Letting go of resentment is essential for inner peace and spiritual progress.', value: 'b' },
      { label: 'Repentance, reconciliation, and repair are communal responsibilities.', value: 'c' },
      { label: 'Forgiveness is psychologically healthy but not a supernatural process.', value: 'd' },
    ],
    weights: {
      a: { christianity: 3, islam: 3, sikhism: 2 },
      b: { buddhism: 3, taoism: 2, jainism: 2 },
      c: { judaism: 3 },
      d: { 'secular-humanism': 3, 'unitarian-universalism': 1 },
    },
  },
  {
    id: 'wrai-15',
    question: 'What is your ideal balance between faith and reason?',
    options: [
      { label: 'Faith comes first, reason is valuable but limited in spiritual matters.', value: 'a' },
      { label: 'Reason and experience should test all claims, including religious ones.', value: 'b' },
      { label: 'Faith and reason are complementary, both are necessary for a full life.', value: 'c' },
      { label: 'Direct personal experience and intuition matter more than logical argument.', value: 'd' },
    ],
    weights: {
      a: { islam: 3, christianity: 2 },
      b: { 'secular-humanism': 3, buddhism: 2 },
      c: { judaism: 3, christianity: 2, 'unitarian-universalism': 2 },
      d: { hinduism: 2, taoism: 3, sikhism: 1 },
    },
  },
  {
    id: 'wrai-16',
    question: 'How do you view the purpose of life?',
    options: [
      { label: 'To worship God, follow divine law, and earn eternal salvation.', value: 'a' },
      { label: 'To end suffering, attain wisdom, and achieve liberation from the cycle of rebirth.', value: 'b' },
      { label: 'To live in harmony with nature and the underlying order of the universe.', value: 'c' },
      { label: 'To create meaning through relationships, creativity, and contributing to human flourishing.', value: 'd' },
    ],
    weights: {
      a: { christianity: 3, islam: 3, judaism: 1 },
      b: { buddhism: 3, hinduism: 2, jainism: 3 },
      c: { taoism: 3, hinduism: 2, sikhism: 1 },
      d: { 'secular-humanism': 3, 'unitarian-universalism': 3 },
    },
  },
  {
    id: 'wrai-17',
    question: 'What role should religion play in government and law?',
    options: [
      { label: 'Religious principles should guide law and governance.', value: 'a' },
      { label: 'Religion and government should be completely separate.', value: 'b' },
      { label: 'Religious values can inform a person\'s politics, but no religion should be legally enforced.', value: 'c' },
      { label: 'I prefer a society governed by ethical principles that don\'t depend on any religion.', value: 'd' },
    ],
    weights: {
      a: { islam: 3 },
      b: { 'secular-humanism': 3, buddhism: 1 },
      c: { christianity: 2, judaism: 2, sikhism: 2, hinduism: 1, 'unitarian-universalism': 2 },
      d: { 'secular-humanism': 3, taoism: 1, 'unitarian-universalism': 2 },
    },
  },
  {
    id: 'wrai-18',
    question: 'Which practice appeals to you most?',
    options: [
      { label: 'Structured daily prayer at specific times, facing a particular direction.', value: 'a' },
      { label: 'Silent sitting meditation, observing the breath and thoughts.', value: 'b' },
      { label: 'Devotional singing, chanting, or ecstatic worship.', value: 'c' },
      { label: 'Ethical reflection, community service, and intellectual discussion.', value: 'd' },
    ],
    weights: {
      a: { islam: 3, judaism: 2 },
      b: { buddhism: 3, taoism: 2, jainism: 1 },
      c: { hinduism: 3, sikhism: 3, christianity: 2 },
      d: { 'secular-humanism': 3, 'unitarian-universalism': 3, judaism: 1 },
    },
  },
  {
    id: 'wrai-19',
    question: 'How do you feel about the concept of sin?',
    options: [
      { label: 'Humans are inherently sinful and need divine grace for redemption.', value: 'a' },
      { label: 'There is no original sin, people are born pure but can make harmful choices.', value: 'b' },
      { label: 'Harmful actions create negative karma that must be worked through, not forgiven by a deity.', value: 'c' },
      { label: '"Sin" is a religious concept I don\'t find useful, I prefer to think about ethics and consequences.', value: 'd' },
    ],
    weights: {
      a: { christianity: 3 },
      b: { islam: 3, judaism: 2, sikhism: 1 },
      c: { hinduism: 3, buddhism: 2, jainism: 3 },
      d: { 'secular-humanism': 3, 'unitarian-universalism': 2, taoism: 1 },
    },
  },
  {
    id: 'wrai-20',
    question: 'What is your attitude toward simplicity and material wealth?',
    options: [
      { label: 'Wealth is a blessing from God when used responsibly and shared charitably.', value: 'a' },
      { label: 'Attachment to material things causes suffering; simplicity is liberating.', value: 'b' },
      { label: 'Extreme renunciation and non-possessiveness are the highest ideals.', value: 'c' },
      { label: 'Material comfort is fine as long as it is earned ethically and does not harm others.', value: 'd' },
    ],
    weights: {
      a: { christianity: 2, islam: 2, sikhism: 2 },
      b: { buddhism: 3, taoism: 3 },
      c: { jainism: 3, hinduism: 1 },
      d: { 'secular-humanism': 3, judaism: 2, 'unitarian-universalism': 1 },
    },
  },
  {
    id: 'wrai-21',
    question: 'How important is ritual in your spiritual life?',
    options: [
      { label: 'Very important, rituals connect me to tradition, community, and the sacred.', value: 'a' },
      { label: 'Moderately important, I value some rituals but not excessive formalism.', value: 'b' },
      { label: 'I am more interested in inner experience than outer ritual.', value: 'c' },
      { label: 'I find secular rituals (holidays, milestones) meaningful without religious content.', value: 'd' },
    ],
    weights: {
      a: { judaism: 3, hinduism: 3, islam: 2, christianity: 2 },
      b: { sikhism: 2, christianity: 1, buddhism: 1 },
      c: { taoism: 3, buddhism: 2, jainism: 1 },
      d: { 'secular-humanism': 3, 'unitarian-universalism': 2 },
    },
  },
  {
    id: 'wrai-22',
    question: 'Which statement about equality resonates most with you?',
    options: [
      { label: 'All people are equal before God, regardless of race, class, or gender.', value: 'a' },
      { label: 'All sentient beings, not just humans, deserve compassion and protection.', value: 'b' },
      { label: 'Equality is a human social value that does not require a divine foundation.', value: 'c' },
      { label: 'True equality means eliminating caste, class, and social hierarchy in the name of divine oneness.', value: 'd' },
    ],
    weights: {
      a: { christianity: 2, islam: 2, judaism: 1 },
      b: { buddhism: 3, jainism: 3, hinduism: 1 },
      c: { 'secular-humanism': 3, 'unitarian-universalism': 2 },
      d: { sikhism: 3 },
    },
  },
  {
    id: 'wrai-23',
    question: 'How do you approach doubt and questioning in spiritual matters?',
    options: [
      { label: 'Doubt is a natural part of faith that can ultimately strengthen belief.', value: 'a' },
      { label: 'Questioning everything, including the teacher, is encouraged and essential.', value: 'b' },
      { label: 'Wrestling with sacred texts and debating their meaning is itself a sacred act.', value: 'c' },
      { label: 'Skepticism is healthy, and claims should be supported by evidence.', value: 'd' },
    ],
    weights: {
      a: { christianity: 3, islam: 2 },
      b: { buddhism: 3, taoism: 1 },
      c: { judaism: 3 },
      d: { 'secular-humanism': 3, 'unitarian-universalism': 2 },
    },
  },
  {
    id: 'wrai-24',
    question: 'What kind of spiritual community would you most want to belong to?',
    options: [
      { label: 'A community united by shared creed and regular worship led by ordained clergy.', value: 'a' },
      { label: 'A monastic or contemplative community focused on meditation and study.', value: 'b' },
      { label: 'A service-oriented community that feeds the hungry and serves all people equally.', value: 'c' },
      { label: 'A diverse, welcoming community that celebrates many traditions and encourages personal exploration.', value: 'd' },
    ],
    weights: {
      a: { christianity: 3, islam: 2 },
      b: { buddhism: 3, jainism: 2 },
      c: { sikhism: 3, islam: 1 },
      d: { 'unitarian-universalism': 3, hinduism: 1, 'secular-humanism': 1 },
    },
  },
  {
    id: 'wrai-25',
    question: 'If you could choose one word to describe the spiritual quality you value most, what would it be?',
    options: [
      { label: 'Grace, unearned divine love and mercy.', value: 'a' },
      { label: 'Mindfulness, present-moment awareness and clarity.', value: 'b' },
      { label: 'Justice, a world where all people are treated fairly and with dignity.', value: 'c' },
      { label: 'Harmony, balance, flow, and alignment with the natural order.', value: 'd' },
    ],
    weights: {
      a: { christianity: 3, islam: 2, sikhism: 2 },
      b: { buddhism: 3, jainism: 1 },
      c: { judaism: 3, sikhism: 2, 'secular-humanism': 2, 'unitarian-universalism': 2 },
      d: { taoism: 3, hinduism: 2 },
    },
  },
];
