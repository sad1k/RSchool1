import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setSearchTerm } from "../store/cardsSlice";
import { useAppSelector } from "../store/store";

export function useSearchTerm() {
  const searchTerm = useAppSelector((state) => state.cards.searchTerm);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setSearchTerm(searchTerm));
  }, [dispatch, searchTerm]);

  return searchTerm;
}
