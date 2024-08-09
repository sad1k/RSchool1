import { useContext, useRef } from "react";
import React from "react";
import styles from "./SearchItem.module.css";
import { useRouter } from "next/router";
import { useAppSelector } from "../../lib/store";
import { useDispatch } from "react-redux";
import { addItem, removeItem } from "../../lib/selectedItemsSlice";
import { ThemeContext } from "../../ThemeContext/ThemeContext";

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

function getId(url: string): string {
  return url.split("/").at(-2) ?? "1";
}

export function SearchItem({ person }: IProps): JSX.Element {
  const checkBoxRef = useRef<HTMLSpanElement>(null);
  const router = useRouter();
  const dispatch = useDispatch();
  const { theme } = useContext(ThemeContext);

  const handleOpenDetails = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => {
    if (checkBoxRef.current?.contains(e.target as HTMLElement)) return;
    const newUrl = new URLSearchParams(window.location.search);
    newUrl.set("detailsId", getId(person.url));
    router.push(`?${newUrl.toString()}`);
  };

  const selectedItem = useAppSelector(
    (state) => state.selectedItems.selectedItems[person.name],
  );

  const addPerson = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.checked) {
      dispatch(removeItem(person.name));
    } else {
      dispatch(addItem(person));
    }
  };

  return (
    <div
      role="item"
      className={`${styles.person} ${theme ? styles.darkTheme : styles.lightTheme}`}
      onClick={(e) => handleOpenDetails(e)}
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
      <span ref={checkBoxRef}>
        <label className={styles.checkbox} htmlFor={`favorite${person.name}`}>
          <h3>Добавить в избранное</h3>
          <input
            role="checkbox"
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
