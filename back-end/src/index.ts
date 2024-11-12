//console.log("hello from typescript");
import "reflect-metadata";
import express from "express";
import cors from "cors";
import sqlite3 from "sqlite3";
import { Like } from "typeorm";
import { dataSourceGoodCorner } from "./config/db";
import { Clothes } from "./entities/clothes";
import { Category } from "./entities/categories";
import { validate } from "class-validator";
import { Tag } from "./entities/tags";
import { Picture } from "./entities/pictures";

//const dataBase = new sqlite3.Database('dataBase.sqlite');

const app = express();

app.use(cors());
app.use(express.json());

const port = 3000;

/*const clothes = [
  {
    id: 1,
    title: "Girls' Summer Dress",
    description:
      "A beautiful, lightweight summer dress for girls. Perfect for sunny days.",
    owner: "dress.seller@gmail.com",
    price: 25,
    picture:
      "https://example.com/images/girls-summer-dress.jpg",
    location: "Paris",
    createdAt: "2023-09-05T10:13:14.755Z",
  },
  {
    id: 2,
    title: "Boys' Casual T-Shirt",
    description:
      "Comfortable and stylish casual t-shirt for boys. Great for everyday wear.",
    owner: "tshirt.seller@gmail.com",
    price: 15,
    picture:
      "https://example.com/images/boys-casual-tshirt.jpg",
    location: "Paris",
    createdAt: "2023-10-05T10:14:15.922Z",
  },
  {
    id: 3,
    title: "Girls' Sneakers",
    description:
      "Trendy sneakers for girls. Perfect for both play and casual outings.",
    owner: "sneakers.seller@gmail.com",
    price: 40,
    picture:
      "https://example.com/images/girls-sneakers.jpg",
    location: "Paris",
    createdAt: "2023-09-10T10:15:16.855Z",
  },
  {
    id: 4,
    title: "Boys' Sports Shorts",
    description:
      "Lightweight and breathable sports shorts for boys. Ideal for sports and outdoor activities.",
    owner: "shorts.seller@gmail.com",
    price: 20,
    picture:
      "https://example.com/images/boys-sports-shorts.jpg",
    location: "Paris",
    createdAt: "2023-09-15T10:16:17.944Z",
  },
  {
    id: 5,
    title: "Girls' Winter Coat",
    description:
      "Warm and stylish winter coat for girls. Perfect for cold weather.",
    owner: "coat.seller@gmail.com",
    price: 60,
    picture:
      "https://example.com/images/girls-winter-coat.jpg",
    location: "Paris",
    createdAt: "2023-09-20T10:17:18.032Z",
  },
  {
    id: 6,
    title: "Boys' Hooded Sweatshirt",
    description:
      "Cozy hooded sweatshirt for boys. Great for layering in chilly weather.",
    owner: "sweatshirt.seller@gmail.com",
    price: 30,
    picture:
      "https://example.com/images/boys-hooded-sweatshirt.jpg",
    location: "Paris",
    createdAt: "2023-09-25T10:18:19.145Z",
  },
  {
    id: 7,
    title: "Girls' Leggings",
    description:
      "Soft and stretchy leggings for girls. Perfect for casual outings or sports.",
    owner: "leggings.seller@gmail.com",
    price: 18,
    picture:
      "https://example.com/images/girls-leggings.jpg",
    location: "Paris",
    createdAt: "2023-09-30T10:19:20.255Z",
  },
  {
    id: 8,
    title: "Boys' Jeans",
    description:
      "Durable and stylish jeans for boys. A wardrobe essential for any season.",
    owner: "jeans.seller@gmail.com",
    price: 35,
    picture:
      "https://example.com/images/boys-jeans.jpg",
    location: "Paris",
    createdAt: "2023-10-01T10:20:21.364Z",
  },
  {
    id: 9,
    title: "Girls' Swimwear",
    description:
      "Cute and comfortable swimwear for girls. Perfect for beach days.",
    owner: "swimwear.seller@gmail.com",
    price: 22,
    picture:
      "https://example.com/images/girls-swimwear.jpg",
    location: "Paris",
    createdAt: "2023-10-02T10:21:22.474Z",
  },
  {
    id: 10,
    title: "Boys' Athletic Shoes",
    description:
      "Lightweight athletic shoes for boys. Ideal for sports and outdoor activities.",
    owner: "athletic.seller@gmail.com",
    price: 45,
    picture:
      "https://example.com/images/boys-athletic-shoes.jpg",
    location: "Paris",
    createdAt: "2023-10-03T10:22:23.584Z",
  },
];*/

//app.get("/clothes", (req, res) => {
// res.send(clothes);
//});
//****************sql
/*app.get("/clothes", (req, res) => {
  dataBase.all("SELECT * FROM clothes", (err, rows) => {
    res.send(rows);
  })
});*/
//**************TypeORM */
app.get("/clothes", async (req, res) => {
  let clothes: Clothes[] = [];

  try {
    if (req.query.category) {
      // Find clothes by category
      clothes = await Clothes.find({
        where: {
          category: { name: req.query.category as string },
        },
        order: {
          id: "DESC",
        },
        relations: ["category", "tags", "pictures"], // Ensure we include category relation
      });
    } else if (req.query.title) {
      // Find clothes by title (searching with LIKE)
      clothes = await Clothes.find({
        where: {
          title: Like(`%${req.query.title as string}%`), // Partial matches
        },
      });
    } else {
      // If neither category nor title is provided, fetch all clothes
      clothes = await Clothes.find({
        relations: ["category", "tags", "pictures"],
      });
    }

    res.send(clothes); // Return the filtered clothes
  } catch (error) {
    console.error("Error fetching clothes:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.get("/clothes/:id", async (req, res) => {
  try {
    // Convert the ID from string to number
    const id = parseInt(req.params.id);

    // Fetch the announcement from the database, including the associated tags
    const result = await Clothes.findOneOrFail({
      where: { id },
      relations: ["tags"], // Include the tags relation
    });

    // If found, send the announcement with its associated tags
    res.send(result);
  } catch (err: any) {
    // If not found or there's an error, catch it and send an appropriate message
    if (err.name === "EntityNotFoundError") {
      res.status(404).json({ message: "Announcement not found" });
    } else {
      res.status(500).json({ message: "Server error" });
    }
  }
});

/*app.get("/clothes/Paris", (req, res) => {
  dataBase.all("SELECT * FROM clothes WHERE location = 'Paris'", (err, rows) => {
    if (err) {
      res.status(500).send("Error retrieving data");
    } else {
      res.json(rows);
    }
  });
});*/

/*app.post("/clothes", (req, res) => {
  console.log(req.body);
  clothes.push(req.body);
  res.send("Request received, check the backend terminal");
});*/
//****************TypeORM POST */
app.delete("/clothes/:id", async (req, res) => {
  const result = await Clothes.delete(req.params.id);
  console.log(result);
  res.send("one of clothes has been deleted");
});

app.put("/clothes/:id", async (req, res) => {
  try {
    let adToUpdate = await Clothes.findOneByOrFail({
      id: parseInt(req.params.id),
    });
    adToUpdate = Object.assign(adToUpdate, req.body);
    const result = await adToUpdate.save();
    console.log(result);
    res.send("Ad has been updated");
  } catch (err) {
    console.log(err);
    res.status(400).send("invalid request");
  }
});

app.post("/clothes", async (req, res) => {
  console.log("request body", req.body);
  const pictures: Picture[] = [];
  req.body.pictures.forEach(async (el: string) => {
    const newPicture = new Picture();
    newPicture.url = el;
    pictures.push(newPicture);
  });
  const adToSave = new Clothes();
  adToSave.createdAt = req.body.createdAt;
  adToSave.description = req.body.description;
  adToSave.location = req.body.location;
  adToSave.owner = req.body.owner;
  adToSave.price = req.body.price;
  adToSave.title = req.body.title;
  adToSave.category = req.body.category ? req.body.category : 1;
  if (req.body.tags) {
    adToSave.tags = req.body.tags;
  }
  if (pictures.length > 0) {
    adToSave.pictures = pictures;
  }

  const errors = await validate(adToSave);
  if (errors.length > 0) {
    console.log(errors);
    // throw new Error("Validation failed");
    res.status(400).send("Invalid input");
  } else {
    try {
      const result = await adToSave.save();
      res.send(result);
    } catch (err) {
      console.log("err", err);
      res.status(400).send(JSON.stringify(err));
    }
  }
});

/////////////////////////////////////////////////

app.get("/categories", async (req, res) => {
  let categories: Category[];
  if (req.query.title) {
    categories = await Category.find({
      where: {
        name: Like(`${req.query.title as string}%`),
      },
    });
  } else {
    categories = await Category.find();
  }
  res.send(categories);
});

app.post("/categories", async (req, res) => {
  const categoryToSave = new Category();
  categoryToSave.name = req.body.title;
  await categoryToSave.save();
  res.send("Category has been saved");
});

app.put("/categories/:id", async (req, res) => {
  try {
    let categoryToUpdate = await Category.findOneByOrFail({
      id: parseInt(req.params.id),
    });
    categoryToUpdate = Object.assign(categoryToUpdate, req.body.title);
    const result = await categoryToUpdate.save();
    console.log(result);
    res.send("Category has been updated");
  } catch (err) {
    console.log(err);
    res.status(400).send("invalid request");
  }
});

app.delete("/categories/:id", async (req, res) => {
  const result = await Category.delete(req.params.id);
  console.log(result);
  res.send("Category has been deleted");
});

app.get("/tags", async (_req, res) => {
  const tags = await Tag.find();
  res.send(tags);
});

app.post("/tags", async (req, res) => {
  const tagToSave = new Tag();
  tagToSave.name = req.body.name;
  await tagToSave.save();
  res.send("Tag has been created");
});

app.put("/tags/:id", async (req, res) => {
  try {
    let tagToUpdate = await Tag.findOneByOrFail({
      id: parseInt(req.params.id),
    });
    tagToUpdate = Object.assign(tagToUpdate, req.body);
    const result = await tagToUpdate.save();
    console.log(result);
    res.send("Tag has been updated");
  } catch (err) {
    console.log(err);
    res.status(400).send("invalid request");
  }
});

app.delete("/tags/:id", async (req, res) => {
  const result = await Tag.delete(req.params.id);
  console.log(result);
  res.send("Tag has been deleted");
});
/*app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});*/
app.listen(port, async () => {
  await dataSourceGoodCorner.initialize();
  console.log(`Example app listening on port ${port}`);
});
