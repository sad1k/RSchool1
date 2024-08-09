import { ApiResponse, Detail } from "../pages";
import { getPeople } from "./mockPeople";

export const data: ApiResponse = {
  count: 10,
  next: "",
  previous: "",
  results: getPeople(10),
};

export const emptyData: ApiResponse = {
  count: 10,
  next: "",
  previous: "",
  results: [],
};

export const detail: Detail = {
  name: "",
  birth_year: "",
  eye_color: "",
  gender: "",
  hair_color: "",
  height: "",
  mass: "",
  skin_color: "",
  url: "",
};

export const mockDetail: Detail = {
  name: "Luke Skywalker",
  height: "172",
  mass: "77",
  hair_color: "blond",
  skin_color: "fair",
  eye_color: "blue",
  birth_year: "19BBY",
  gender: "male",
  url: "",
};
