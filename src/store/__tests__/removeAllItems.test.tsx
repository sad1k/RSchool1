import selectedItemsReducer, {
  addItem,
  initialState,
  removeAllItems,
} from "../selectedItemsSlice";
import { describe, expect, it } from "vitest";

describe("check removeAllItems reducer", () => {
  it("should delete all items", () => {
    const addItemStateFirst = selectedItemsReducer(
      initialState,
      addItem({
        hair_color: "black",
        height: "180",
        mass: "80",
        name: "test1",
        url: "test",
      }),
    );
    const addItemStateSecond = selectedItemsReducer(
      addItemStateFirst,
      addItem({
        hair_color: "black",
        height: "180",
        mass: "80",
        name: "test2",
        url: "test",
      }),
    );
    const addItemStateThird = selectedItemsReducer(
      addItemStateSecond,
      addItem({
        hair_color: "black",
        height: "180",
        mass: "80",
        name: "test3",
        url: "test",
      }),
    );

    const removeAllItemsState = selectedItemsReducer(
      addItemStateThird,
      removeAllItems(),
    );

    expect(Object.keys(initialState.selectedItems).length).toBe(0);
    expect(Object.keys(addItemStateThird.selectedItems).length).toBe(3);
    expect(Object.keys(removeAllItemsState.selectedItems).length).toBe(0);
  });
});
