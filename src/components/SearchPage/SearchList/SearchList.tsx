import { ISearchItem, SearchItem } from "../SearchPageItem/SearchItem";
import "./styles.css";

interface IProps {
  results: Array<ISearchItem> | null;
}

export function SearchList({ results }: IProps): JSX.Element {
  return (
    <div className="person-list">
      {results &&
        results.map((item) => <SearchItem key={item.name} person={item} />)}
    </div>
  );
}
