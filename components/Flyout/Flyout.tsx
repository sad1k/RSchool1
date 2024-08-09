import React from "react";
import styles from "./Flyout.module.css";
import { useAppSelector } from "../../lib/store";
import { useDispatch } from "react-redux";
import { removeAllItems } from "../../lib/selectedItemsSlice";

const Flyout = () => {
  const selectedItems = useAppSelector(
    (state) => state.selectedItems.selectedItems,
  );
  const keys = Object.keys(selectedItems);
  const dispatch = useDispatch();

  const handleUnselect = () => {
    dispatch(removeAllItems());
  };

  let objUrl: string = "";

  if (keys.length !== 0) {
    const objKeys = Object.keys(selectedItems[keys[0]] || []);

    const refinedData: string[][] = [];
    refinedData.push(objKeys);
    Object.values(selectedItems).forEach((item) => {
      refinedData.push(Object.values(item || []));
    });

    let content: string = "";

    refinedData.forEach((row) => {
      content += row.join(";") + "\n";
    });

    const blob = new Blob([content], { type: "text/csv;charset=utf-8," });

    objUrl = URL.createObjectURL(blob);
  }

  return (
    <>
      {keys.length > 0 ? (
        <div className={styles.flyout}>
          <h1>{keys.length} items are selected</h1>
          <div className={styles.buttonsPanel}>
            <button onClick={handleUnselect} role="unselectBtn">
              Unselect all
            </button>
            <a
              role="download"
              href={objUrl}
              className="download"
              download={`${keys.length}_starwars.csv`}
            >
              <button>Download</button>
            </a>
          </div>
        </div>
      ) : (
        false
      )}
    </>
  );
};

export default Flyout;
