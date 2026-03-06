"use client";

import { useState } from "react";

export default function FaqItemClient({
  question,
  answer,
}: {
  question: string;
  answer: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="py-6">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between text-left gap-4 group"
      >
        <h3 className="font-serif text-lg md:text-xl text-charcoal group-hover:text-gold transition-colors duration-300">
          {question}
        </h3>
        <span
          className={`text-gold text-2xl leading-none transition-transform duration-300 shrink-0 ${
            open ? "rotate-45" : ""
          }`}
        >
          +
        </span>
      </button>
      <div
        className="grid transition-all duration-300 ease-in-out"
        style={{
          gridTemplateRows: open ? "1fr" : "0fr",
        }}
      >
        <div className="overflow-hidden">
          <p className="pt-4 text-base font-light text-charcoal leading-relaxed">
            {answer}
          </p>
        </div>
      </div>
    </div>
  );
}
