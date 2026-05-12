import { describe, expect, it } from "vitest";
import { mapPredictionToAnalysisResult } from "./analysisResultMapper";
import type { PredictionResponse } from "../api/analyzeApi";

describe("mapPredictionToAnalysisResult", () => {
  it("maps a compliant prediction to a compliant analysis result", () => {
    const prediction: PredictionResponse = {
      prediction: 1,
      label_name: "compliant",
      probability_compliant: 0.92,
      probability_non_compliant: 0.08,
      filename: "dashboard.png",
    };

    const result = mapPredictionToAnalysisResult(
      prediction,
      "blob:mock-preview-url",
    );

    expect(result.status).toBe("compliant");
    expect(result.score).toBe(92);
    expect(result.uploadedImageUrl).toBe("blob:mock-preview-url");
    expect(result.issues).toHaveLength(0);
    expect(result.suggestions.length).toBeGreaterThan(0);
  });

  it("maps a non-compliant prediction to a non-compliant analysis result with issues", () => {
    const prediction: PredictionResponse = {
      prediction: 0,
      label_name: "non-compliant",
      probability_compliant: 0.21,
      probability_non_compliant: 0.79,
      filename: "dashboard.png",
    };

    const result = mapPredictionToAnalysisResult(
      prediction,
      "blob:mock-preview-url",
    );

    expect(result.status).toBe("non-compliant");
    expect(result.score).toBe(79);
    expect(result.issues).toEqual([
      {
        message: "The uploaded dashboard appears to be non-compliant.",
        severity: "high",
      },
    ]);
    expect(result.suggestions).toContain(
      "Review the dashboard against the IBCS compliance rules.",
    );
  });
});
