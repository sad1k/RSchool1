import { ISearchItem, SearchItem } from "../SearchPageItem/SearchItem";
import "./styles.css";

interface IProps {
  results: Array<ISearchItem> | null;
  onItemClick: (id: string) => void;
}

export function SearchList({ results, onItemClick }: IProps): JSX.Element {
  return (
    <div className="person-list">
      {!results && <p>No such results</p>}
      {results &&
        results.map((item) => (
          <SearchItem onItemClick={onItemClick} key={item.name} person={item} />
        ))}
    </div>
  );
}
