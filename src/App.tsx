import { Component } from "react";
import { SearchPage } from "./components/SearchPage/SearchPage";
import { ErrorBoundary } from "./components/ErrorBoundary/ErrorBoundary";
import "./index.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { NotFound } from "./components/NotFound/NotFound";
import { DetailSection } from "./components/SearchPage/SearchPageItem/DetailSection/DetailSection";

export default class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <ErrorBoundary>
          <Routes>
            <Route path="/search/:page" element={<SearchPage />}>
              <Route path=":detailsId" element={<DetailSection />} />
            </Route>
            <Route path="/" element={<Navigate to="/search/1" />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </ErrorBoundary>
      </BrowserRouter>
    );
  }
}
