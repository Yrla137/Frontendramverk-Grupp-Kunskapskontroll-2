import { useNavigate } from "react-router-dom";
import {
  faLaptop,
  faRocket,
  faUserAstronaut
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ExtraSection = ({
  isLoggedIn,
  popularTopics,
  loadingTopics,
  errorTopics
}) => {
  const navigate = useNavigate();

  const handleTopicClick = (slug) => {
    navigate(`/explore/${slug}`);
  };

  if (loadingTopics) return <p>Loading topics...</p>;
  if (errorTopics) return <p>Error: {errorTopics}</p>;

  return (
    <div className="extra-section">
      {isLoggedIn ? (
        <div className="extra-logged-in">
          <h2>Why join us?</h2>

          <div className="features-grid">
            <article className="feature-card">
              <FontAwesomeIcon className="extra-icon laptop-icon" icon={faLaptop} />
              <p>Access exclusive space content.</p>
            </article>

            <article className="feature-card">
              <FontAwesomeIcon className="extra-icon rocket-icon" icon={faRocket} />
              <p>Latest updates from NASA & ESA.</p>
            </article>

            <article className="feature-card">
              <FontAwesomeIcon className="extra-icon astronaut-icon" icon={faUserAstronaut} />
              <p>Be part of space exploration learning.</p>
            </article>
          </div>
        </div>
      ) : (
        <div className="extra-guest">
          <h2>Popular topics</h2>

          <div className="topics-grid">
            {popularTopics.map((topic) => (
              <article
                key={topic.id}
                className="topic-card"
                onClick={() => handleTopicClick(topic.slug)}
              >
                <img className="topic-image" src="N/A" alt={topic.title} />
                <h3>{topic.title}</h3>
                <p>{topic.description}</p>
              </article>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ExtraSection;