import { Link } from "react-router-dom";
import "./styles.css";

export function NotFound(): JSX.Element {
  return (
    <div className="not-found">
      <h1>404 - Page Not Found</h1>
      <Link role="linktohome" to="/search/1">
        Go to Search Page
      </Link>
    </div>
  );
}
