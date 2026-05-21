import "./LoadingSpinner.css";

const LoadingSpinner = ({ message = "Loading...", size = "full" }) => {
  return (
    <div className={`solar-loader ${size}`}>
      <div className="sun"></div>
      <div className="orbit orbit1">
        <div className="planet planet1"></div>
      </div>
      <div className="orbit orbit2">
        <div className="planet planet2"></div>
      </div>
      <p>{message}</p>
    </div>
  );
};

export default LoadingSpinner;