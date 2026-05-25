import heroVideo from "../../assets/homepage/hero-video.mp4";
import "./HeroVideo.css";

const HeroVideo = () => {
  return (
    <div className="hero-video-container">
      <video
        className="hero-video"
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
      >
        <source src={heroVideo} type="video/webm" />
      </video>
    </div>
  );
};

export default HeroVideo;