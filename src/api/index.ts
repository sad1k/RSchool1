import { Detail } from "../components/SearchPage/SearchPageItem/DetailSection/DetailSection";

export interface ApiResponse {
  count: number;
  next: string;
  previous: string | null;
  results: Array<Detail>;
}
