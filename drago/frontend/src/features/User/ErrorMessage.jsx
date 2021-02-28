import React from "react";

/* component */
function ErrorMessage({ errorMessage }) {
  // render list of error messages
  function renderError() {
    console.log("errorMessage: ", errorMessage);
    if (!errorMessage || errorMessage === "") {
      return null;
    }

    const list = Object.entries(errorMessage).map(([key, val], index) => (
      <li key={index}>
        {key}: {val}
      </li>
    ));

    // render list
    return (
      <div>
        <ul>{list}</ul>
      </div>
    );
  }

  // render component
  return renderError();
}

/* export memoized component */
export default React.memo(ErrorMessage);
