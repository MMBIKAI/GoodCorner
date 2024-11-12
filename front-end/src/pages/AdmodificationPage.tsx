import axios from "axios";
import { useEffect, useState } from "react";
import { category } from "../components/Header";
import { AdCardProps } from "../components/AdCard";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const EditAdForm = () => {
  const { id } = useParams();
  const navigate = useNavigate(); // Hook to navigate between pages
  const [categories, setCategories] = useState([] as category[]);
  const [adDetails, setAdDetails] = useState<AdCardProps>();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const result = await axios.get("http://localhost:3000/categories");
        setCategories(result.data);
      } catch (err) {
        console.log("err", err);
      }
    };
    const fetchAdDetails = async () => {
      try {
        const adDetailsResult = await axios.get(
          `http://localhost:3000/clothes/${id}`
        );
        setAdDetails(adDetailsResult.data);
      } catch (err) {
        console.log("err", err);
      }
    };
    fetchAdDetails();
    fetchCategories();
  }, [id]);

  if (adDetails) {
    return (
      <>
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            const form = e.target;
            const formData = new FormData(form as HTMLFormElement);
            const formJson = Object.fromEntries(formData.entries());

            try {
              await axios.put(`http://localhost:3000/clothes/${id}`, formJson);
              toast.success("Annonce modifiée avec succès !"); // Success notification
              navigate("/");
            } catch (error) {
              console.error(
                "Erreur lors de la modification de l'annonce:",
                error
              );
              toast.error("Erreur lors de la modification de l'annonce."); // Error notification
            }
          }}
        >
          <label>
            Titre de l'annonce:
            <br />
            <input
              className="text-field"
              type="text"
              name="title"
              defaultValue={adDetails.title}
            />
          </label>
          <br />
          <label>
            Description:
            <br />
            <input
              className="text-field"
              type="text"
              name="description"
              defaultValue={adDetails.description}
            />
          </label>
          <br />
          <label>
            Vendeur:
            <br />
            <input
              className="text-field"
              type="text"
              name="owner"
              defaultValue={adDetails.owner}
            />
          </label>
          <br />
          <label>
            Prix:
            <br />
            <input
              className="text-field"
              type="number"
              name="price"
              defaultValue={adDetails.price}
            />
          </label>
          <br />
          <label>
            Image:
            <br />
            <input
              className="text-field"
              type="text"
              name="picture"
              defaultValue={adDetails.picture}
            />
          </label>
          <br />
          <label>
            Ville:
            <br />
            <input
              className="text-field"
              type="text"
              name="location"
              defaultValue={adDetails.location}
            />
          </label>
          <br />
          <br />
          <select
            className="button button-danger"
            name="category"
            defaultValue={adDetails.category.id}
          >
            {categories.map((el) => (
              <option key={el.id} value={el.id}>
                {el.name}
              </option>
            ))}
          </select>
          <br />
          <button className="button button-danger">Submit</button>
        </form>
      </>
    );
  } else {
    return <p>Loading...</p>;
  }
};

export default EditAdForm;
