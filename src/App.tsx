import { Component } from "react";
import { SearchPage } from "./components/SearchPage/SearchPage";
import { ErrorBoundary } from "./components/ErrorBoundary/ErrorBoundary";

export default class App extends Component {
  render() {
    return (
      <>
        <ErrorBoundary>
          <SearchPage />
        </ErrorBoundary>
      </>
    );
  }
}
