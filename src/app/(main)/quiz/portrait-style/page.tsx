import { createMetadata } from "@/lib/metadata";
import QuizClient from "@/components/quiz/QuizClient";

export const metadata = createMetadata({
  title: "Discover Your Pet's Portrait Style",
  description:
    "Take this 2-minute quiz to discover your pet's signature portrait style. Fine art pet portraiture by Hoof & Howl in New Jersey.",
  path: "/quiz/portrait-style",
});

export default function PortraitStyleQuizPage() {
  return (
    <div className="min-h-screen bg-charcoal">
      <QuizClient />
    </div>
  );
}
