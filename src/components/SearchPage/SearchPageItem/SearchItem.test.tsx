import { test, expect } from "vitest";
import { screen } from "@testing-library/react";
import { ISearchItem, SearchItem } from "./SearchItem";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import { renderWithProviders } from "../../../utils/test-utils";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { DetailSection } from "./DetailSection/DetailSection";

test("SearchItem renders person details correctly", () => {
  const mockPerson: ISearchItem = {
    name: "Luke Skywalker",
    height: "172",
    mass: "77",
    hair_color: "blond",
    url: "https://swapi.dev/api/people/1/",
  };
  renderWithProviders(
    <MemoryRouter initialEntries={["/search/1"]}>
      <SearchItem person={mockPerson} />
    </MemoryRouter>,
  );

  expect(screen.getByText(`Имя: ${mockPerson.name}`)).toBeTruthy();
  expect(screen.getByText(`Рост: ${mockPerson.height} см`)).toBeTruthy();
  expect(screen.getByText(`Вес: ${mockPerson.mass} кг`)).toBeTruthy();
  expect(screen.getByText(`Цвет волос: ${mockPerson.hair_color}`)).toBeTruthy();
});

test("SearchItem triggers onItemClick callback when clicked", async () => {
  const mockPerson: ISearchItem = {
    name: "Luke Skywalker",
    height: "172",
    mass: "77",
    hair_color: "blond",
    url: "https://swapi.dev/api/people/1/",
  };

  renderWithProviders(
    <MemoryRouter initialEntries={["/search"]}>
      <Routes>
        <Route path="/search" element={<SearchItem person={mockPerson} />}>
          <Route path=":detailsId" element={<DetailSection />} />
        </Route>
      </Routes>
    </MemoryRouter>,
  );

  const personDiv = screen.getByText(`Имя: ${mockPerson.name}`);
  expect(personDiv).toBeTruthy();

  await userEvent.click(personDiv);

  const divElement = await screen.findByText(`Имя: ${mockPerson.name}`);

  expect(divElement).toBeInTheDocument();
});
