import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { gql, useMutation, useQuery } from "@apollo/client";
import { Category } from "../components/Header";
import { AdCardProps } from "../components/AdCard";
import { GET_AD_DETAILS, GET_CATEGORIES } from "../graphql/queries";
import { MODIFY_AD_ID } from "../graphql/mutations";

// Define the GraphQL queries and mutations





type Picture = {
    id: number;  // or 'number', depending on your data
    url: string;
  };

const EditAdForm = () => {
  const { id } = useParams();
  const navigate = useNavigate(); // Hook to navigate between pages

  // Fetch categories and ad details using GraphQL queries
  const { loading: categoriesLoading, error: categoriesError, data: categoriesData } = useQuery(GET_CATEGORIES);
  const { loading: clothingLoading, error: clothingError, data: clothingData } = useQuery(GET_AD_DETAILS, {
    variables: { getClothesByIdId: parseFloat(id!) }, // Pass the ad id as a variable, converted to a number
  });

  // Mutation function to modify the ad details
  const [modifyClothing] = useMutation(MODIFY_AD_ID);

  if (categoriesLoading || clothingLoading) return <p>Loading...</p>;
  if (categoriesError || clothingError) return <p>Error loading data</p>;

  const adDetails = clothingData?.getClothesById;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form as HTMLFormElement);
    const formJson = Object.fromEntries(formData.entries());

    // Collect the existing picture URLs and the new ones added by the user
    const updatedPictures = adDetails?.pictures?.map((pic: Picture) => pic.url) || [];

    // Add the new picture URLs if provided
    if (formJson.picture) {
      // Split the input string by commas to allow multiple URLs
      const newPictures = (formJson.picture as string).split(',').map(url => url.trim());
      updatedPictures.push(...newPictures);
    }

    try {
        await modifyClothing({
            variables: {
              data: {
                id: adDetails?.id,
                title: formJson.title,
                description: formJson.description,
                owner: formJson.owner,
                price: parseFloat(formJson.price as string),
                // Simplified pictures handling to match backend expectations
                pictures: updatedPictures,//[formJson.picture as string], // Array of URLs
                location: formJson.location,
                category: formJson.category,
              },
            },
          });
      toast.success("Annonce modifiée avec succès !");
      navigate("/");
    } catch (error) {
      console.error("Erreur lors de la modification de l'annonce:", error);
      toast.error("Erreur lors de la modification de l'annonce.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Titre de l'annonce:
        <input
          className="text-field"
          type="text"
          name="title"
          defaultValue={adDetails?.title}
        />
      </label>
      <br />
      <label>
        Description:
        <input
          className="text-field"
          type="text"
          name="description"
          defaultValue={adDetails?.description}
        />
      </label>
      <br />
      <label>
        Vendeur:
        <input
          className="text-field"
          type="text"
          name="owner"
          defaultValue={adDetails?.owner}
        />
      </label>
      <br />
      <label>
        Prix:
        <input
          className="text-field"
          type="number"
          name="price"
          defaultValue={adDetails?.price}
        />
      </label>
      <br />
      <label>
        Image:
        <input
          className="text-field"
          type="text"
          name="picture"
          defaultValue={adDetails?.pictures?.[0]?.url}
        />
      </label>
      <br />
      <label>
        Ville:
        <input
          className="text-field"
          type="text"
          name="location"
          defaultValue={adDetails?.location}
        />
      </label>
      <br />
      <br />
      <select
        className="button button-danger"
        name="category"
        defaultValue={adDetails?.category?.id}
      >
        {categoriesData?.getAllCategories.map((category: Category) => (
          <option key={category.id} value={category.id}>
            {category.name}
          </option>
        ))}
      </select>
      <br />
      <button className="button button-danger">Submit</button>
    </form>
  );
};

export default EditAdForm;
