import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLaptop, faRocket, faUserAstronaut } from "@fortawesome/free-solid-svg-icons";

import "./ExtraSection.css";

const ExtraSection = ({ isLoggedIn, popularTopics }) => {

    const navigate = useNavigate();
    
    const handleTopicClick = (topicSlug) => {
        navigate(`/explore/${topicSlug}`);
    };

  return (
    <div className="extra-section">

        {isLoggedIn

        ? <div className="extra-logged-in">
            <h2>Popular topics</h2>
            <div className="topics-grid">
            {popularTopics.map((topic) => (
                <article className="topic-card"
                    key={topic.id}
                    onClick={() => handleTopicClick(topic.slug)}
                >
                    <img className="topic-image" src="N/A" alt={topic.title} />
                    <h3>{topic.title}</h3>
                    <p>{topic.description}</p>
                </article>
            ))}
            </div>
        </div>
        : <div className="extra-guest">
        <h2 className="extra-title">
            Why join us?
        </h2>

        <div className="features-grid">

            <article className="feature-card">
            <FontAwesomeIcon
                className="extra-icon laptop-icon"
                icon={faLaptop}
            />

            <p>
                You get access to exclusive content and features for FREE to enhance your space exploration experience.
            </p>
            </article>

            <article className="feature-card">
            <FontAwesomeIcon
                className="extra-icon rocket-icon"
                icon={faRocket}
            />

            <p>
                You can read about the latest discoveries and updates directly from space agencies, such as NASA and ESA.
            </p>
            </article>

            <article className="feature-card">
            <FontAwesomeIcon
                className="extra-icon astronaut-icon"
                icon={faUserAstronaut}
            />

            <p>
                You get to be a part of our goal to make learning about the universe more fun and engaging and hopefully inspire the next generation of space explorers.
            </p>
            </article>

        </div>
        </div>}

    </div>
  )
}

export default ExtraSection