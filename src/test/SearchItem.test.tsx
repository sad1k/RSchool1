// SearchItem.test.tsx
import { test, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import {
  ISearchItem,
  SearchItem,
} from "../components/SearchPage/SearchPageItem/SearchItem";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";

test("SearchItem renders person details correctly", () => {
  const mockPerson: ISearchItem = {
    name: "Luke Skywalker",
    height: "172",
    mass: "77",
    hair_color: "blond",
    url: "https://swapi.dev/api/people/1/",
  };

  const onItemClick = () => {};

  render(<SearchItem person={mockPerson} onItemClick={onItemClick} />);

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

  let clickedId: string | undefined;

  const onItemClick = (id: string) => {
    clickedId = id;
  };

  render(<SearchItem person={mockPerson} onItemClick={onItemClick} />);

  const personDiv = screen
    .getByText(`Имя: ${mockPerson.name}`)
    .closest(".person");
  expect(personDiv).toBeTruthy();

  await userEvent.click(personDiv as HTMLElement);

  expect(clickedId).toBe("1");
});
