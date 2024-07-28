import { http, HttpResponse } from "msw";
import { getPeople } from "../mockPeople";

export interface QueryParams {
  page: string;
  limit: string;
  searchTerm: string;
}

interface UserId {
  id: string;
}

export const handlers = [
  http.get<QueryParams>("https://swapi.dev/api/people", ({ params }) => {
    if (params.page === "1" && params.searchTerm === "") {
      return HttpResponse.json({
        count: 82,
        next: "https://swapi.dev/api/people/?page=2",
        previous: null,
        results: getPeople(10),
      });
    }
  }),
  http.get<UserId>("https://swapi.dev/api/people/:id", () => {
    return HttpResponse.json({
      name: "Luke Skywalker",
      height: "172",
      mass: "77",
      hair_color: "blond",
      skin_color: "fair",
      eye_color: "blue",
      birth_year: "19BBY",
      gender: "male",
    });
  }),
];
