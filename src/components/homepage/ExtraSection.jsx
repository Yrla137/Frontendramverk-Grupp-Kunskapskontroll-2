// import { useNavigate } from "react-router-dom";
import {
  faLaptop,
  faRocket,
  faUserAstronaut
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import "./ExtraSection.css";

const ExtraSection = ({
  isLoggedIn,
  popularTopics,
  loadingTopics,
  errorTopics
}) => {
//   const navigate = useNavigate();

//   const handleTopicClick = (slug) => {
//     navigate(`/explore/${slug}`);
//   };

  if (loadingTopics) {
    return (
      <div className="extra-section">
        <p>Loading topics...</p>
      </div>
    );
  }

  if (errorTopics) {
    return (
      <div className="extra-section">
        <p>Error: {errorTopics}</p>
      </div>
    );
  }

  return (
    <section className="extra-section">

      {isLoggedIn && (
        <div className="extra-logged-in">

          <h2 className="extra-title">Popular topics</h2>

          <div className="topics-grid">
            {popularTopics.map((topic) => (
              <article
                role="link"
                tabIndex={0}
                key={topic.id}
                className="topic-card"
                >
                <img
                  className="topic-image"
                  src="https://via.placeholder.com/300x200?text=No+Image"
                  alt={topic.title}
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = "https://via.placeholder.com/300x200?text=No+Image";
                  }}
                />
                <h3>{topic.title}</h3>
                <p>{topic.description}</p>
              </article>
            ))}
          </div>

        </div>
      )}

      {!isLoggedIn && (
        <div className="extra-guest">

          <h2 className="extra-title">Why join us?</h2>

          <div className="features-grid">

            <article className="feature-card">
              <FontAwesomeIcon className="extra-icon laptop-icon" icon={faLaptop} />
                <p>You get access to exclusive content and features for FREE to enhance your space exploration experience.</p>
            </article>

            <article className="feature-card">
              <FontAwesomeIcon className="extra-icon rocket-icon" icon={faRocket} />
              <p>You can read about the latest discoveries and updates directly from space agencies such as NASA and ESA.</p>
            </article>

            <article className="feature-card">
              <FontAwesomeIcon className="extra-icon astronaut-icon" icon={faUserAstronaut} />
              <p>You become part of a community that makes learning about the universe more fun, engaging, and inspiring for future space explorers.</p>
            </article>

          </div>

        </div>
      )}

    </section>
  );
};

export default ExtraSection;