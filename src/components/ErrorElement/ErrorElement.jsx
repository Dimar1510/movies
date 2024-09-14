import React from "react";

const ErrorElement = ({ errorText }) => {
  return (
    <div className="text-red-700 w-full h-svh text-center text-xl flex flex-col gap-4 justify-center">
      <p>
        Error loading data, something is wrong with the API. Please try again
        later.
      </p>
      <p>Response: {errorText}</p>
      <p className="text-3xl">(╯°□°）╯︵ ┻━┻</p>
    </div>
  );
};

export default ErrorElement;
