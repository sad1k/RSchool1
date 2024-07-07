import { Component, ReactNode } from "react";
import { countPages } from "../../../utils/countPages";
import "./styles.css";

interface IProps {
  maxCount: number;
  onChangePage: (page: number) => void;
  currentPage: number;
}

interface IPaginationState {
  pages: Array<number>;
}

export class Pagination extends Component<IProps> {
  state: Readonly<IPaginationState> = {
    pages: countPages(
      this.props.currentPage,
      Math.ceil(this.props.maxCount / 10),
    ),
  };

  handleClick(page: number) {
    const maxPages: number = Math.ceil(this.props.maxCount / 10);
    this.setState({ pages: countPages(page, maxPages) });
    this.props.onChangePage(page);
  }

  render(): ReactNode {
    return (
      <div className="pagination">
        {this.state.pages.map((page) => (
          <button key={page} onClick={() => this.handleClick(page)}>
            {page}
          </button>
        ))}
      </div>
    );
  }
}
