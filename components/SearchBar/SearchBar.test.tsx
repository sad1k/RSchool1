import { describe, expect, it } from "vitest";
import SearchBar from "./SearchBar";
import { fireEvent, screen } from "@testing-library/dom";
import userEvent from "@testing-library/user-event";
import { render } from "@testing-library/react";
import React from "react";
import { RouterContext } from "next/dist/shared/lib/router-context.shared-runtime";
import { createMockRouter } from "../../test-utils/createMockRouter";
import { ThemeProvider } from "../../ThemeContext/ThemeContext";

describe("SearchBar tests", () => {
  it("test input", async () => {
    const router = createMockRouter({});
    render(
      <RouterContext.Provider value={router}>
        <SearchBar />
      </RouterContext.Provider>,
    );
    const input = screen.getByRole<HTMLInputElement>("search");
    await userEvent.click(input);
    await userEvent.keyboard("test");
    expect(input.value).toBe("test");
  });

  it("test search button", async () => {
    const router = createMockRouter({});
    render(
      <RouterContext.Provider value={router}>
        <SearchBar />
      </RouterContext.Provider>,
    );

    const input = screen.getByRole("search");
    await userEvent.click(input);
    await userEvent.keyboard("test");
    const button = screen.getByText(/Search/i);
    fireEvent.click(button);
    expect(router.push).toBeCalledWith("?search=test");
  });

  it("test theme button", async () => {
    const router = createMockRouter({});
    render(
      <ThemeProvider>
        <RouterContext.Provider value={router}>
          <SearchBar />
        </RouterContext.Provider>
      </ThemeProvider>,
    );

    const button = screen.getByRole("theme-btn");
    await userEvent.click(button);
    const div = screen.getByRole("search-section");
    expect(div.className.includes("darkTheme")).toBeTruthy();
  });
});
