import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Loader } from "../../Loader/Loader";

interface Detail {
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
  const [detail, setDetail] = useState<Detail | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (detailsId) {
      fetch(`https://swapi.dev/api/people/${detailsId}/`)
        .then((res) => res.json())
        .then((data) => {
          setDetail(data);
          setLoading(false);
        });
    }
  }, [detailsId]);

  const closeDetails = () => {
    navigate(`/search/1`);
  };

  if (loading) {
    return <Loader />;
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
