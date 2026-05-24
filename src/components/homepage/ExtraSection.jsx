import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLaptop, faRocket, faUserAstronaut } from "@fortawesome/free-solid-svg-icons";

const ExtraSection = ({ isLoggedIn, popularTopics }) => {

    const navigate = useNavigate();
    
    const handleTopicClick = (topic) => {
        navigate(`/explore/${topic.id}`)
    };

  return (
    <div>
        {isLoggedIn
        ? <div>
            <h2>Why join us?</h2>
            <p>You get access to exclusive content and features for FREE to enhance your space exploration experience.</p>
            <FontAwesomeIcon icon={faLaptop} />
            <p>You can read about the latest discoveries and updates directly from space agencies, such as NASA and ESA.</p>
            <FontAwesomeIcon icon={faRocket} />
            <p>You get to be a part of our goal to make learning about the universe more fun and engaging and hopefully inspire the next generation of space explorers.</p>
            <FontAwesomeIcon icon={faUserAstronaut} />
        </div>
        : <div>
            <h2>Popular topics</h2>
            {popularTopics.map((topic) => (
                <article
                    key={topic.id}
                    onClick={() => handleTopicClick(topic.slug)}
                >
                    <img src="N/A" alt={topic.title} />
                    <h3>{topic.title}</h3>
                    <p>{topic.description}</p>
                </article>
            ))}
        </div>}

    </div>
  )
}

export default ExtraSection