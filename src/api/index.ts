import { ISearchItem } from "../components/SearchPage/SearchPageItem/SearchItem";

interface IApi {
  getPeople: (
    searchTerm: string,
    page: number,
    limit: number,
  ) => Promise<Response & ApiResponse>;
}

export interface ApiResponse {
  count: number;
  next: string;
  previous: string | null;
  results: Array<ISearchItem>;
}

export const api: IApi = {
  getPeople(searchTerm: string, page: number, limit: number) {
    return fetch(
      `https://swapi.dev/api/people/?search=${searchTerm}&page=${page}&limit=${limit}`,
    ).then((res: Response) => {
      return res.json();
    });
  },
};
