import { describe, expect, it, vi } from "vitest";
import { renderWithProviders } from "../../../utils/test-utils";
import { MemoryRouter } from "react-router-dom";
import Flyout from "./Flyout";
import { screen } from "@testing-library/dom";
import selectedItemsReducer, {
  initialState,
  addItem,
} from "./../../../store/selectedItemsSlice";
import { setupStore } from "../../../store/store";
import userEvent from "@testing-library/user-event";

describe("test flyout", () => {
  it("check render flyout if no selected items", () => {
    renderWithProviders(
      <MemoryRouter>
        <Flyout />
      </MemoryRouter>,
    );

    expect(screen.queryByText(/items are selected/)).not.toBeInTheDocument();
  });
  it("check render flyout if selected items", () => {
    const selectedItemState = selectedItemsReducer(
      initialState,
      addItem({
        hair_color: "black",
        height: "180",
        mass: "80",
        name: "test",
        url: "test",
      }),
    );
    global.URL.createObjectURL = vi.fn();

    renderWithProviders(
      <MemoryRouter>
        <Flyout />
      </MemoryRouter>,
      {
        store: setupStore({ selectedItems: selectedItemState }),
      },
    );

    expect(screen.queryByText(/1 items are selected/)).toBeInTheDocument();
  });

  it("check render flyout download button", async () => {
    const selectedItemState = selectedItemsReducer(
      initialState,
      addItem({
        hair_color: "black",
        height: "180",
        mass: "80",
        name: "test",
        url: "test",
      }),
    );
    global.URL.createObjectURL = vi.fn();

    renderWithProviders(
      <MemoryRouter>
        <Flyout />
      </MemoryRouter>,
      {
        store: setupStore({ selectedItems: selectedItemState }),
      },
    );

    const downloadBtn = screen.getByRole("download");
    await userEvent.click(downloadBtn);

    expect(global.URL.createObjectURL).toHaveBeenCalledTimes(1);
  });

  it("check render flyout unselect button", async () => {
    const selectedItemState = selectedItemsReducer(
      initialState,
      addItem({
        hair_color: "black",
        height: "180",
        mass: "80",
        name: "test",
        url: "test",
      }),
    );
    global.URL.createObjectURL = vi.fn();

    const { store } = renderWithProviders(
      <MemoryRouter>
        <Flyout />
      </MemoryRouter>,
      {
        store: setupStore({ selectedItems: selectedItemState }),
      },
    );

    const unselectBtn = screen.getByRole("unselectBtn");
    await userEvent.click(unselectBtn);

    expect(store.getState().selectedItems.selectedItems).toEqual({});
  });
});
