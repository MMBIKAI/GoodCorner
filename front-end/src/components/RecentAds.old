import { useState, useEffect } from "react";
import AdCard, { AdCardProps } from "./AdCard";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const RecentAds = () => {
  const [totalPrice, setTotalPrice] = useState(0);
  const [ads, setAds] = useState<AdCardProps[]>([]);
  const navigate = useNavigate(); // Initialize the hook

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios.get<AdCardProps[]>(
          "http://localhost:3000/clothes"
        );
        setAds(result.data);
      } catch (err) {
        console.error("Error fetching ads:", err);
      }
    };
    fetchData();
  }, []);

  // Function to handle deletion of an ad by its id
  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`http://localhost:3000/clothes/${id}`); // Send DELETE request
      alert("Ad deleted successfully!");
      setAds(ads.filter((ad) => ad.id !== id)); // Update the state to remove the deleted ad
    } catch (error) {
      console.error("Error deleting ad:", error);
      alert("Failed to delete the ad.");
    }
  };

  return (
    <>
      <h2>Recent Ads</h2>
      <p>Total: {totalPrice} €</p>
      <section className="recent-ads">
        {ads.map((el) => (
          <div key={el.id}>
            <AdCard
              id={el.id}
              title={el.title}
              picture={el.picture}
              link={el.link}
              price={el.price}
              category={el.category}
            />
            <div className="button-group">
              {/* Button to add price to total */}
              <button
                onClick={() => setTotalPrice(totalPrice + el.price)}
                className="button button-danger"
              >
                Add to Total
              </button>
              {/* Button to delete the ad */}
              <button
                onClick={() => handleDelete(el.id)}
                className="button button-danger"
              >
                Delete Ad
              </button>
              {/* Button to navigate to AdDetails */}
              <button
                onClick={() => navigate(`/ad/${el.id}`)}
                className="button button-info"
              >
                View Details
              </button>
            </div>
          </div>
        ))}
      </section>
    </>
  );
};

export default RecentAds;
