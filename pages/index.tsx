import { GetServerSideProps, InferGetServerSidePropsType } from "next/types";
import React from "react";
import { SearchItem } from "../components/SearchItem/SearchItem";
import { Pagination } from "../components/Pagination/Pagination";
import { useRouter } from "next/router";
import DetailSection from "../components/DetailSection/DetailSection";
import { wrapper } from "../lib/store";

export interface ApiResponse {
  count: number;
  next: string;
  previous: string | null;
  results: Array<Detail>;
}

export interface Detail extends ISearchItem {
  name: string;
  height: string;
  mass: string;
  hair_color: string;
  skin_color: string;
  eye_color: string;
  birth_year: string;
  gender: string;
}

interface ISearchItem {
  name: string;
  height: string;
  mass: string;
  hair_color: string;
  url: string;
}

const Page = ({
  data,
  details,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const results = data.results;
  const router = useRouter();
  return (
    <>
      <div className="page">
        <div className="searchList">
          <div className="person-list">
            {results.length === 0 && <p>No such results</p>}
            {results.length > 0 &&
              results.map((item) => (
                <SearchItem key={item.name} person={item} />
              ))}
          </div>
        </div>
        {router.query.detailsId ? <DetailSection person={details} /> : false}
      </div>
      <Pagination
        maxCount={data.count}
        currentPage={
          Array.isArray(router.query.page)
            ? router.query.page[0]
            : router.query.page ?? ""
        }
      />
    </>
  );
};

export default Page;

export const getServerSideProps = wrapper.getServerSideProps(
  () =>
    (async (context) => {
      const params = new URLSearchParams(context.resolvedUrl.slice(2));
      if (params.has("detailsId")) {
        const res = await fetch(
          `https://swapi.dev/api/people/?${params.toString()}`,
        );
        const data: ApiResponse = await res.json();
        const resDetails = await fetch(
          `https://swapi.dev/api/people/${params.get("detailsId")}`,
        );
        const details: Detail = await resDetails.json();
        return {
          props: {
            data,
            details,
          },
        };
      } else {
        const res = await fetch(
          `https://swapi.dev/api/people/?${params.toString()}`,
        );
        const data: ApiResponse = await res.json();
        return {
          props: {
            data,
            details: {
              name: "",
              birth_year: "",
              eye_color: "",
              gender: "",
              hair_color: "",
              height: "",
              mass: "",
              skin_color: "",
              url: "",
            }, // передаем результаты в качестве пропсов
          },
        };
      }
    }) satisfies GetServerSideProps<
      { data: ApiResponse } | { data: ApiResponse; details: Detail }
    >,
);
