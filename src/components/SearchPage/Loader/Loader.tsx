import { Component, ReactNode } from "react";
import "./styles.css";

export class Loader extends Component {
  render(): ReactNode {
    return <div className="loader">LOADING...</div>;
  }
}
