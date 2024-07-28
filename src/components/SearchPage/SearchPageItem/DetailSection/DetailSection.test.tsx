import { test, expect } from "vitest";
import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { DetailSection } from "./DetailSection";
import { renderWithProviders } from "../../../../utils/test-utils";

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
  const { getByText } = renderWithProviders(
    <MemoryRouter initialEntries={["/1/"]}>
      <Routes>
        <Route path=":detailsId" element={<DetailSection />} />
      </Routes>
    </MemoryRouter>,
  );
  const loadingElement = getByText("LOADING...");

  expect(loadingElement).toBeInTheDocument();

  await waitFor(() => {
    expect(loadingElement).not.toBeInTheDocument();
  });
});

test("Make sure the detailed card component correctly displays the detailed card data", async () => {
  renderWithProviders(
    <MemoryRouter initialEntries={["/search/1"]}>
      <Routes>
        <Route path="/search/:detailsId" element={<DetailSection />} />
      </Routes>
    </MemoryRouter>,
  );

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
  renderWithProviders(
    <MemoryRouter initialEntries={["/1"]}>
      <Routes>
        <Route path="/:detailsId" element={<DetailSection />} />
      </Routes>
    </MemoryRouter>,
  );

  await waitFor(() => {
    expect(screen.getByText(mockDetail.name)).toBeInTheDocument();
  });

  const closeButton = screen.getByText(/Close/i);
  userEvent.click(closeButton);

  await waitFor(() => {
    expect(closeButton).not.toBeInTheDocument();
  });
});
