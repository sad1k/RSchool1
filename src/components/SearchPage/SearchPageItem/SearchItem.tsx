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

export function SearchItem({ person }: IProps): JSX.Element {
  return (
    <div className="person">
      <span>
        <h2>Имя: {person.name}</h2>
      </span>
      <span>
        <h3>Рост: {person.height} см</h3>
      </span>
      <span>
        <h3>Вес: {person.mass} кг</h3>
      </span>
      <span>
        <h3>Цвет волос: {person.hair_color}</h3>
      </span>
    </div>
  );
}
