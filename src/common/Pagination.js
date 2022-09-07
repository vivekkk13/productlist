import React, { useState, useEffect } from "react";
import { Pagination } from "react-bootstrap";

export const Pagination1 = ({ showPerPage, onPaginationChange, total }) => {
  const [counter, setCounter] = useState(1);

  const [numberOfButtons, setNumberOfButoons] = useState(
    Math.ceil(total / showPerPage)
  );
  useEffect(() => {
    const value = showPerPage * counter;
    onPaginationChange(value - showPerPage, value);
  }, [counter]);
  const onButtonClick = (type) => {
    if (type === "prev") {
      if (counter === 1) {
        setCounter(1);
      } else {
        setCounter(counter - 1);
      }
    } else if (type === "next") {
      if (numberOfButtons === counter) {
        setCounter(counter);
      } else {
        setCounter(counter + 1);
      }
    }
  };

  return (
    <>
      <div className="butonprimary">
        <button
          type="button"
          class="btn btn-outline-primary"
          onClick={() => onButtonClick("prev")}
        >
          prev
        </button>
      </div>

      <div className="buttonsuccess">
        <button
          type="button"
          class="btn btn-outline-success"
          onClick={() => onButtonClick("next")}
        >
          Next
        </button>
      </div>
    </>
  );
};
