import { describe, expect, it } from "vitest";
import { renderWithProviders } from "../../../utils/test-utils";
import { SearchBar } from "./SearchBar";
import { fireEvent, screen } from "@testing-library/dom";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { ThemeProvider } from "../../../ThemeContext/ThemeContext";

describe("SearchBar tests", () => {
  it("test input", async () => {
    renderWithProviders(
      <MemoryRouter initialEntries={["/"]}>
        <SearchBar />
      </MemoryRouter>,
    );
    const input = screen.getByRole("search");
    await userEvent.click(input);
    await userEvent.keyboard("test");
    expect(input).toHaveValue("test");
  });

  it("test search button", async () => {
    const { store } = renderWithProviders(
      <MemoryRouter initialEntries={["/"]}>
        <Routes>
          <Route path="/" element={<SearchBar />} />
          <Route path="/search/1" element={<div>Test div</div>} />
        </Routes>
      </MemoryRouter>,
    );

    const input = screen.getByRole("search");
    await userEvent.click(input);
    await userEvent.keyboard("test");
    const button = screen.getByText(/Search/i);
    fireEvent.click(button);
    expect(store.getState().cards.searchTerm).toBe("test");

    expect(screen.getByText("Test div")).toBeInTheDocument();
  });

  it("test theme button", async () => {
    renderWithProviders(
      <ThemeProvider>
        <MemoryRouter initialEntries={["/"]}>
          <Routes>
            <Route path="/" element={<SearchBar />} />
            <Route path="/search/1" element={<div>Test div</div>} />
          </Routes>
        </MemoryRouter>
      </ThemeProvider>,
    );

    const button = screen.getByRole("theme-btn");
    await userEvent.click(button);
    const div = screen.getByRole("search-section");
    expect(div.className.includes("darkTheme")).toBeTruthy();
  });
});
