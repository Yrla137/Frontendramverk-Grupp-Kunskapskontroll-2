import "./LoadingSpinner.css";

const LoadingSpinner = ({ message = "Loading...", size = "full" }) => {
  return (
    <div role="status"
    aria-live="polite"
    className={`solar-loader ${size}`}>
      <div className="sun"></div>
      <div className="orbit orbit1">
        <div className="planet planet1"></div>
      </div>
      <div className="orbit orbit2">
        <div className="planet planet2"></div>
      </div>
      <p
      aria-label={message}>
        {message}
      </p>
    </div>
  );
};

export default LoadingSpinner;