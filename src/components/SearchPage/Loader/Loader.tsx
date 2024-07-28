import "./styles.css";

export function Loader({ role }: { role: string }): JSX.Element {
  return (
    <div role={role} className="loader">
      LOADING...
    </div>
  );
}
