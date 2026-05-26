import HeroSection from "../../components/homepage/HeroSection";
import ExtraSection from "../../components/homepage/ExtraSection";

import { useEffect, useState } from "react";
import { getPopularTopics } from "../../api/index.js";

const HomePage = ({ isLoggedIn }) => {

  const [popularTopics, setPopularTopics] = useState([]);
  const [loadingTopics, setLoadingTopics] = useState(false);
  const [errorTopics, setErrorTopics] = useState(null);

  useEffect(() => {
    if (!isLoggedIn) return;

    const fetchTopics = async () => {
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
  }, [isLoggedIn]);

  return (
    <div className="homepage">

      <HeroSection isLoggedIn={isLoggedIn} />

      <ExtraSection
        isLoggedIn={isLoggedIn}
        popularTopics={popularTopics}
        loadingTopics={loadingTopics}
        errorTopics={errorTopics}
      />

    </div>
  );
};

export default HomePage;