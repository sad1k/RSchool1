import selectedItemsReducer, {
  addItem,
  initialState,
  removeItem,
} from "../selectedItemsSlice";
import { describe, expect, it } from "vitest";

describe("check removeItem reducer", () => {
  it("should delete item", () => {
    const addItemState = selectedItemsReducer(
      initialState,
      addItem({
        hair_color: "black",
        height: "180",
        mass: "80",
        name: "test",
        url: "test",
      }),
    );

    const removeItemState = selectedItemsReducer(
      addItemState,
      removeItem("test"),
    );

    expect(Object.keys(initialState.selectedItems).length).toBe(0);
    expect(Object.keys(addItemState.selectedItems).length).toBe(1);
    expect(Object.keys(removeItemState.selectedItems).length).toBe(0);
  });
});
