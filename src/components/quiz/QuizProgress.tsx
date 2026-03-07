interface QuizProgressProps {
  current: number;
  total: number;
}

export default function QuizProgress({ current, total }: QuizProgressProps) {
  const percent = ((current + 1) / total) * 100;

  return (
    <div className="mb-10">
      <div className="w-full h-1 bg-deep-brown rounded-full overflow-hidden">
        <div
          className="h-full bg-gold rounded-full transition-all duration-500 ease-out"
          style={{ width: `${percent}%` }}
        />
      </div>
      <p className="font-sans text-xs font-medium uppercase tracking-luxury text-taupe mt-3 text-center">
        Question {current + 1} of {total}
      </p>
    </div>
  );
}
