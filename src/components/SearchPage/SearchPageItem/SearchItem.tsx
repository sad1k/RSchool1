import { Component, ReactNode } from "react";
import "./styles.css";

export interface ISearchItem {
  name: string;
  height: string;
  mass: string;
  hair_color: string;
}

interface IProps {
  person: ISearchItem;
}

export class SearchItem extends Component<IProps> {
  render(): ReactNode {
    return (
      <div className="person">
        <span>
          <h2>Имя: {this.props.person.name}</h2>
        </span>
        <span>
          <h3>Рост: {this.props.person.height} см</h3>
        </span>
        <span>
          <h3>Вес: {this.props.person.mass} кг</h3>
        </span>
        <span>
          <h3>Цвет волос: {this.props.person.hair_color}</h3>
        </span>
      </div>
    );
  }
}
