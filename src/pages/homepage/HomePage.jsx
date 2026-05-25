import HeroSection from "../../components/homepage/HeroSection";
import ExtraSection from "../../components/homepage/ExtraSection";

import { useEffect, useState } from "react";
import { getPopularTopics } from "../../MOCKDATA(Julia)/spaceApi";


import "../../index.css";

const HomePage = ({ isLoggedIn }) => {

  const [popularTopics, setPopularTopics] = useState([]);
  const [loadingTopics, setLoadingTopics] = useState(false);
  const [errorTopics, setErrorTopics] = useState(null);


// Temporary mock popular topics fetch for homepage section.
  useEffect(() => {
  const fetchTopics = async () => {
// Temporary mockdata fetch.
// Will later be replaced by real backend/API endpoint.
    try {
      setLoadingTopics(true);
      const data = await getPopularTopics();
      setPopularTopics(data);
    } catch (err) {
      setErrorTopics(err.message);
    } finally {
      setLoadingTopics(false);
    }
  };

  fetchTopics();
}, []);


return (
  <div className="homepage">

    <section className="hero-section-container">
      <HeroSection isLoggedIn={isLoggedIn} />
    </section>

    <section className="extra-section-wrapper">
      <ExtraSection
        isLoggedIn={isLoggedIn}
        popularTopics={popularTopics}
      />
    </section>

  </div>
);
};

export default HomePage;