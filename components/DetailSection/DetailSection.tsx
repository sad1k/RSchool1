import React from "react";
import styles from "./DetailSection.module.css";
import { ISearchItem } from "../SearchItem/SearchItem";
import { useRouter } from "next/router";

export interface Detail extends ISearchItem {
  name: string;
  height: string;
  mass: string;
  hair_color: string;
  skin_color: string;
  eye_color: string;
  birth_year: string;
  gender: string;
}

const DetailSection = ({ person }: { person: Detail }) => {
  const detail = person;
  const router = useRouter();

  const handleClose = () => {
    const newUrl = new URLSearchParams(window.location.search);
    newUrl.delete("detailsId");
    router.push(`?${newUrl.toString()}`);
  };

  return (
    <div role="details" className={styles.detailSection}>
      <button onClick={handleClose}>Close</button>
      {detail.name ? (
        <>
          {" "}
          <h2 role="heading">{detail?.name}</h2>
          <p>Height: {detail?.height}</p>
          <p>Mass: {detail?.mass}</p>
          <p>Hair Color: {detail?.hair_color}</p>
          <p>Skin color: {detail?.skin_color}</p>
          <p>Eye color: {detail?.eye_color}</p>
          <p>Birth year: {detail?.birth_year}</p>
          <p>Gender: {detail?.gender}</p>
        </>
      ) : (
        <p>No detail found!</p>
      )}
    </div>
  );
};

export default DetailSection;
