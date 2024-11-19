import { Fragment } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { ErrorMessage } from "@hookform/error-message";
import { useForm, SubmitHandler, useFieldArray } from "react-hook-form";
import { useMutation } from "@apollo/client";
import { ADD_NEW_CLOTHING } from "../graphql/mutations";
import { Tag, useGetCategoriesQuery, useGetclothingQuery, useGetTagsQuery } from "../generated/graphql-types";

type Inputs = {
  title: string;
  description: string;
  owner: string;
  price: string;
//   picturesUrls: string[];
  pictures: { url: string}[],
  location: string;
  createdAt: string;
  category: number;
  tags: string[];
};

const NewAdFormPage = () => {
  const navigate = useNavigate();
  const { error: categoryError, loading: categoryLoading, data: categoryData } = useGetCategoriesQuery();
  const { error: tagsError, loading: tagsLoading, data: tagsData } = useGetTagsQuery();
  const [createNewAd] = useMutation(ADD_NEW_CLOTHING);
  const { refetch: refetchAds } = useGetclothingQuery(); // Query to refresh ads

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<Inputs>({
    criteriaMode: "all",
    defaultValues: {
      category: 1,
      title: "default title",
      description: "default description",
      createdAt: "23/11/2023",
    //   picturesUrls: [
    //     "https://www.prioritybicycles.com/cdn/shop/files/600_hero_May2024_1of1.jpg",
    //   ],
    pictures: [
        { url: "https://www.prioritybicycles.com/cdn/shop/files/600_hero_May2024_1of1.jpg"}
      ],
      location: "default location",
      owner: "John Doe",
      price: "100",
      tags: []
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "pictures",
  });

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    console.log("data from react hook form", data);
    const dataForBackend = {
      ...data,
      price: parseInt(data.price),
      createdAt: data.createdAt + "T00:00:00.000Z",
      //picturesUrls: data.pictures,
      tags: data.tags ? data.tags.map((el) => ({ id: parseInt(el) })) : [],
    };

    console.log("data for backend", dataForBackend);

    try {
      await createNewAd({ variables: { data: dataForBackend } });
      toast.success("Ad has been added");
      await refetchAds();
      navigate("/");
    } catch (error) {
      toast.error("Error creating ad");
    }
  };

  if (categoryLoading || tagsLoading) return <p>Loading...</p>;
  if (categoryError || tagsError) return <p>Error : {categoryError?.message || tagsError?.message}</p>;

    return (
      <>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Title */}
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
          </label>
          <ErrorMessage
            errors={errors}
            name="title"
            render={({ messages }) =>
              messages &&
              Object.entries(messages).map(([type, message]) => (
                <Fragment key={type}>
                  <br />
                  <span className="error-message">{message}</span>
                </Fragment>
              ))
            }
          />
          <br />
  
          {/* Description */}
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
          </label>
          <ErrorMessage
            errors={errors}
            name="description"
            render={({ messages }) =>
              messages &&
              Object.entries(messages).map(([type, message]) => (
                <Fragment key={type}>
                  <br />
                  <span className="error-message">{message}</span>
                </Fragment>
              ))
            }
          />
          <br />
  
          {/* Owner */}
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
          </label>
          <ErrorMessage
            errors={errors}
            name="owner"
            render={({ messages }) =>
              messages &&
              Object.entries(messages).map(([type, message]) => (
                <Fragment key={type}>
                  <br />
                  <span className="error-message">{message}</span>
                </Fragment>
              ))
            }
          />
          <br />
  
          {/* Price */}
          <label>
            Prix :
            <br />
            <input
              type="number"
              className="text-field"
              {...register("price", {
                min: { value: 0, message: "Minimum 0" },
                required: "This field is required",
              })}
            />
          </label>
          <ErrorMessage
            errors={errors}
            name="price"
            render={({ messages }) =>
              messages &&
              Object.entries(messages).map(([type, message]) => (
                <Fragment key={type}>
                  <br />
                  <span className="error-message">{message}</span>
                </Fragment>
              ))
            }
          />
          <br />
  
          {/* Pictures URLs */}
          <>
          <button
                className="button"
                type="button"
                onClick={() => append({ url: "" })}
              >
                Add Image
              </button>
              <br />
              <div className="field">
                {fields.map((field, index) => {
                  return (
                    <div key={field.id}>
                      <section className="image-input-and-remove">
                        <input
                          className="text-field"
                          placeholder="Your image url"
                          {...register(`pictures.${index}.url` as const)}
                        />
                        <button className="button" onClick={() => remove(index)}>
                          Remove
                        </button>
                        <br />
                      </section>
                      <span>{errors.pictures?.[index]?.url?.message}</span>
                    </div>
                  );
                })}
              </div>
            </>
            <br />
  
  
          {/* Location */}
          <label>
            Ville :
            <br />
            <input
              className="text-field"
              {...register("location", {
                minLength: { value: 2, message: "Minimum 2 characters" },
                required: "This field is required",
              })}
            />
          </label>
          <ErrorMessage
            errors={errors}
            name="location"
            render={({ messages }) =>
              messages &&
              Object.entries(messages).map(([type, message]) => (
                <Fragment key={type}>
                  <br />
                  <span className="error-message">{message}</span>
                </Fragment>
              ))
            }
          />
          <br />
  
          {/* Date */}
          <label>
            Date :
            <br />
            <input
              type="date"
              className="text-field"
              {...register("createdAt", {
                required: "This field is required",
              })}
            />
          </label>
          <ErrorMessage
            errors={errors}
            name="createdAt"
            render={({ messages }) =>
              messages &&
              Object.entries(messages).map(([type, message]) => (
                <Fragment key={type}>
                  <br />
                  <span className="error-message">{message}</span>
                </Fragment>
              ))
            }
          />
          <br />
  
          {/* Category */}
          <label>
          <br />
          Category :
          <br />
          <select {...register("category")}>
              {categoryData?.getAllCategories.map((el: { id: number; name: string }) => (
              <option key={el.id} value={el.id}>
                  {el.name} {/* Change title to name here */}
              </option>
              ))}
          </select>
          </label>
          <ErrorMessage
            errors={errors}
            name="category"
            render={({ messages }) =>
              messages &&
              Object.entries(messages).map(([type, message]) => (
                <Fragment key={type}>
                  <br />
                  <span className="error-message">{message}</span>
                </Fragment>
              ))
            }
          />
          <br />
  
          {/* Tags */}
          {tagsData?.getAlltags.map((tag: Tag) => (
            <label key={tag.id}>
              <input type="checkbox" value={tag.id} {...register("tags")} />
              {tag.name}
            </label>
          ))}
          <br />
  
          <input type="submit" className="button" />
        </form>
      </>
    );
  
  
};

export default NewAdFormPage;
