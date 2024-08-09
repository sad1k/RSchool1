import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import selectedItemsReducer from "./selectedItemsSlice";
import { useDispatch, useSelector } from "react-redux";
import { createWrapper } from "next-redux-wrapper";
import { Detail } from "../components/DetailSection/DetailSection";
import { ApiResponse } from "../pages";

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
  selectedItems: selectedItemsReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
  });
};

export type AppDispatch = AppStore["dispatch"];

export type AppStore = ReturnType<typeof setupStore>;

export const useAppSelector = useSelector.withTypes<RootState>();

export const useAppDispatch = () => useDispatch<AppDispatch>();

export const wrapper = createWrapper<AppStore>(setupStore, { debug: true });
