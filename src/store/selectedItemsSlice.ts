import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ISearchItem } from "../components/SearchPage/SearchPageItem/SearchItem";

export interface State {
  selectedItems: Record<UserId, ISearchItem | undefined>;
}

export const initialState: State = {
  selectedItems: {},
};

type UserId = string;

const selectedItemsSlice = createSlice({
  name: "selectedItems",
  initialState,
  reducers: {
    addItem(state = initialState, action: PayloadAction<ISearchItem>) {
      state.selectedItems[action.payload.name] = action.payload;
    },
    removeItem(state = initialState, action: PayloadAction<UserId>) {
      delete state.selectedItems[action.payload];
    },
    removeAllItems(state = initialState) {
      state.selectedItems = {};
    },
  },
});

export const { addItem, removeItem, removeAllItems } =
  selectedItemsSlice.actions;

export default selectedItemsSlice.reducer;
