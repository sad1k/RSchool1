import { test, expect } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { RouterContext } from "next/dist/shared/lib/router-context.shared-runtime";
import { createMockRouter } from "../../test-utils/createMockRouter";
import React from "react";
import DetailSection, { Detail } from "./DetailSection";

const mockDetail: Detail = {
  name: "Luke Skywalker",
  height: "172",
  mass: "77",
  hair_color: "blond",
  skin_color: "fair",
  eye_color: "blue",
  birth_year: "19BBY",
  gender: "male",
  url: "",
};

test("Make sure the detailed card component correctly displays the detailed card data", async () => {
  const router = createMockRouter({});

  render(
    <RouterContext.Provider value={router}>
      <DetailSection person={mockDetail} />
    </RouterContext.Provider>,
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
  const router = createMockRouter({ query: { detailsId: "1" } });
  window.location.search = "?detailsId=1";
  render(
    <RouterContext.Provider value={router}>
      <DetailSection person={mockDetail} />
    </RouterContext.Provider>,
  );

  await waitFor(() => {
    expect(screen.getByText(mockDetail.name)).toBeInTheDocument();
  });

  const closeButton = screen.getByText(/Close/i);
  userEvent.click(closeButton);
  await waitFor(() => {
    expect(router.push).toHaveBeenCalledWith("?");
  });
});
