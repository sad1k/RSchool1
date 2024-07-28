import { SearchPage } from "./components/SearchPage/SearchPage";
import "./index.css";
import { Navigate, Route, Routes } from "react-router-dom";
import { NotFound } from "./components/NotFound/NotFound";
import { DetailSection } from "./components/SearchPage/SearchPageItem/DetailSection/DetailSection";
import { ErrorBoundary } from "./components/ErrorBoundary/ErrorBoundary";
import Flyout from "./components/SearchPage/Flyout/Flyout";

export default function App() {
  return (
    <ErrorBoundary>
      <Routes>
        <Route path="/search/:page" element={<SearchPage />}>
          <Route path=":detailsId" element={<DetailSection />} />
        </Route>
        <Route path="/" element={<Navigate to="/search/1" />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <>
        <Flyout />
      </>
    </ErrorBoundary>
  );
}
