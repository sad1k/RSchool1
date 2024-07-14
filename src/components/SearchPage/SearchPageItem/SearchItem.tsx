import "./styles.css";

export interface ISearchItem {
  name: string;
  height: string;
  mass: string;
  hair_color: string;
  url: string;
}

interface IProps {
  person: ISearchItem;
  onItemClick: (id: string) => void;
}

export function SearchItem({ person, onItemClick }: IProps): JSX.Element {
  return (
    <div
      role="item"
      className="person"
      onClick={() => {
        onItemClick(person.url.split("/").at(-2) || "0");
      }}
    >
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
