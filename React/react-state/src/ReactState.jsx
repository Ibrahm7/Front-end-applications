import { sculptureList } from "./data";
import { useState } from "react";

function ReactState() {
  let [index, setIndex] = useState(0);
  let sculpture = sculptureList[index];

  const [showMore, setShowMore] = useState(false);

  console.log(sculpture);
  function handlePreviousClick() {
    if (index > 0) {
      setIndex(index--);
    } else {
      setIndex(sculptureList.length - 1);
    }
  }
  function handleNextClick() {
    if (sculptureList.length - 1 > index) {
      setIndex(index++);
    } else {
      setIndex(0);
    }
  }
  return (
    <>
      <button onClick={handlePreviousClick}>Geri</button>
      <button onClick={handleNextClick}>İleri</button>

      <h2>
        <i>
          {sculpture.name} by {sculpture.artist}
        </i>
      </h2>
      <h3>
        ({index + 1} of {sculptureList.length})
      </h3>
      <img src={sculpture.url} alt={sculpture.alt} />

      <p>
        <button onClick={() => setShowMore(!showMore)}>
          {showMore ? "Hide" : "Show"} Details
        </button>
      </p>

      {showMore && <p>{sculpture.description}</p>}
    </>
  );
}

export default ReactState;
