const ERROR_MESSAGES = {
  default:
    "Error loading data, something is wrong with the API. Please try again later.",
  responsePrefix: "Response: ",
};

const ErrorElement = ({
  errorText = "Unknown error",
}: {
  errorText?: string;
}) => {
  return (
    <section
      className="text-red-700 w-full h-svh text-center text-xl flex flex-col gap-4 justify-center"
      aria-live="assertive"
      role="alert"
    >
      <p>{ERROR_MESSAGES.default}</p>
      {errorText && (
        <p>
          {ERROR_MESSAGES.responsePrefix}
          {errorText}
        </p>
      )}
      <p className="text-3xl">(╯°□°）╯︵ ┻━┻</p>
    </section>
  );
};

export default ErrorElement;
