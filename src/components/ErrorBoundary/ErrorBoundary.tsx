import { Component, ErrorInfo, ReactNode } from "react";
import "./styles.css";

interface IProps {
  children?: ReactNode;
}

interface IErrorBoundaryState {
  hasError: boolean;
}

export class ErrorBoundary extends Component<IProps> {
  state: Readonly<IErrorBoundaryState> = {
    hasError: false,
  };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="error">
          <h1>Something went wrong.</h1>;
        </div>
      );
    }

    return this.props.children;
  }
}
