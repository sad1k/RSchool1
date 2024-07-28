import { useContext } from "react";

import "./Flyout.css";
import { useAppSelector } from "../../../store/store";
import { removeAllItems } from "../../../store/selectedItemsSlice";
import { useDispatch } from "react-redux";
import { ThemeContext } from "../../../ThemeContext/ThemeContext";

const Flyout = () => {
  const { theme } = useContext(ThemeContext);

  const selectedItems = useAppSelector(
    (state) => state.selectedItems.selectedItems,
  );

  const keys = Object.keys(selectedItems);

  const dispatch = useDispatch();

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
        <div className={`flyout ${theme ? "darkTheme" : "lightTheme"}`}>
          <h1>{keys.length} items are selected</h1>
          <div className="buttons-panel">
            <button
              role="unselectBtn"
              onClick={() => dispatch(removeAllItems())}
            >
              Unselect all
            </button>
            <a
              role="download"
              className="download"
              href={objUrl}
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
