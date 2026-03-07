export type StyleKey = "HC" | "HH" | "BS" | "NS" | "SM";

export interface AnswerOption {
  id: string;
  label: string;
  scoring: Partial<Record<StyleKey, number>>;
}

export interface QuizQuestion {
  id: string;
  question: string;
  answers: AnswerOption[];
  noScoring?: boolean;
  isTiebreaker?: boolean;
  /** If set, the answer text is stored under this key for GHL */
  storeAs?: string;
}

export interface StyleResult {
  key: StyleKey;
  slug: string;
  name: string;
  description: string;
  bestMatch: string;
  bestProducts: string[];
}

export interface LifeStageClosing {
  answerId: string;
  label: string;
  ghlValue: string;
  closingLine: string;
}

// ---------------------------------------------------------------------------
// Questions
// ---------------------------------------------------------------------------

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: "q1",
    question: "What kind of animal are you looking to have portrayed?",
    storeAs: "animal_type",
    answers: [
      { id: "q1_a", label: "My dog", scoring: {} },
      { id: "q1_b", label: "My horse", scoring: { NS: 2 } },
      { id: "q1_c", label: "My cat", scoring: {} },
      { id: "q1_d", label: "Another animal", scoring: {} },
      { id: "q1_e", label: "More than one", scoring: {} },
    ],
  },
  {
    id: "q2",
    question: "Which word feels most like your home?",
    answers: [
      { id: "q2_a", label: "Timeless", scoring: { HC: 2 } },
      { id: "q2_b", label: "Warm", scoring: { HH: 2 } },
      { id: "q2_c", label: "Dramatic", scoring: { BS: 2 } },
      { id: "q2_d", label: "Natural", scoring: { NS: 2 } },
      { id: "q2_e", label: "Modern", scoring: { SM: 2 } },
    ],
  },
  {
    id: "q3",
    question: "When people meet your pet, what do they notice first?",
    answers: [
      { id: "q3_a", label: "Their big personality", scoring: { BS: 2 } },
      { id: "q3_b", label: "Their deep bond with me", scoring: { HH: 2 } },
      { id: "q3_c", label: "Their calm, soulful eyes", scoring: { HC: 2 } },
      { id: "q3_d", label: "Their elegance and beauty", scoring: { SM: 2 } },
      { id: "q3_e", label: "Their love of being outdoors", scoring: { NS: 2 } },
    ],
  },
  {
    id: "q4",
    question: "Which room would your pet\u2019s portrait most likely live in?",
    answers: [
      { id: "q4_a", label: "A cozy family room", scoring: { HH: 2 } },
      { id: "q4_b", label: "The entryway or statement wall", scoring: { BS: 2 } },
      { id: "q4_c", label: "A formal living room or study", scoring: { HC: 1, SM: 1 } },
      { id: "q4_d", label: "A bedroom or private space", scoring: { HH: 1, HC: 1 } },
      { id: "q4_e", label: "Wherever it looks most beautiful", scoring: { NS: 1, SM: 1 } },
    ],
  },
  {
    id: "q5",
    question: "How would you describe your decorating style?",
    answers: [
      { id: "q5_a", label: "Classic pieces I\u2019ll never replace", scoring: { HC: 2 } },
      { id: "q5_b", label: "Things that feel collected, not decorated", scoring: { HH: 1, NS: 1 } },
      { id: "q5_c", label: "Bold choices that make an impression", scoring: { BS: 2 } },
      { id: "q5_d", label: "Clean and intentional \u2014 everything has a place", scoring: { SM: 2 } },
      { id: "q5_e", label: "A mix of old and new that feels like me", scoring: { HC: 1, SM: 1 } },
    ],
  },
  {
    id: "q6",
    question: "What would make your portrait feel \u201cperfect\u201d?",
    answers: [
      { id: "q6_a", label: "It captures our bond", scoring: { HH: 2 } },
      { id: "q6_b", label: "It feels like a true work of art", scoring: { HC: 1, BS: 1 } },
      { id: "q6_c", label: "It fits beautifully in my home", scoring: { SM: 2 } },
      { id: "q6_d", label: "It looks like my pet at their most natural", scoring: { NS: 2 } },
      { id: "q6_e", label: "It stops people in their tracks", scoring: { BS: 2 } },
    ],
  },
  {
    id: "q7",
    question: "What\u2019s the one thing you want to remember most about your pet?",
    noScoring: true,
    storeAs: "emotional_memory",
    answers: [
      { id: "q7_a", label: "The way they look at me", scoring: {} },
      { id: "q7_b", label: "Their personality \u2014 there\u2019s no one like them", scoring: {} },
      { id: "q7_c", label: "The quiet moments together", scoring: {} },
      { id: "q7_d", label: "How they move through the world", scoring: {} },
      { id: "q7_e", label: "Everything \u2014 I just don\u2019t want to forget", scoring: {} },
    ],
  },
  {
    id: "q8",
    question: "Has your pet entered their senior years, or are they still young?",
    noScoring: true,
    storeAs: "pet_life_stage",
    answers: [
      { id: "q8_a", label: "Still a puppy/young", scoring: {} },
      { id: "q8_b", label: "In their prime", scoring: {} },
      { id: "q8_c", label: "Getting older \u2014 I think about it", scoring: {} },
      { id: "q8_d", label: "A senior \u2014 every day matters", scoring: {} },
    ],
  },
  {
    id: "q9",
    question: "Which of these sounds most exciting to you?",
    isTiebreaker: true,
    answers: [
      { id: "q9_a", label: "A refined framed portrait that feels like a forever piece", scoring: { HC: 2 } },
      { id: "q9_b", label: "A collection of images that tell our story", scoring: { HH: 2 } },
      { id: "q9_c", label: "A large canvas that dominates the room", scoring: { BS: 2 } },
      { id: "q9_d", label: "Beautiful portraits in a natural setting", scoring: { NS: 2 } },
      { id: "q9_e", label: "A sleek, modern framed piece that fits my aesthetic", scoring: { SM: 2 } },
    ],
  },
];

// ---------------------------------------------------------------------------
// Results
// ---------------------------------------------------------------------------

export const STYLE_RESULTS: Record<StyleKey, StyleResult> = {
  HC: {
    key: "HC",
    slug: "heirloom-classic",
    name: "The Heirloom Classic",
    description:
      "You\u2019re drawn to beauty that lasts. Portraits that feel timeless, elegant, and deeply meaningful \u2014 artwork that honors your pet in a way that still feels right decades from now. You don\u2019t follow trends. You want something permanent.",
    bestMatch: "Heirloom Framed Print or Painter Portrait",
    bestProducts: [
      "Heirloom Framed Prints",
      "Painter Portraits",
      "Large statement wall portraits",
    ],
  },
  HH: {
    key: "HH",
    slug: "heart-and-home",
    name: "The Heart & Home Portrait",
    description:
      "For you, it\u2019s about the bond. Your pet is the emotional center of your home, and you want artwork that reflects that \u2014 imagery that feels personal, warm, and full of the connection only you and your pet understand.",
    bestMatch: "Framed Wall Collection or Legacy Album",
    bestProducts: [
      "Framed prints in living spaces",
      "Legacy Albums with storytelling images",
      "Smaller wall collections",
    ],
  },
  BS: {
    key: "BS",
    slug: "bold-statement",
    name: "The Bold Statement Piece",
    description:
      "You want a portrait that stops people. Something dramatic, striking, and impossible to ignore \u2014 artwork that makes your pet the centerpiece of the room. You\u2019re not looking for subtle. You\u2019re looking for impact.",
    bestMatch: "Oversized Canvas or Painter Portrait",
    bestProducts: [
      "Oversized Gallery-Wrapped Canvas",
      "Large Heirloom Framed Prints",
      "Painter Portraits with major visual impact",
    ],
  },
  NS: {
    key: "NS",
    slug: "natural-soul",
    name: "The Natural Soul",
    description:
      "You want your pet captured the way you see them \u2014 authentic, beautiful, and free. No studio backdrops. No stiff posing. Just your animal in the kind of light and space that feels like home to them.",
    bestMatch: "Gallery-Wrapped Canvas or Framed Collection",
    bestProducts: [
      "Gallery-Wrapped Canvas",
      "Framed collections",
      "Legacy Albums with story-driven images",
    ],
  },
  SM: {
    key: "SM",
    slug: "sophisticated-modern",
    name: "The Sophisticated Modern",
    description:
      "Your home is intentional, and your artwork should be too. You want a portrait that feels like it was designed for your space \u2014 clean, elevated, and beautiful without competing with the room around it.",
    bestMatch: "Heirloom Framed Print or Curated Wall Grouping",
    bestProducts: [
      "Modern Heirloom Framed Prints",
      "Clean wall groupings",
      "Black-and-white or neutral-toned pieces",
    ],
  },
};

// ---------------------------------------------------------------------------
// Life-stage closing lines (keyed by Q8 answer id)
// ---------------------------------------------------------------------------

export const LIFE_STAGE_CLOSINGS: LifeStageClosing[] = [
  {
    answerId: "q8_a",
    label: "Young",
    ghlValue: "young",
    closingLine:
      "And the best part \u2014 you\u2019ll have this portrait to look back on for all the years ahead.",
  },
  {
    answerId: "q8_b",
    label: "Prime",
    ghlValue: "prime",
    closingLine:
      "Right now, they\u2019re at their most beautiful. This is the perfect time to capture it.",
  },
  {
    answerId: "q8_c",
    label: "Getting older",
    ghlValue: "getting older",
    closingLine:
      "You\u2019re thinking about it because part of you already knows \u2014 there\u2019s no better time than now.",
  },
  {
    answerId: "q8_d",
    label: "Senior",
    ghlValue: "senior",
    closingLine:
      "They won\u2019t be here forever. But their portrait will.",
  },
];

// ---------------------------------------------------------------------------
// Scoring
// ---------------------------------------------------------------------------

export function calculateResult(answers: Record<string, string>): StyleKey {
  const scores: Record<StyleKey, number> = { HC: 0, HH: 0, BS: 0, NS: 0, SM: 0 };

  for (const question of QUIZ_QUESTIONS) {
    const answerId = answers[question.id];
    if (!answerId || question.noScoring) continue;

    const answer = question.answers.find((a) => a.id === answerId);
    if (!answer) continue;

    for (const [style, points] of Object.entries(answer.scoring)) {
      scores[style as StyleKey] += points as number;
    }
  }

  const maxScore = Math.max(...Object.values(scores));
  const tied = (Object.keys(scores) as StyleKey[]).filter((k) => scores[k] === maxScore);

  if (tied.length === 1) return tied[0];

  // Tiebreaker: use Q9 answer's primary style
  const q9Answer = answers["q9"];
  if (q9Answer) {
    const q9Question = QUIZ_QUESTIONS.find((q) => q.id === "q9")!;
    const q9Option = q9Question.answers.find((a) => a.id === q9Answer);
    if (q9Option) {
      const q9Style = Object.keys(q9Option.scoring)[0] as StyleKey;
      if (tied.includes(q9Style)) return q9Style;
    }
  }

  // Fallback: first tied style
  return tied[0];
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

export function getAnswerLabel(questionId: string, answerId: string): string {
  const question = QUIZ_QUESTIONS.find((q) => q.id === questionId);
  if (!question) return "";
  const answer = question.answers.find((a) => a.id === answerId);
  return answer?.label ?? "";
}

export function getLifeStageClosing(answerId: string): LifeStageClosing | undefined {
  return LIFE_STAGE_CLOSINGS.find((ls) => ls.answerId === answerId);
}
