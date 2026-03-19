"use client";

import { useReducer, useCallback, useState, useEffect } from "react";
import QuizProgress from "./QuizProgress";
import QuizQuestion from "./QuizQuestion";
import QuizLeadForm from "./QuizLeadForm";
import QuizResult from "./QuizResult";
import Container from "@/components/ui/Container";
import { trackEvent, generateEventId } from "@/lib/tracking";
import {
  QUIZ_QUESTIONS,
  STYLE_RESULTS,
  calculateResult,
  getAnswerLabel,
  getLifeStageClosing,
  type StyleKey,
} from "./quizData";

// ---------------------------------------------------------------------------
// State
// ---------------------------------------------------------------------------

type Step = "quiz" | "lead-capture" | "submitting" | "result" | "error";

interface QuizState {
  step: Step;
  currentQuestion: number;
  answers: Record<string, string>; // questionId -> answerId
  result: StyleKey | null;
  leadData: { firstName: string; email: string; petName: string } | null;
}

type QuizAction =
  | { type: "ANSWER_QUESTION"; questionId: string; answerId: string }
  | { type: "GO_BACK" }
  | { type: "START_SUBMIT"; data: { firstName: string; email: string; petName: string } }
  | { type: "SHOW_RESULT"; result: StyleKey }
  | { type: "SET_ERROR" };

function reducer(state: QuizState, action: QuizAction): QuizState {
  switch (action.type) {
    case "ANSWER_QUESTION": {
      const answers = { ...state.answers, [action.questionId]: action.answerId };
      const nextQ = state.currentQuestion + 1;
      if (nextQ >= QUIZ_QUESTIONS.length) {
        return { ...state, answers, step: "lead-capture", currentQuestion: nextQ };
      }
      return { ...state, answers, currentQuestion: nextQ };
    }
    case "GO_BACK": {
      if (state.step === "lead-capture") {
        return { ...state, step: "quiz", currentQuestion: QUIZ_QUESTIONS.length - 1 };
      }
      if (state.currentQuestion <= 0) return state;
      return { ...state, currentQuestion: state.currentQuestion - 1 };
    }
    case "START_SUBMIT":
      return { ...state, step: "submitting", leadData: action.data };
    case "SHOW_RESULT":
      return { ...state, step: "result", result: action.result };
    case "SET_ERROR":
      return { ...state, step: "error" };
    default:
      return state;
  }
}

const initialState: QuizState = {
  step: "quiz",
  currentQuestion: 0,
  answers: {},
  result: null,
  leadData: null,
};

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function QuizClient() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [transitioning, setTransitioning] = useState(false);

  // Dev preview: ?preview=HC (or HH, BS, NS, SM) &stage=q8_d
  useEffect(() => {
    if (process.env.NODE_ENV !== "development") return;
    const params = new URLSearchParams(window.location.search);
    const preview = params.get("preview") as StyleKey | null;
    if (preview && preview in STYLE_RESULTS) {
      const stage = params.get("stage") || "q8_b";
      dispatch({ type: "ANSWER_QUESTION", questionId: "q8", answerId: stage });
      dispatch({ type: "SHOW_RESULT", result: preview });
    }
  }, []);

  const handleAnswer = useCallback(
    (questionId: string, answerId: string) => {
      setTransitioning(true);
      setTimeout(() => {
        dispatch({ type: "ANSWER_QUESTION", questionId, answerId });
        setTransitioning(false);
      }, 300);
    },
    []
  );

  const handleBack = useCallback(() => {
    setTransitioning(true);
    setTimeout(() => {
      dispatch({ type: "GO_BACK" });
      setTransitioning(false);
    }, 300);
  }, []);

  const handleLeadSubmit = useCallback(
    async (data: { firstName: string; email: string; petName: string }) => {
      dispatch({ type: "START_SUBMIT", data });

      const result = calculateResult(state.answers);
      const styleResult = STYLE_RESULTS[result];
      const q8Answer = state.answers["q8"];
      const lifeStage = getLifeStageClosing(q8Answer);

      const eventId = generateEventId();

      try {
        await fetch("/api/quiz", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            first_name: data.firstName,
            email: data.email,
            pet_name: data.petName,
            animal_type: getAnswerLabel("q1", state.answers["q1"]),
            portrait_style: styleResult.name,
            portrait_style_slug: styleResult.slug,
            emotional_memory: getAnswerLabel("q7", state.answers["q7"]),
            pet_life_stage: lifeStage?.ghlValue ?? "",
            event_id: eventId,
          }),
        });

        trackEvent("generate_lead", {
          lead_type: "quiz_lead",
          form_name: "quiz_lead_form",
          service: "portrait_style_quiz",
          page_path: window.location.pathname,
          page_title: document.title,
          lead_source_ui: "quiz",
          event_id: eventId,
        });
        dispatch({ type: "SHOW_RESULT", result });
      } catch {
        dispatch({ type: "SHOW_RESULT", result });
      }
    },
    [state.answers]
  );

  // Result page — full-width, no centering wrapper
  if (state.step === "result" && state.result) {
    return (
      <QuizResult
        styleKey={state.result}
        lifeStageAnswerId={state.answers["q8"] ?? ""}
        petName={state.leadData?.petName}
      />
    );
  }

  // Quiz / Lead Capture / Submitting / Error — centered layout
  return (
    <div className="min-h-[calc(100vh-80px)] flex flex-col items-center justify-center px-6 py-12">
      <Container className="w-full max-w-2xl">
        {/* Quiz questions */}
        {state.step === "quiz" && state.currentQuestion < QUIZ_QUESTIONS.length && (
          <>
            <QuizProgress
              current={state.currentQuestion}
              total={QUIZ_QUESTIONS.length}
            />
            <div
              style={{
                opacity: transitioning ? 0 : 1,
                transform: transitioning ? "translateY(12px)" : "translateY(0)",
                transition: "opacity 300ms ease, transform 300ms ease",
              }}
            >
              <QuizQuestion
                key={QUIZ_QUESTIONS[state.currentQuestion].id}
                question={QUIZ_QUESTIONS[state.currentQuestion]}
                onAnswer={handleAnswer}
                onBack={handleBack}
                canGoBack={state.currentQuestion > 0}
              />
            </div>
          </>
        )}

        {/* Lead capture */}
        {(state.step === "lead-capture" || state.step === "submitting") && (
          <div
            style={{
              opacity: transitioning ? 0 : 1,
              transform: transitioning ? "translateY(12px)" : "translateY(0)",
              transition: "opacity 300ms ease, transform 300ms ease",
            }}
          >
            <QuizLeadForm
              onSubmit={handleLeadSubmit}
              isSubmitting={state.step === "submitting"}
            />
            {state.step === "lead-capture" && (
              <div className="mt-8 text-center">
                <button
                  type="button"
                  onClick={handleBack}
                  className="font-sans text-sm uppercase tracking-luxury text-taupe hover:text-cream transition-colors duration-300"
                >
                  &larr; Back
                </button>
              </div>
            )}
          </div>
        )}

        {/* Error */}
        {state.step === "error" && (
          <div className="text-center">
            <h2 className="font-serif text-2xl text-cream mb-4">
              Something went wrong
            </h2>
            <p className="text-base font-light text-taupe mb-8">
              We couldn&apos;t process your submission. Please try again.
            </p>
            <button
              type="button"
              onClick={() => dispatch({ type: "GO_BACK" })}
              className="font-sans text-sm uppercase tracking-luxury text-gold hover:text-gold-light transition-colors duration-300"
            >
              Try Again
            </button>
          </div>
        )}
      </Container>
    </div>
  );
}
