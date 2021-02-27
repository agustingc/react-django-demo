import React from "react";
import { useSelector } from "react-redux";
import { userSelector } from "./UserSlice";

/* component */
function ErrorMessage() {
  const { errorMessage } = useSelector(userSelector);

  function renderError() {
    if (!errorMessage) {
      return null;
    }

    const list = Object.entries(errorMessage).map(([key, val], index) => (
      <li key={index}>
        {key}: {val}
      </li>
    ));

    // render
    return (
      <div>
        <ul>{list}</ul>
      </div>
    );
  }

  return renderError();
}

export default ErrorMessage;
