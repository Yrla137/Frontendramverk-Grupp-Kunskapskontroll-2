import "./LoadingSpinner.css";

const LoadingSpinner = ({
  message = "Traveling through space",
  size = "full",
}) => {
  const stars = Array.from({ length: 30 });

  return (
    <div
      className={`loader-overlay ${size}`}
      role="status"
      aria-live="polite"
    >
      {/* BLUR BACKGROUND */}
      <div className="loader-blur" />

      {/* SPACE SCENE */}
      <div className="space-scene">

        {/* SUN */}
        <div className="sun" />

        {/* PLANETS */}
        <div className="orbit orbit-blue">
          <div className="planet planet-blue" />
        </div>

        <div className="orbit orbit-orange">
          <div className="planet planet-orange" />
        </div>

        <div className="orbit orbit-purple">
          <div className="planet planet-purple" />
        </div>

        <div className="orbit orbit-deepblue">
          <div className="planet planet-deepblue" />
        </div>

        {/* STARS */}
        <div className="stars">
          {stars.map((_, i) => (
            <span
              key={i}
              className={`star star-${(i % 6) + 1}`}
            />
          ))}
        </div>
      </div>

      {/* TEXT */}
      <p className="loading-text">
        {message}
        <span className="dots"></span>
      </p>
    </div>
  );
};

export default LoadingSpinner;