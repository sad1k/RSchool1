import { useDispatch } from "react-redux";
import "./styles.css";
import { addItem, removeItem } from "../../../store/selectedItemsSlice";
import { useAppSelector } from "../../../store/store";
import { useNavigate } from "react-router-dom";
import { useRef } from "react";

export interface ISearchItem {
  name: string;
  height: string;
  mass: string;
  hair_color: string;
  url: string;
}

interface IProps {
  person: ISearchItem;
}

export function SearchItem({ person }: IProps): JSX.Element {
  const checkBoxRef = useRef<HTMLSpanElement>(null);

  const selectedItem = useAppSelector(
    (state) => state.selectedItems.selectedItems[person.name],
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const addPerson = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.checked) {
      dispatch(removeItem(person.name));
    } else {
      dispatch(addItem(person));
    }
  };

  const goToPerson = (e: React.MouseEvent<HTMLDivElement>) => {
    if (checkBoxRef.current?.contains(e.target as HTMLElement)) return;
    navigate(`${person.url.split("/").at(-2)}`);
  };
  return (
    <div role="item" className="person" onClick={(e) => goToPerson(e)}>
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
      <span ref={checkBoxRef}>
        <label className="checkbox" htmlFor={`favorite${person.name}`}>
          <h3>Добавить в избранное</h3>
          <input
            onChange={addPerson}
            checked={!!selectedItem?.name || false}
            type="checkbox"
            id={`favorite${person.name}`}
          />
        </label>
      </span>
    </div>
  );
}
