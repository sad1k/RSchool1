import { test, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { ISearchItem, SearchItem } from "./SearchItem";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import React from "react";
import { Provider } from "react-redux";
import selectedItemsReducer, {
  initialState,
} from "../../lib/selectedItemsSlice";
import { setupStore } from "../../lib/store";

test("SearchItem renders person details correctly", () => {
  vi.mock("next/router", () => ({
    useRouter: () => ({
      query: {},
      push: vi.fn(),
    }),
  }));

  const mockPerson: ISearchItem = {
    name: "Luke Skywalker",
    height: "172",
    mass: "77",
    hair_color: "blond",
    url: "https://swapi.dev/api/people/1/",
  };
  selectedItemsReducer(initialState, {
    type: "unknown",
  });
  const store = setupStore();
  render(
    <Provider store={store}>
      <SearchItem person={mockPerson} />
    </Provider>,
  );

  expect(screen.getByText(`Имя: ${mockPerson.name}`)).toBeTruthy();
  expect(screen.getByText(`Рост: ${mockPerson.height} см`)).toBeTruthy();
  expect(screen.getByText(`Вес: ${mockPerson.mass} кг`)).toBeTruthy();
  expect(screen.getByText(`Цвет волос: ${mockPerson.hair_color}`)).toBeTruthy();
});

test("SearchItem triggers onItemClick callback when clicked", async () => {
  const mockRouter = vi.hoisted(() => ({
    push: vi.fn(),
  }));

  vi.mock("next/router", () => ({
    useRouter: () => mockRouter,
  }));

  const mockPerson: ISearchItem = {
    name: "Luke Skywalker",
    height: "172",
    mass: "77",
    hair_color: "blond",
    url: "https://swapi.dev/api/people/1/",
  };

  const store = setupStore();

  render(
    <Provider store={store}>
      <SearchItem person={mockPerson} />
    </Provider>,
  );

  const personDiv = screen.getByText(`Имя: ${mockPerson.name}`);
  expect(personDiv).toBeTruthy();

  await userEvent.click(personDiv);

  expect(mockRouter.push).toBeCalled();
  expect(mockRouter.push).toBeCalledWith("?detailsId=1");
});

test("SearchItem store to the store favourite item", async () => {
  const mockPerson: ISearchItem = {
    name: "Luke Skywalker",
    height: "172",
    mass: "77",
    hair_color: "blond",
    url: "https://swapi.dev/api/people/1/",
  };

  const store = setupStore();

  render(
    <Provider store={store}>
      <SearchItem person={mockPerson} />
    </Provider>,
  );

  const checkbox = screen.getByRole(`checkbox`);
  expect(checkbox).toBeTruthy();

  await userEvent.click(checkbox);

  expect(Object.keys(store.getState().selectedItems.selectedItems).length).toBe(
    1,
  );
});
