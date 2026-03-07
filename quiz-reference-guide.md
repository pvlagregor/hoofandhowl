# Portrait Style Quiz - Reference Guide

## Quiz URL

**Live:** hoofandhowl.com/quiz/portrait-style

---

## Dev Preview Links

Preview any result page instantly (dev mode only). Start the dev server with `npm run dev`, then visit:

### Result Pages

| Style | URL |
|-------|-----|
| The Heirloom Classic | http://localhost:3000/quiz/portrait-style?preview=HC |
| The Heart & Home Portrait | http://localhost:3000/quiz/portrait-style?preview=HH |
| The Bold Statement Piece | http://localhost:3000/quiz/portrait-style?preview=BS |
| The Natural Soul | http://localhost:3000/quiz/portrait-style?preview=NS |
| The Sophisticated Modern | http://localhost:3000/quiz/portrait-style?preview=SM |

### Life-Stage Closing Lines

Add `&stage=` to any preview URL to test different closing lines:

| Stage | Parameter | Closing Line |
|-------|-----------|-------------|
| Young | `&stage=q8_a` | "And the best part -- you'll have this portrait to look back on for all the years ahead." |
| Prime (default) | `&stage=q8_b` | "Right now, they're at their most beautiful. This is the perfect time to capture it." |
| Getting older | `&stage=q8_c` | "You're thinking about it because part of you already knows -- there's no better time than now." |
| Senior | `&stage=q8_d` | "They won't be here forever. But their portrait will." |

**Example:** http://localhost:3000/quiz/portrait-style?preview=HC&stage=q8_d
(Heirloom Classic with the senior closing line)

---

## File Structure

```
src/
  app/quiz/portrait-style/page.tsx        -- Page component + metadata
  app/api/quiz/route.ts                   -- Lead capture API (GHL integration)
  components/quiz/
    quizData.ts                           -- Questions, scoring, results data
    QuizClient.tsx                        -- State machine orchestrator
    QuizQuestion.tsx                      -- Question + answer cards
    QuizProgress.tsx                      -- Progress bar
    QuizLeadForm.tsx                      -- Lead capture form
    QuizResult.tsx                        -- Result display
```

---

## Placeholder Images

Each result page has 3 placeholder slots labeled "Portrait Example 1/2/3" in the "What Your Style Looks Like on Real Walls" section. Replace these in `QuizResult.tsx`.
