//import { useQuery, gql, useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import AdCard from "./AdCard";
import { useState } from "react";
//import { GET_ALL_CLOTHES } from "../graphql/queries";
//import { DELETE_CLOTHE_BY_ID } from "../graphql/mutations";
import { Category, useDeleteClotheByIdMutation, useGetclothingQuery } from "../generated/graphql-types";


// Define the GraphQL query to fetch all ads (clothes) with necessary fields


// Define the GraphQL mutation to delete an ad by its ID


const RecentAds = () => {
  // State to track the total price of selected ads
  const [totalPrice, setTotalPrice] = useState(0);
  
  // State to store all ads
  //const [ads, setAds] = useState<AdCardProps[]>([]);

  // Apollo `useQuery` hook to fetch ads data and handle loading and error states
  const { loading, error, data, refetch } = useGetclothingQuery();

  // Apollo `useMutation` hook to delete an ad by its ID
  //const [deleteClotheById] = useMutation(DELETE_CLOTHE_BY_ID);
  const [deleteClotheById] = useDeleteClotheByIdMutation();

  // Navigation hook to programmatically navigate to different routes
  const navigate = useNavigate();

  // Display a loading message while data is being fetched
  if (loading) return <p>Loading...</p>;

  // Display an error message if data fetching fails
  if (error) return <p>Error: {error.message}</p>;
if(data){

  console.log("data", data.getAllClothes)

  // Function to handle deleting an ad by its ID
  const handleDelete = async (id: number) => {
    try {
      // Execute the delete mutation with the specified ad ID
      const { data } = await deleteClotheById({
        variables: { idDelete: id },
      });

      // If deletion was successful, update ads and display a success message
      if (data?.deleteClotheById) {
        alert("Ad deleted successfully!");
        //setAds(ads.filter((ad) => ad.id !== id)); // Remove the deleted ad from state
        await refetch();
      } else {
        alert("Failed to delete the ad.");
      }
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
        {/* Iterate over fetched ads and display each one */}
        {data?.getAllClothes.map((el) => (
          <div key={el.id}>
            {/* Render AdCard component to display ad details */}
            <AdCard
              id={el.id}
              title={el.title}
              pictures={el.pictures || []} // Pass entire pictures array to AdCard

              // link={el.link || "#"} // Use default link if not available
              price={el.price}
              category={el.category as Category} 
              link={""}           />
            <div className="button-group">
              {/* Button to add the ad price to the total price */}
              <button
                onClick={() => setTotalPrice(totalPrice + el.price)}
                className="button button-danger"
              >
                Add to Total
              </button>
              {/* Button to delete the ad by its ID */}
              <button
                onClick={() => handleDelete(el.id)}
                className="button button-danger"
              >
                Delete Ad
              </button>
              {/* Button to navigate to ad details page */}
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

}

};

export default RecentAds;
