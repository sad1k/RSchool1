import React from "react";
import styles from "./Loader.module.css";
import loader from "./../../public/loader.gif";

export function Loader({ role }: { role: string }): JSX.Element {
  return (
    <div role={role} className={styles.loader}>
      <img src={loader.src} />
    </div>
  );
}
