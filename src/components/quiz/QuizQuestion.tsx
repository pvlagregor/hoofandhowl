"use client";

import { useState } from "react";
import type { QuizQuestion as QuizQuestionType } from "./quizData";

interface QuizQuestionProps {
  question: QuizQuestionType;
  onAnswer: (questionId: string, answerId: string) => void;
  onBack: () => void;
  canGoBack: boolean;
}

export default function QuizQuestion({
  question,
  onAnswer,
  onBack,
  canGoBack,
}: QuizQuestionProps) {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  function handleSelect(answerId: string) {
    if (selectedId) return; // prevent double-click
    setSelectedId(answerId);
    setTimeout(() => {
      onAnswer(question.id, answerId);
    }, 400);
  }

  return (
    <div>
      <h2 className="font-serif text-2xl md:text-3xl text-cream font-normal text-center mb-10 leading-snug">
        {question.question}
      </h2>

      <div className="grid grid-cols-1 gap-3">
        {question.answers.map((answer) => {
          const isSelected = selectedId === answer.id;
          return (
            <button
              key={answer.id}
              type="button"
              onClick={() => handleSelect(answer.id)}
              disabled={selectedId !== null}
              className={`
                w-full text-left py-5 px-6 border rounded transition-all duration-300 cursor-pointer
                font-sans text-base font-light
                ${
                  isSelected
                    ? "border-gold bg-gold/10 text-cream"
                    : "border-taupe/30 text-cream/80 hover:border-gold hover:text-cream"
                }
                disabled:cursor-default
              `}
            >
              {answer.label}
            </button>
          );
        })}
      </div>

      {canGoBack && (
        <div className="mt-8 text-center">
          <button
            type="button"
            onClick={onBack}
            disabled={selectedId !== null}
            className="font-sans text-sm uppercase tracking-luxury text-taupe hover:text-cream transition-colors duration-300"
          >
            &larr; Back
          </button>
        </div>
      )}
    </div>
  );
}
