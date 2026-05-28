import "./ErrorMessage.css";

const ErrorMessage = ({
  title= "An error occurred",
  error,
  onRetry
}) => {

  return (
  <div className="error-container">
    <div
      className="error-card"
      role="alert"
      aria-live="assertive"
    >
      <h3 className="error-title">
        {title}
      </h3>

      <p className="error-message">
        {error?.message || error}
      </p>

      {onRetry && (
        <button
          className="error-retry-btn"
          type="button"
          onClick={onRetry}
        >
          Try again
        </button>
      )}
    </div>
  </div>
);
};

export default ErrorMessage;