import { useAppSelector } from "../../../store/store";
import { SearchItem } from "../SearchPageItem/SearchItem";
import "./styles.css";

export function SearchList(): JSX.Element {
  const results = useAppSelector((state) => state.cards.cards);
  return (
    <div className="person-list">
      {results.length === 0 && <p>No such results</p>}
      {results &&
        results.map((item) => <SearchItem key={item.name} person={item} />)}
    </div>
  );
}
