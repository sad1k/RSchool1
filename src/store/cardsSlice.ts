import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ISearchItem } from "../components/SearchPage/SearchPageItem/SearchItem";

export interface State {
  cards: ISearchItem[];
  currentPage: number;
  maxCountCards: number;
  searchTerm: string;
}

export const initialState: State = {
  cards: [],
  currentPage: 1,
  maxCountCards: 10,
  searchTerm: "",
};

const cardsSlice = createSlice({
  name: "cards",
  initialState,
  reducers: {
    addCards(state, action: PayloadAction<ISearchItem[] | undefined>) {
      state.cards = action.payload || [];
    },
    setMaxCountCards(state, action: PayloadAction<number>) {
      state.maxCountCards = action.payload;
    },
    setCurrentPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload;
    },
    setSearchTerm(state, action: PayloadAction<string>) {
      state.searchTerm = action.payload;
    },
  },
});

export const { addCards, setCurrentPage, setSearchTerm, setMaxCountCards } =
  cardsSlice.actions;
export default cardsSlice.reducer;
