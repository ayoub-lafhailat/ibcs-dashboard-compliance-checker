import { MemoryRouter } from "react-router-dom";
import { describe, expect, it, vi, beforeEach } from "vitest";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import AnalyzePage from "./AnalyzePage";

const mockNavigate = vi.fn();

vi.mock("react-router-dom", async () => {
  const actual =
    await vi.importActual<typeof import("react-router-dom")>(
      "react-router-dom",
    );

  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

vi.mock("../api/analyzeApi", () => ({
  analyzeImage: vi.fn().mockResolvedValue({
    prediction: 1,
    label_name: "compliant",
    probability_compliant: 0.93,
    probability_non_compliant: 0.07,
    filename: "dashboard.png",
  }),
}));

describe("AnalyzePage", () => {
  beforeEach(() => {
    mockNavigate.mockClear();
  });

  it("renders the upload area and disables analysis before a file is selected", () => {
    render(
      <MemoryRouter>
        <AnalyzePage />
      </MemoryRouter>,
    );

    expect(
      screen.getByRole("heading", { name: /analyze dashboard/i }),
    ).toBeInTheDocument();

    expect(
      screen.getByText(/drop your dashboard image here/i),
    ).toBeInTheDocument();

    expect(
      screen.getByRole("button", { name: /run ai analysis/i }),
    ).toBeDisabled();
  });

  it("accepts a valid image and enables the analyze button", async () => {
    const user = userEvent.setup();

    render(
      <MemoryRouter>
        <AnalyzePage />
      </MemoryRouter>,
    );

    const file = new File(["mock image"], "dashboard.png", {
      type: "image/png",
    });

    const fileInput = document.querySelector(
      'input[type="file"]',
    ) as HTMLInputElement;

    await user.upload(fileInput, file);

    expect(
      screen.getByText(/selected file: dashboard.png/i),
    ).toBeInTheDocument();

    expect(
      screen.getByRole("button", { name: /run ai analysis/i }),
    ).toBeEnabled();
  });

  it("rejects an unsupported file type when dropped into the upload zone", () => {
    render(
      <MemoryRouter>
        <AnalyzePage />
      </MemoryRouter>,
    );

    const file = new File(["mock text"], "notes.txt", {
      type: "text/plain",
    });

    const dropZone = screen
      .getByText(/drop your dashboard image here/i)
      .closest("section");

    expect(dropZone).not.toBeNull();

    fireEvent.drop(dropZone as HTMLElement, {
      dataTransfer: {
        files: [file],
      },
    });

    expect(
      screen.getByText(/only png, jpg, and jpeg files are allowed/i),
    ).toBeInTheDocument();

    expect(
      screen.getByRole("button", { name: /run ai analysis/i }),
    ).toBeDisabled();
  });

  it("runs analysis and navigates to the results page when the API succeeds", async () => {
    const user = userEvent.setup();

    render(
      <MemoryRouter>
        <AnalyzePage />
      </MemoryRouter>,
    );

    const file = new File(["mock image"], "dashboard.png", {
      type: "image/png",
    });

    const fileInput = document.querySelector(
      'input[type="file"]',
    ) as HTMLInputElement;

    await user.upload(fileInput, file);

    await user.click(screen.getByRole("button", { name: /run ai analysis/i }));

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith(
        "/results",
        expect.objectContaining({
          state: expect.objectContaining({
            uploadedImageUrl: "blob:mock-preview-url",
            analysisResult: expect.objectContaining({
              status: "compliant",
              score: 93,
            }),
          }),
        }),
      );
    });
  });
});
