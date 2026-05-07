import { AlertTriangle, Check, Info } from "lucide-react";
import { useState } from "react";
import type { ScenarioCheck } from "../../types/analysisResult";

interface AnalysisSummaryCardProps {
  score: number;
  status: "compliant" | "non-compliant";
  scenarioChecks: ScenarioCheck[];
}

const LOW_CONFIDENCE_THRESHOLD = 70;

const AnalysisSummaryCard = ({
  score,
  status,
  scenarioChecks,
}: AnalysisSummaryCardProps) => {
  const [showConfidenceInfo, setShowConfidenceInfo] = useState(false);

  const isCompliant = status === "compliant";
  const isLowConfidence = score < LOW_CONFIDENCE_THRESHOLD;

  const visibleScenarioChecks = scenarioChecks.filter((check) => check.present);

  const circleColor = isLowConfidence ? "text-red-500" : "text-amber-500";

  const radius = 37;
  const circumference = 2 * Math.PI * radius;
  const progressOffset = circumference - (score / 100) * circumference;

  return (
    <section className="rounded-md border border-[var(--color-border)] bg-[var(--color-white)] p-4 shadow-sm">
      <div className="grid gap-4 md:grid-cols-[1fr_140px] md:items-stretch">
        <div className="flex h-full min-h-24 flex-col">
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[var(--color-primary)]/80">
            Status
          </p>

          <div className="flex flex-1 items-center gap-3">
            {isCompliant ? (
              <Check className="text-emerald-500" size={35} strokeWidth={2.4} />
            ) : (
              <AlertTriangle
                className="text-amber-500"
                size={35}
                strokeWidth={2.4}
              />
            )}

            <h2 className="text-3xl font-semibold leading-none text-[var(--color-dark)]">
              {isCompliant ? "Compliant" : "Non-Compliant"}
            </h2>
          </div>

          {visibleScenarioChecks.length > 0 && (
            <div className="mt-4 space-y-2">
              {visibleScenarioChecks.map((check) => {
                const scenarioIsCompliant = check.status === "compliant";

                return (
                  <div
                    key={check.label}
                    className="grid grid-cols-[1fr_auto] items-center gap-4"
                  >
                    <span className="text-sm text-[var(--color-primary)]/85">
                      {check.label}
                    </span>

                    <span
                      className={`whitespace-nowrap text-sm font-medium ${
                        scenarioIsCompliant
                          ? "text-emerald-500"
                          : "text-red-500"
                      }`}
                    >
                      {scenarioIsCompliant ? "✓ Compliant" : "✗ Non-compliant"}
                    </span>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        <div className="relative flex flex-col items-center">
          <div className="mb-1 flex items-center gap-2">
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[var(--color-primary)]/80">
              Confidence
            </p>

            {isLowConfidence && (
              <button
                type="button"
                onClick={() => setShowConfidenceInfo((current) => !current)}
                className="rounded-full text-red-500 transition hover:opacity-80"
                aria-label="Show confidence warning"
              >
                <Info size={15} strokeWidth={2.4} />
              </button>
            )}
          </div>

          <div className="relative h-24 w-24">
            <svg className="h-full w-full -rotate-90" viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r={radius}
                fill="none"
                stroke="currentColor"
                strokeWidth="8"
                className="text-[var(--color-border)]/50"
              />

              <circle
                cx="50"
                cy="50"
                r={radius}
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
            <div className="absolute right-0 top-7 z-10 w-64 rounded-lg border border-red-200 bg-white p-3 text-sm leading-6 text-[var(--color-primary)] shadow-lg">
              The results may not be sufficient enough because the model
              confidence is low.
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default AnalysisSummaryCard;
