import { useGetPeoplesBySearchPageLimitQuery } from "../store/store";
import { addCards, setMaxCountCards } from "../store/cardsSlice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSearchTerm } from "./useSearchTerm";

export function useFetchCards(page: number = 1, limit: number = 10) {
  const searchTerm = useSearchTerm();
  const dispatch = useDispatch();
  const {
    data,
    error: erroyByFetch,
    isFetching,
  } = useGetPeoplesBySearchPageLimitQuery({
    search: searchTerm,
    page,
    limit,
  });
  useEffect(() => {
    if (!isFetching) {
      dispatch(addCards(data?.results || []));
      dispatch(setMaxCountCards(data?.count || 10));
    }
  }, [data?.results, data?.count, dispatch, isFetching]);

  return { data, erroyByFetch, isFetching };
}
