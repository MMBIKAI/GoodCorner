import axios from "axios";
import { Fragment, useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form"; // Import useForm from react-hook-form
import { category } from "../components/Header"; // Ensure this import is correct
import { Inputs } from "./NewCategoryAdd"; // Import your type correctly
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

type FormData = {
  title: string;
  description: string;
  owner: string;
  price: number;
  picture: string;
  location: string;
  createdAt: Date;
  category: number;
  tags: number[];
};

type Tags = {
  id: number;
  name: string;
};

const NewADForm = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState<category[]>([]);
  const [tags, setTags] = useState<Tags[]>([]);
  const [selectedTags, setSelectedTags] = useState<number[]>([]); // State to manage selected tag IDs

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const result = await axios.get("http://localhost:3000/categories");
        setCategories(result.data);
      } catch (err) {
        console.log("err", err);
      }
    };
    const fetchTags = async () => {
      try {
        const result = await axios.get("http://localhost:3000/tags");
        setTags(result.data);
      } catch (err) {
        console.log("err", err);
      }
    };
    fetchTags();
    fetchCategories();
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ criteriaMode: "all" });

  // Handle form submission
  const onSubmit: SubmitHandler<FormData> = async (data) => {
    // Transform selected tag IDs into objects expected by the backend
    const dataForBackend = {
      ...data,
      tags: selectedTags.map((tagId) => {
        const tag = tags.find((tag) => tag.id === tagId);
        return { id: tag?.id, name: tag?.name };
      }),
    };

    console.log("Formatted Data for Backend:", dataForBackend);

    try {
      await axios.post("http://localhost:3000/clothes", dataForBackend);
      toast.success("Ad has been added");
      navigate("/");
    } catch (error) {
      console.error("Error submitting ad:", error);
      toast.error("Failed to add ad");
    }
  };

  // Handle checkbox change for tags
  const handleTagChange = (id: number) => {
    setSelectedTags((prevSelectedTags) =>
      prevSelectedTags.includes(id)
        ? prevSelectedTags.filter((tagId) => tagId !== id)
        : [...prevSelectedTags, id]
    );
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label>
        Titre de l'annonce:
        <br />
        <input
          className="text-field"
          {...register("title", {
            minLength: { value: 2, message: "Minimum 2 characters" },
            required: "This field is required",
          })}
        />
        {errors.title && (
          <span className="error-message">{errors.title.message}</span>
        )}
      </label>
      <br />

      <label>
        Description:
        <br />
        <input
          className="text-field"
          {...register("description", {
            minLength: { value: 10, message: "Minimum 10 characters" },
            required: "This field is required",
          })}
        />
        {errors.description && (
          <span className="error-message">{errors.description.message}</span>
        )}
      </label>
      <br />

      <label>
        Vendeur:
        <br />
        <input
          className="text-field"
          {...register("owner", {
            minLength: { value: 2, message: "Minimum 2 characters" },
            required: "This field is required",
          })}
        />
        {errors.owner && (
          <span className="error-message">{errors.owner.message}</span>
        )}
      </label>
      <br />

      <label>
        Prix:
        <br />
        <input
          type="number"
          className="text-field"
          {...register("price", {
            min: { value: 0, message: "Minimum price is 0" },
            required: "This field is required",
          })}
        />
        {errors.price && (
          <span className="error-message">{errors.price.message}</span>
        )}
      </label>
      <br />

      <label>
        Image URL:
        <br />
        <input
          className="text-field"
          {...register("picture", {
            required: "This field is required",
          })}
        />
        {errors.picture && (
          <span className="error-message">{errors.picture.message}</span>
        )}
      </label>
      <br />

      <label>
        Ville:
        <br />
        <input
          className="text-field"
          {...register("location", {
            minLength: { value: 2, message: "Minimum 2 characters" },
            required: "This field is required",
          })}
        />
        {errors.location && (
          <span className="error-message">{errors.location.message}</span>
        )}
      </label>
      <br />

      <label>
        Date:
        <br />
        <input
          type="date"
          className="text-field"
          {...register("createdAt", {
            required: "This field is required",
          })}
        />
        {errors.createdAt && (
          <span className="error-message">{errors.createdAt.message}</span>
        )}
      </label>
      <br />

      <label>
        Category:
        <br />
        <select
          {...register("category", { required: "Please select a category" })}
        >
          {categories.map((el) => (
            <option key={el.id} value={el.id}>
              {el.name}
            </option>
          ))}
        </select>
        {errors.category && (
          <span className="error-message">{errors.category.message}</span>
        )}
      </label>
      <br />

      <label>Tags:</label>
      <br />
      {tags.map((tag) => (
        <Fragment key={tag.id}>
          <label>
            <input
              type="checkbox"
              value={tag.id}
              onChange={() => handleTagChange(tag.id)} // Use the checkbox handler
            />
            {tag.name}
          </label>
          <br />
        </Fragment>
      ))}

      <input type="submit" className="button" value="Submit Ad" />
    </form>
  );
};

export default NewADForm;
