import { useParams, useNavigate } from "react-router-dom";
import { Loader } from "../../Loader/Loader";
import { useGetPeopleByIdQuery } from "../../../../store/store";
import { ISearchItem } from "../SearchItem";

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

export function DetailSection(): JSX.Element {
  const { detailsId } = useParams<{ detailsId: string }>();
  const navigate = useNavigate();
  const { data, isFetching } = useGetPeopleByIdQuery(+(detailsId ?? ""));
  const closeDetails = () => {
    navigate(`../`, { relative: "path" });
  };
  const detail: Detail | undefined = data;
  if (isFetching || detail === undefined) {
    return <Loader role="loaderInDetails" />;
  }
  return (
    <div className="detail-section">
      <button onClick={closeDetails}>Close</button>
      {detail ? (
        <>
          {" "}
          <h2 role="heading">{detail.name}</h2>
          <p>Height: {detail.height}</p>
          <p>Mass: {detail.mass}</p>
          <p>Hair Color: {detail.hair_color}</p>
          <p>Skin color: {detail.skin_color}</p>
          <p>Eye color: {detail.eye_color}</p>
          <p>Birth year: {detail.birth_year}</p>
          <p>Gender: {detail.gender}</p>
        </>
      ) : (
        <p>No detail found!</p>
      )}
    </div>
  );
}
