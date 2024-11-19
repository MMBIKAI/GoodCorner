// Define the shape of the data that will be passed to the AdCard component
type AdCardProps = {
  id: number; // Unique identifier for the ad
  title: string; // Title of the ad
  pictures: { id: number; url: string }[]; // Array of pictures, each with an id and a URL
  price: number; // Price of the item being advertised
  link: string; // Link to the full ad or product page
  description?: string; // Optional description of the ad
  owner?: string; // Optional owner of the ad
  createdAt?: Date; // Optional date the ad was created
  location?: string; // Optional location related to the ad
  category: { id: number; name: string }; // Category of the ad (includes id and name)
};

// Functional component that represents an advertisement card
const AdCard = ({ title, pictures, price, category }: AdCardProps) => {
   // Get the first picture from the pictures array, or null if there are no pictures
   const firstPicture = pictures?.[0];
  return (
    <div className="ad-card-container"> {/* Container for the ad card */}
      <a className="ad-card-link"> {/* The ad card is a link to the ad details */}
        <div className="ad-card-images"> {/* Container for images */}
        {/*  {pictures?.map((picture) => ( // Map over the pictures array
            <img
              key={picture.id} // Use picture id as the unique key for each image
              className="ad-card-image" // CSS class for styling the image
              src={picture.url} // Source URL for the image
              alt={title} // Alt text for the image (for accessibility)
            />
          ))}*/}
          
          {/* Display the first picture, or a placeholder if no pictures are available */}
          {firstPicture ? (
            <img
              key={firstPicture.id} // Use picture id as the unique key for each image
              className="ad-card-image" // CSS class for styling the image
              src={firstPicture.url} // Source URL for the image
              alt={title} // Alt text for the image (for accessibility)
            />
          ) : (
            <div className="placeholder-image">No Image Available</div> // Show if no images are available
          )}
        </div>
        <div className="ad-card-text"> {/* Container for the text information */}
          <div className="ad-card-title">{title}</div> {/* Display the title of the ad */}
          <div className="ad-card-price">{price} €</div> {/* Display the price of the ad */}
          <div className="ad-card-category">{category.name}</div> {/* Display the category name */}
        </div>
      </a>
    </div>
  );
};

// Export the AdCard component for use in other parts of the application
export default AdCard;

// Export the AdCardProps type for type-checking in other components
export type { AdCardProps };
