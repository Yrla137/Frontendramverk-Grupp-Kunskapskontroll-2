import "./LoadingSpinner.css";

const LoadingSpinner = ({
  message = "Flying through space...",
  size = "full",
}) => {
  const stars = Array.from({ length: 20 });

  return (
    <div className={`loader-overlay ${size}`} role="status" aria-live="polite">

      {/* BACKDROP BLUR */}
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

        {/* STARS */}
        <div className="stars">
          {stars.map((_, i) => (
            <span key={i} className="star" />
          ))}
        </div>

      </div>

      {/* TEXT */}
      <p className="loading-text">
        {message}
        <span className="dots">...</span>
      </p>

    </div>
  );
};

export default LoadingSpinner;