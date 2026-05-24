import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLaptop, faRocket, faUserAstronaut } from "@fortawesome/free-solid-svg-icons";

const ExtraSection = ({ isLoggedIn }) => {

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
            <p>You get to be a part of out goal to make learning about the universe more fun and engaging and hopefully inspire the next generation of space explorers.</p>
            <FontAwesomeIcon icon={faUserAstronaut} />
        </div>
        : <div>
            <h2>Popular topics</h2>
            <article onClick={() => handleTopicClick("")}>
                <img src="" alt="" />
                <h3>Mars</h3>
                <p>Explore the red planet and its potential for hosting life.</p>
            </article>
            <article onClick={() => handleTopicClick("")}>
                <img src="" alt="" />
                <h3>Astroids</h3>
                <p>Learn about the fascinating world of space rocks and their impact on Earth.</p>
            </article>
            <article onClick={() => handleTopicClick("")}>
                <img src="" alt="" />
                <h3>Black holes</h3>
                <p>Dive into the mysteries of these cosmic phenomena and their effects on space and time.</p>
            </article>
        </div>}

    </div>
  )
}

export default ExtraSection