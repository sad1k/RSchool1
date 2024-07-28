import { MemoryRouter } from "react-router-dom";
import App from "./App";
import { renderWithProviders } from "./utils/test-utils";
import { describe, expect, it } from "vitest";
import { screen } from "@testing-library/dom";
import userEvent from "@testing-library/user-event";
import { http, HttpResponse } from "msw";
import { server } from "../vitest.setup";
import { QueryParams } from "./mocks/api/handlers";

describe("test app component", () => {
  it("test NotFound component it should render when not corrent link", () => {
    renderWithProviders(
      <MemoryRouter initialEntries={["/404"]}>
        <App />
      </MemoryRouter>,
    );

    const page = screen.getByText(/404 - Page Not Found/);
    expect(page).toBeInTheDocument();
  });

  it("test NotFound button it redirect to home", async () => {
    renderWithProviders(
      <MemoryRouter initialEntries={["/404"]}>
        <App />
      </MemoryRouter>,
    );

    const page = screen.getByText(/404 - Page Not Found/);
    expect(page).toBeInTheDocument();
    const link = screen.getByRole("linktohome");

    await userEvent.click(link);

    const homePage = screen.getByRole("search-section");

    expect(homePage).toBeInTheDocument();
  });

  it("test Errorboundry when error request", async () => {
    server.use(
      http.get<QueryParams>("https://swapi.dev/api/people", () => {
        return new HttpResponse(null, { status: 500 });
      }),
    );

    renderWithProviders(
      <MemoryRouter initialEntries={["/"]}>
        <App />
      </MemoryRouter>,
    );

    const error = await screen.findByRole("error");

    expect(error).toBeInTheDocument();
  });
});
