import { Component, ReactNode } from "react";
import { ISearchItem, SearchItem } from "../SearchPageItem/SearchItem";
import "./styles.css";

interface IProps {
  results: Array<ISearchItem> | null;
}

export class SearchList extends Component<IProps> {
  render(): ReactNode {
    return (
      <div className="person-list">
        {this.props.results &&
          this.props.results.map((item) => (
            <SearchItem key={item.name} person={item} />
          ))}
      </div>
    );
  }
}
