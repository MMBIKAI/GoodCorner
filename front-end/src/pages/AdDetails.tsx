import { useParams, useNavigate } from "react-router-dom";
import { useQuery, gql, useMutation } from "@apollo/client";
import { GET_AD_DETAILS } from "../graphql/queries";
import { DELETE_CLOTHE_BY_ID } from "../graphql/mutations";


// Define the GraphQL query to fetch ad details by id




type Picture = {
  id: number;  // or 'number', depending on your data
  url: string;
};

const AdDetails = () => {
  const { id } = useParams(); // Get the id from the URL params
  const navigate = useNavigate(); // Initialize the navigate hook

  // Use Apollo Client's useQuery hook to fetch the ad details
  const { data, loading, error } = useQuery(GET_AD_DETAILS, {
    variables: { getClothesByIdId: parseFloat(id!) }, // Pass the ad id as a variable, converted to a number
  });

  // Apollo `useMutation` hook to delete an ad by its ID
  const [deleteClotheById] = useMutation(DELETE_CLOTHE_BY_ID);

  // Handle loading and error states
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  // Extract ad details from the query result
  const adDetails = data?.getClothesById;

  // Handle delete action
  const handleDelete = async () => {
    try {
      // Execute the delete mutation with the specified ad ID
      const { data } = await deleteClotheById({
        variables: { idDelete: parseFloat(id!) },
      });

      // If deletion was successful, display a success message
      if (data.deleteClotheById) {
        alert("Ad deleted successfully!");
        navigate("/"); // Optionally redirect to the ads list after deletion
      } else {
        alert("Failed to delete the ad.");
      }
    } catch (error) {
      console.error("Error deleting ad:", error);
      alert("Failed to delete the ad.");
    }
  };

  return (
    <div>
      <p>Details of ad {id}</p>
      <h2 className="ad-details-title">{adDetails?.title}</h2>
      <section className="ad-details">
        <div className="ad-details-image-container">
          {/* Map over the pictures array to display all images */}
          {adDetails?.pictures?.map((picture: Picture) => (
            <img
              key={picture.id}
              className="ad-details-image"
              src={picture.url} // Use the picture URL
              alt={adDetails?.title} // Alt text for accessibility
            />
          ))}
        </div>
        <div className="ad-details-info">
          <div className="ad-details-price">{adDetails?.price} €</div>
          <div className="ad-details-description">{adDetails?.description}</div>
          <hr className="separator" />
          <div className="ad-details-owner">
            Annonce publiée par <b>{adDetails?.owner}</b>
            {"   "}{" "}
            {adDetails?.createdAt
              ? new Date(adDetails.createdAt).toDateString()
              : "Date not available"}
          </div>
          <a
            href="mailto:serge@serge.com"
            className="button button-primary link-button"
          >
            <svg
              aria-hidden="true"
              width="16"
              height="16"
              viewBox="0 0 32 32"
              xmlns="http://www.w3.org/2000/svg"
              className="styled__BaseIcon-sc-1jsm4qr-0 llmHhT"
              strokeWidth="2.5"
              fill="none"
            >
              <path d="M25 4H7a5 5 0 0 0-5 5v14a5 5 0 0 0 5 5h18a5 5 0 0 0 5-5V9a5 5 0 0 0-5-5ZM7 6h18a3 3 0 0 1-2.4 1.22s0 0-.08 0L18 15.79a3 3 0 0 1-4.06 0L4.68 7.26H4.6A3 3 0 0 1 7 6Zm18 20H7a3 3 0 0 1-3-3V9.36l8.62 7.9a5 5 0 0 0 6.76 0L28 9.36V23a3 3 0 0 1-3 3Z"></path>
            </svg>
            Envoyer un email
          </a>
          <button
            className="button button-primary"
            onClick={() => navigate(`/ad/modify/${id}`)} // Navigate to the modification page
          >
            Modify Ad
          </button>
          <button onClick={handleDelete} className="button button-danger">
            Supprimer l'annonce
          </button>
        </div>
      </section>
    </div>
  );
};

export default AdDetails;
