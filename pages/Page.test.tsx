import { render, screen } from "@testing-library/react";
import { expect, test } from "vitest";
import Page from ".";
import React from "react";
import { data, detail, emptyData, mockDetail } from "../mocks/mockDataResponse";
import { RouterContext } from "next/dist/shared/lib/router-context.shared-runtime";
import { createMockRouter } from "../test-utils/createMockRouter";
import { Provider } from "react-redux";
import { setupStore } from "../lib/store";

test("page shows correct count of cards", () => {
  const router = createMockRouter({});
  const store = setupStore();
  render(
    <Provider store={store}>
      <RouterContext.Provider value={router}>
        <Page data={data} details={detail} />
      </RouterContext.Provider>
    </Provider>,
  );

  const items = screen.getAllByRole("item");
  expect(items.length).toBe(10);
});

test("with zero card should display no such results", () => {
  const router = createMockRouter({});
  const store = setupStore();
  render(
    <Provider store={store}>
      <RouterContext.Provider value={router}>
        <Page data={emptyData} details={detail} />
      </RouterContext.Provider>
    </Provider>,
  );

  const items = screen.getByText(/No such results/i);
  expect(items).toBeInTheDocument();
});

test("query with detailsId should show component", () => {
  const router = createMockRouter({ query: { detailsId: "1" } });
  const store = setupStore();
  render(
    <Provider store={store}>
      <RouterContext.Provider value={router}>
        <Page data={data} details={mockDetail} />
      </RouterContext.Provider>
    </Provider>,
  );

  const details = screen.getByRole("details");
  expect(details).toBeInTheDocument();
});
