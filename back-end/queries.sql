PRAGMA foreign_keys = ON;

CREATE TABLE IF NOT EXISTS clothes 
(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title VARCHAR(100) NOT NULL,
    description TEXT,
    owner VARCHAR(100) NOT NULL,
    price INT,
    picture VARCHAR(100),
    location VARCHAR(100),
    createdAt DATE,
    categoryId INT NOT NULL,
    FOREIGN KEY (categoryId) REFERENCES categories(id)
);

PRAGMA foreign_keys = ON;

INSERT INTO clothes (title, description, owner, price, picture, location, createdAt, categoryId)
VALUES
  ("Girls' Summer Dress", "A beautiful, lightweight summer dress for girls. Perfect for sunny days.", "dress.seller@gmail.com", 25, "https://example.com/images/girls-summer-dress.jpg", "Paris", "2023-09-05T10:13:14.755Z", 2),
  ("Boys' Casual T-Shirt", "Comfortable and stylish casual t-shirt for boys. Great for everyday wear.", "tshirt.seller@gmail.com", 15, "https://example.com/images/boys-casual-tshirt.jpg", "Bordeaux", "2023-10-05T10:14:15.922Z", 1),
  ("Girls' Sneakers", "Trendy sneakers for girls. Perfect for both play and casual outings.", "sneakers.seller@gmail.com", 40, "https://example.com/images/girls-sneakers.jpg", "Lyon", "2023-09-10T10:15:16.855Z", 2),
  ("Boys' Sports Shorts", "Lightweight and breathable sports shorts for boys. Ideal for sports and outdoor activities.", "shorts.seller@gmail.com", 20, "https://example.com/images/boys-sports-shorts.jpg", "Paris", "2023-09-15T10:16:17.944Z", 1),
  ("Girls' Winter Coat", "Warm and stylish winter coat for girls. Perfect for cold weather.", "coat.seller@gmail.com", 60, "https://example.com/images/girls-winter-coat.jpg", "Bordeaux", "2023-09-20T10:17:18.032Z", 2),
  ("Boys' Hooded Sweatshirt", "Cozy hooded sweatshirt for boys. Great for layering in chilly weather.", "sweatshirt.seller@gmail.com", 30, "https://example.com/images/boys-hooded-sweatshirt.jpg", "Lyon", "2023-09-25T10:18:19.145Z", 1),
  ("Girls' Leggings", "Soft and stretchy leggings for girls. Perfect for casual outings or sports.", "leggings.seller@gmail.com", 18, "https://example.com/images/girls-leggings.jpg", "Paris", "2023-09-30T10:19:20.255Z", 2),
  ("Boys' Jeans", "Durable and stylish jeans for boys. A wardrobe essential for any season.", "jeans.seller@gmail.com", 35, "https://example.com/images/boys-jeans.jpg", "Bordeaux", "2023-10-01T10:20:21.364Z", 1),
  ("Girls' Swimwear", "Cute and comfortable swimwear for girls. Perfect for beach days.", "swimwear.seller@gmail.com", 22, "https://example.com/images/girls-swimwear.jpg", "Lyon", "2023-10-02T10:21:22.474Z", 2),
  ("Boys' Athletic Shoes", "Lightweight athletic shoes for boys. Ideal for sports and outdoor activities.", "athletic.seller@gmail.com", 45, "https://example.com/images/boys-athletic-shoes.jpg", "Paris", "2023-10-03T10:22:23.584Z", 1);

DELETE FROM clothes;

DROP TABLE IF EXISTS clothes;

SELECT * FROM clothes WHERE location = "Paris";

SELECT * FROM clothes;

SELECT AVG(price),location FROM clothes WHERE location = "Paris";

CREATE TABLE IF NOT EXISTS categories (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name VARCHAR(50) NOT NULL
);

INSERT INTO categories (name) VALUES 
('Men'), 
('Women');

INSERT INTO clothes (title, description, owner, price, picture, location, createdAt, category_id)
VALUES ('Test Item', 'Test Description', 'test.email@example.com', 20, 'https://example.com/test.jpg', 'Paris', '2023-10-01', 3);

SELECT clothes.title, clothes.price, categories.name
FROM clothes
INNER JOIN categories ON clothes.category_id = categories.id;


SELECT clothes.title, clothes.price, categories.name
FROM clothes
LEFT JOIN categories ON clothes.category_id = categories.id
WHERE categories.id IS NULL;

SELECT categories.name, COUNT(clothes.id) AS number_of_clothes
FROM categories
LEFT JOIN clothes ON categories.id = clothes.category_id
GROUP BY categories.name;

SELECT clothes.title, clothes.description, categories.name
FROM clothes
INNER JOIN categories ON clothes.category_id = categories.id
WHERE categories.name LIKE 'W%';

DROP TABLE categories;

INSERT INTO category (name) VALUES 
('Men'), 
('Women');

-- Step 1: Create a new table without the picture column
CREATE TABLE IF NOT EXISTS new_clothes 
(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title VARCHAR(100) NOT NULL,
    description TEXT,
    owner VARCHAR(100) NOT NULL,
    price INT,
    location VARCHAR(100),
    createdAt DATE,
    categoryId INT NOT NULL,
    FOREIGN KEY (categoryId) REFERENCES categories(id)
);


-- Step 2: Copy data from the old table to the new table
INSERT INTO new_clothes (id, title, description, owner, price, location, createdAt, categoryId)
SELECT id, title, description, owner, price, location, createdAt, categoryId FROM clothes;

-- Step 3: Drop the old table
DROP TABLE picture;

-- Step 4: Rename the new table to the original table's name
ALTER TABLE new_clothes RENAME TO clothes;

CREATE TABLE IF NOT EXISTS pictures
(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    url VARCHAR(255) ,
    clothesId INT ,
    FOREIGN KEY (clothesId) REFERENCES clothes(id) ON DELETE CASCADE
);


INSERT INTO clothes (title, description, owner, price, location, createdAt, categoryId)
VALUES
  ("Girls' Summer Dress", "A beautiful, lightweight summer dress for girls. Perfect for sunny days.", "dress.seller@gmail.com", 25, "Paris", "2023-09-05T10:13:14.755Z", 2),
  ("Boys' Casual T-Shirt", "Comfortable and stylish casual t-shirt for boys. Great for everyday wear.", "tshirt.seller@gmail.com", 15, "Bordeaux", "2023-10-05T10:14:15.922Z", 1),
  ("Girls' Sneakers", "Trendy sneakers for girls. Perfect for both play and casual outings.", "sneakers.seller@gmail.com", 40, "Lyon", "2023-09-10T10:15:16.855Z", 2),
  ("Boys' Sports Shorts", "Lightweight and breathable sports shorts for boys. Ideal for sports and outdoor activities.", "shorts.seller@gmail.com", 20, "Paris", "2023-09-15T10:16:17.944Z", 1),
  ("Girls' Winter Coat", "Warm and stylish winter coat for girls. Perfect for cold weather.", "coat.seller@gmail.com", 60, "Bordeaux", "2023-09-20T10:17:18.032Z", 2),
  ("Boys' Hooded Sweatshirt", "Cozy hooded sweatshirt for boys. Great for layering in chilly weather.", "sweatshirt.seller@gmail.com", 30, "Lyon", "2023-09-25T10:18:19.145Z", 1),
  ("Girls' Leggings", "Soft and stretchy leggings for girls. Perfect for casual outings or sports.", "leggings.seller@gmail.com", 18, "Paris", "2023-09-30T10:19:20.255Z", 2),
  ("Boys' Jeans", "Durable and stylish jeans for boys. A wardrobe essential for any season.", "jeans.seller@gmail.com", 35, "Bordeaux", "2023-10-01T10:20:21.364Z", 1),
  ("Girls' Swimwear", "Cute and comfortable swimwear for girls. Perfect for beach days.", "swimwear.seller@gmail.com", 22, "Lyon", "2023-10-02T10:21:22.474Z", 2),
  ("Boys' Athletic Shoes", "Lightweight athletic shoes for boys. Ideal for sports and outdoor activities.", "athletic.seller@gmail.com", 45, "Paris", "2023-10-03T10:22:23.584Z", 1);

DELETE FROM picture;

DELETE FROM clothes_tags_tag
WHERE clothesId = 21;

