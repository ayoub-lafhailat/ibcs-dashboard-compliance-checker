import { Info } from "lucide-react";
import { useState } from "react";
import {
  calculateCircleProgress,
  getConfidenceCircleColor,
  isLowConfidenceScore,
} from "../../utils/analysisSummaryUtils";
import type { AnalysisConfidenceCircleProps } from "../../types/analysisResult";

const CIRCLE_RADIUS = 37;

const AnalysisConfidenceCircle = ({ score }: AnalysisConfidenceCircleProps) => {
  const [showConfidenceInfo, setShowConfidenceInfo] = useState(false);

  const isLowConfidence = isLowConfidenceScore(score);
  const circleColor = getConfidenceCircleColor(score);

  const { circumference, progressOffset } = calculateCircleProgress(
    score,
    CIRCLE_RADIUS,
  );

  return (
    <div className="relative flex flex-col items-center">
      <div className="mb-1 flex items-center gap-2">
        <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[var(--color-primary)]/80">
          Confidence
        </p>

        <button
          type="button"
          onClick={() => setShowConfidenceInfo((current) => !current)}
          className={`rounded-full transition hover:opacity-80 ${
            isLowConfidence ? "text-red-500" : "text-[var(--color-primary)]/70"
          }`}
          aria-label="Show confidence explanation"
        >
          <Info size={15} strokeWidth={2.4} />
        </button>
      </div>

      <div className="relative h-24 w-24">
        <svg className="h-full w-full -rotate-90" viewBox="0 0 100 100">
          <circle
            cx="50"
            cy="50"
            r={CIRCLE_RADIUS}
            fill="none"
            stroke="currentColor"
            strokeWidth="8"
            className="text-[var(--color-border)]/50"
          />

          <circle
            cx="50"
            cy="50"
            r={CIRCLE_RADIUS}
            fill="none"
            stroke="currentColor"
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={progressOffset}
            className={`${circleColor} transition-all`}
          />
        </svg>

        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-xl font-bold text-[var(--color-dark)]">
            {score}%
          </span>
        </div>
      </div>

      {showConfidenceInfo && (
        <div className="absolute right-0 top-7 z-10 w-72 rounded-lg border border-[var(--color-border)] bg-white p-3 text-sm leading-6 text-[var(--color-primary)] shadow-lg">
          <p>
            Confidence shows how certain the AI model is about the analysis
            result.
          </p>

          {isLowConfidence && (
            <p className="mt-2 font-medium text-red-500">
              This score is low, so the result may be less reliable and should
              be reviewed carefully.
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default AnalysisConfidenceCircle;
