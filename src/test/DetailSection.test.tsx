// DetailSection.test.tsx
import { test, expect } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { DetailSection } from "../components/SearchPage/SearchPageItem/DetailSection/DetailSection";

const mockDetail = {
  name: "Luke Skywalker",
  height: "172",
  mass: "77",
  hair_color: "blond",
  skin_color: "fair",
  eye_color: "blue",
  birth_year: "19BBY",
  gender: "male",
};

test("Check that a loading indicator is displayed while fetching data", async () => {
  // Mock fetch to return a promise that resolves after a delay

  render(
    <MemoryRouter initialEntries={["/search/1"]}>
      <Routes>
        <Route path="/search/:detailsId" element={<DetailSection />} />
      </Routes>
    </MemoryRouter>,
  );

  // Check if the loading indicator is shown initially
  expect(screen.getByText(/LOADING.../i)).toBeInTheDocument();

  // Wait for the data to be fetched and the component to re-render
  await waitFor(() => {
    expect(screen.queryByText(/LOADING.../i)).not.toBeInTheDocument();
  });
});

test("Make sure the detailed card component correctly displays the detailed card data", async () => {
  render(
    <MemoryRouter initialEntries={["/search/1"]}>
      <Routes>
        <Route path="/search/:detailsId" element={<DetailSection />} />
      </Routes>
    </MemoryRouter>,
  );

  // Wait for the data to be fetched and the component to re-render
  await waitFor(() => {
    expect(screen.getByText(mockDetail.name)).toBeInTheDocument();
    expect(
      screen.getByText(`Height: ${mockDetail.height}`),
    ).toBeInTheDocument();
    expect(screen.getByText(`Mass: ${mockDetail.mass}`)).toBeInTheDocument();
    expect(
      screen.getByText(`Hair Color: ${mockDetail.hair_color}`),
    ).toBeInTheDocument();
    expect(
      screen.getByText(`Skin color: ${mockDetail.skin_color}`),
    ).toBeInTheDocument();
    expect(
      screen.getByText(`Eye color: ${mockDetail.eye_color}`),
    ).toBeInTheDocument();
    expect(
      screen.getByText(`Birth year: ${mockDetail.birth_year}`),
    ).toBeInTheDocument();
    expect(
      screen.getByText(`Gender: ${mockDetail.gender}`),
    ).toBeInTheDocument();
  });
});

test("Ensure that clicking the close button hides the component", async () => {
  render(
    <MemoryRouter initialEntries={["/search/1"]}>
      <Routes>
        <Route path="/search/:detailsId" element={<DetailSection />} />
        <Route path="/search" element={<div>Search Page</div>} />
      </Routes>
    </MemoryRouter>,
  );

  // Wait for the data to be fetched and the component to re-render
  await waitFor(() => {
    expect(screen.getByText(mockDetail.name)).toBeInTheDocument();
  });

  // Click the close button
  const closeButton = screen.getByText(/Close/i);
  userEvent.click(closeButton);

  // Check that the component is hidden (or redirected to the search page)
  await waitFor(() => {
    expect(screen.getByText(/Search Page/i)).toBeInTheDocument();
  });
});
