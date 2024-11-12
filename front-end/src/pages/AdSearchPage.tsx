import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AdCard, { AdCardProps } from "../components/AdCard";

const AdSearchPage = () => {
  const { keyword } = useParams(); // Get the keyword from the URL
  const [ads, setAd] = useState<AdCardProps[]>([]);
  useEffect(() => {
    const fetchAdsForKeyword = async () => {
      const result = await axios.get(
        `http://localhost:3000/clothes?title=${keyword}`
      );
      console.log(result);
      setAd(result.data);
    };
    fetchAdsForKeyword();
  }, [keyword]);

  return (
    <div>
      <h1>Search Results for: {keyword}</h1>
      <section className="recent-ads">
        {ads.map((el) => (
          <div key={el.title}>
            <AdCard
              key={el.id}
              id={el.id}
              title={el.title}
              picture={el.picture}
              link={el.link}
              price={el.price}
              category={el.category}
            />
          </div>
        ))}
      </section>
    </div>
  );
};

export default AdSearchPage; // Ensure the component is properly exported
