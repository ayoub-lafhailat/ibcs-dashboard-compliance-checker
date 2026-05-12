import { MemoryRouter, Route, Routes } from "react-router-dom";
import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import ResultsPage from "./ResultsPage";
import type { ResultsNavigationState } from "../types/analysisResult";

const renderResultsPage = (state?: ResultsNavigationState) => {
  return render(
    <MemoryRouter
      initialEntries={[
        {
          pathname: "/results",
          state,
        },
      ]}
    >
      <Routes>
        <Route path="/results" element={<ResultsPage />} />
      </Routes>
    </MemoryRouter>,
  );
};

describe("ResultsPage", () => {
  it("shows a fallback message when no analysis state is available", () => {
    renderResultsPage();

    expect(
      screen.getByRole("heading", { name: /no analysis available yet/i }),
    ).toBeInTheDocument();

    expect(
      screen.getByText(/upload a dashboard and run an ai analysis first/i),
    ).toBeInTheDocument();

    expect(
      screen.getByRole("link", { name: /go to analyze/i }),
    ).toHaveAttribute("href", "/analyze");
  });

  it("renders the analysis result when navigation state is available", () => {
    const state: ResultsNavigationState = {
      uploadedImageUrl: "blob:mock-preview-url",
      analysisResult: {
        uploadedImageUrl: "blob:mock-preview-url",
        score: 88,
        status: "compliant",
        scenarioChecks: [],
        issues: [],
        suggestions: [
          "The dashboard appears compliant based on the model prediction.",
        ],
      },
    };

    renderResultsPage(state);

    expect(
      screen.getByText((content) => content.replace(/\s/g, "") === "88%"),
    ).toBeInTheDocument();

    expect(
      screen.getByRole("heading", { name: /^compliant$/i }),
    ).toBeInTheDocument();

    expect(
      screen.getByText(
        /the dashboard appears compliant based on the model prediction/i,
      ),
    ).toBeInTheDocument();

    expect(screen.getByAltText(/uploaded dashboard/i)).toHaveAttribute(
      "src",
      "blob:mock-preview-url",
    );
  });
});
