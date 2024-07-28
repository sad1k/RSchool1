import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ApiResponse } from "../api";
import selectedItemsReducer from "./selectedItemsSlice";
import cardsReducer from "./cardsSlice";
import { useSelector } from "react-redux";
import { Detail } from "../components/SearchPage/SearchPageItem/DetailSection/DetailSection";

export interface QueryParams {
  search: string;
  page: number;
  limit: number;
}

export const starWarsApi = createApi({
  reducerPath: "starWarsApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://swapi.dev/api/" }),
  endpoints: (builder) => ({
    getPeoplesBySearchPageLimit: builder.query<ApiResponse, QueryParams>({
      query: (arg: QueryParams) => ({ url: `people/`, params: arg }),
    }),
    getPeopleById: builder.query<Detail, number>({
      query: (id) => ({ url: `people/${id}` }),
    }),
  }),
});

export const { useGetPeoplesBySearchPageLimitQuery, useGetPeopleByIdQuery } =
  starWarsApi;

export const rootReducer = combineReducers({
  [starWarsApi.reducerPath]: starWarsApi.reducer,
  selectedItems: selectedItemsReducer,
  cards: cardsReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export const setupStore = (preloadedState: Partial<RootState>) => {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(starWarsApi.middleware),
  });
};

export type AppStore = ReturnType<typeof setupStore>;

export const useAppSelector = useSelector.withTypes<RootState>();
