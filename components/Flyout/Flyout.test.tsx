import { describe, expect, it, vi } from "vitest";
import Flyout from "./Flyout";
import { screen } from "@testing-library/dom";

import userEvent from "@testing-library/user-event";
import { addItem } from "../../lib/selectedItemsSlice";
import { Provider } from "react-redux";
import { render } from "@testing-library/react";
import { setupStore } from "../../lib/store";
import React from "react";

describe("test flyout", () => {
  it("check render flyout if no selected items", () => {
    const store = setupStore();
    render(
      <Provider store={store}>
        <Flyout />
      </Provider>,
    );

    expect(screen.queryByText(/items are selected/)).not.toBeInTheDocument();
  });
  it("check render flyout if selected items", () => {
    const store = setupStore();
    store.dispatch(
      addItem({
        hair_color: "black",
        height: "180",
        mass: "80",
        name: "test",
        url: "test",
      }),
    );
    global.URL.createObjectURL = vi.fn();
    render(
      <Provider store={store}>
        <Flyout />
      </Provider>,
    );

    expect(screen.queryByText(/1 items are selected/)).toBeInTheDocument();
  });

  it("check render flyout download button", async () => {
    const store = setupStore();
    store.dispatch(
      addItem({
        hair_color: "black",
        height: "180",
        mass: "80",
        name: "test",
        url: "test",
      }),
    );
    global.URL.createObjectURL = vi.fn();
    render(
      <Provider store={store}>
        <Flyout />
      </Provider>,
    );
    const downloadBtn = screen.getByRole("download");
    await userEvent.click(downloadBtn);

    expect(global.URL.createObjectURL).toHaveBeenCalledTimes(1);
  });

  it("check render flyout unselect button", async () => {
    const store = setupStore();
    store.dispatch(
      addItem({
        hair_color: "black",
        height: "180",
        mass: "80",
        name: "test",
        url: "test",
      }),
    );
    global.URL.createObjectURL = vi.fn();
    render(
      <Provider store={store}>
        <Flyout />
      </Provider>,
    );
    const unselectBtn = screen.getByRole("unselectBtn");
    await userEvent.click(unselectBtn);

    expect(store.getState().selectedItems.selectedItems).toEqual({});
  });
});
