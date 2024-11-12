import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import AdCard from "../components/AdCard";
import { AdCardProps } from "../components/AdCard";

const CategoryPage = () => {
  const { category } = useParams(); // Get the category from the URL
  const [clothes, setClothes] = useState<AdCardProps[]>([]);

  useEffect(() => {
    const fetchClothes = async () => {
      try {
        const result = await axios.get(
          `http://localhost:3000/clothes?category=${category}`
        );
        console.log(result);
        setClothes(result.data);
      } catch (error) {
        console.error("Error fetching clothes:", error);
      }
    };
    fetchClothes();
  }, [category]);

  return (
    <div>
      <h2>Clothes in {category} Category</h2>
      <section className="recent-ads">
        {clothes.map((el) => (
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

export default CategoryPage;
