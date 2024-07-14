import { test, expect } from "vitest";
import React from "react"; // Import React
import { render, screen } from "@testing-library/react";
import { ISearchItem } from "../components/SearchPage/SearchPageItem/SearchItem";
import { SearchList } from "../components/SearchPage/SearchList/SearchList";
import "@testing-library/jest-dom";

test("SearchList renders the specified number of cards", () => {
  const mockResults: ISearchItem[] = [
    {
      name: "Luke Skywalker",
      height: "172",
      mass: "77",
      hair_color: "blond",
      url: "https://swapi.dev/api/people/1/",
    },
    {
      name: "Darth Vader",
      height: "202",
      mass: "136",
      hair_color: "none",
      url: "https://swapi.dev/api/people/4/",
    },
    {
      name: "C-3PO",
      height: "167",
      mass: "75",
      hair_color: "n/a",
      url: "https://swapi.dev/api/people/2/",
    },
    {
      name: "R2-D2",
      height: "96",
      mass: "32",
      hair_color: "n/a",
      url: "https://swapi.dev/api/people/3/",
    },
    {
      name: "Leia Organa",
      height: "150",
      mass: "49",
      hair_color: "brown",
      url: "https://swapi.dev/api/people/5/",
    },
    {
      name: "Owen Lars",
      height: "178",
      mass: "120",
      hair_color: "brown, grey",
      url: "https://swapi.dev/api/people/6/",
    },
  ];

  const onItemClick = () => {}; // Mock function

  render(<SearchList results={mockResults} onItemClick={onItemClick} />);

  const cards = screen.getAllByText(/Имя:/i);
  expect(cards.length).toBe(mockResults.length);
});

test("SearchList displays appropriate message if no cards are present", () => {
  render(<SearchList results={null} onItemClick={() => {}} />);

  const message = screen.getByText(/No such results/i);
  expect(message).toBeInTheDocument();
});
