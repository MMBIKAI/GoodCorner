import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { Clothes } from "../entities/clothes";
import clotheInput from "../inputs/clothesInput";
import UpdateAdInput from "../inputs/clothingUpdate";
import { Tag } from "../entities/tags";
import { In } from "typeorm";
import { Picture } from "../entities/pictures";
import { Category } from "../entities/categories";

@Resolver(Clothes)
class ClothesResolver {
  @Query(() => [Clothes])
  async getAllClothes() {
       const  clothesg = await Clothes.find({
          relations: ["tags"], // Include the tags relation
            order: {
            id: "DESC",
            }
      });
      return clothesg;
  }

  @Query(() => Clothes)
  async getClothesById (@Arg("id") id: number) {
    const clothe = await Clothes.findOne({
       where: {id} ,
      relations: ["tags"], // Ensure the tags relation is included
    });
    return clothe;
  }

/*  @Mutation(() =>Clothes)
  async createNewClothe(@Arg("data") newclothedata: clotheInput) {
    const pictures: Picture[] = [];
    if (newclothedata.pictures) {
      newclothedata.pictures.forEach((el) => {
        const newPicture = new Picture();
        newPicture.url = el;
        pictures.push(newPicture);
      });
    }
    const newAdToSave = Clothes.create({ ...newclothedata, pictures });

    const result = await newAdToSave.save();
    return result;
  }*/
   /* @Mutation(() => Clothes)
    async createNewClothe(@Arg("data") newClotheData: clotheInput) {
      const pictures: Picture[] = [];
    
      // Handle picture URLs and create Picture entities
      if (newClotheData.pictures) {
        newClotheData.pictures.forEach((el) => {
          const newPicture = new Picture(); // Create a new Picture entity for each URL
          newPicture.url = el; // Assign the URL from the input data
          pictures.push(newPicture); // Add the new Picture entity to the array
        });
      }
    
      // Find the Category entity using its ID (assuming the category ID is provided)
      const category = await Category.findOne({ where: { id: newClotheData.category } });
      if (!category) {
        throw new Error("Category not found");
      }
    
      // Find the Tag entities using their IDs (assuming tags are provided as an array of IDs)
     /* const tags = await Tag.findBy({
        id: In(newClotheData.tags || []), // Use In to find tags by their IDs
      });
      if (newClotheData.tags && tags.length !== newClotheData.tags.length) {
        throw new Error("One or more tags not found");
      }
    
      // Remove duplicates from the tags to prevent inserting the same tag multiple times
      const uniqueTags = Array.from(new Set(tags.map(tag => tag.id)))
        .map(id => tags.find(tag => tag.id === id))
        .filter((tag): tag is Tag => tag !== undefined); // Filter out undefined tags
    */
      // Create a new Clothes entity with valid data
  /*    const newAdToSave = Clothes.create({
        ...newClotheData,
        pictures, // Pass pictures array
        category, // Pass the actual Category entity
        //tags: uniqueTags, // Pass only unique tags
        tags: newClotheData.tags?.map((el) => ({ id: parseInt(el)})),
      });
      console.log(
        "new ad to save tags",
        JSON.stringify(newAdToSave.tags, null, 2)
      );
      // Save the entity and return the result
      const result = await newAdToSave.save();
      return result;
    }*/
    @Mutation(() => Clothes)
      async createNewClothe (@Arg("data") newAdData: clotheInput) {
        // Map category ID to a Category entity
        const category = await Category.findOneBy({ id: newAdData.category });
        if (!category) throw new Error("Category not found");

        // Map tag IDs to Tag entities
        const tags = await Tag.findBy({ id: In(newAdData.tags?.map(tag => tag.id) || []) });

        // Map PictureInput to Picture entities
        const pictures = newAdData.pictures?.map(pictureInput => Picture.create({ url: pictureInput.url }));

        // Create and save the Clothes entity
        const newAdToSave = Clothes.create({
          ...newAdData,
          category, // Assign the Category entity
          tags, // Assign the Tag entities
          pictures, // Assign the Picture entities
        });

        const result = await newAdToSave.save();
        return result;
      }


  @Mutation(() => String)
  async deleteClotheById(@Arg("idDelete") id: number): Promise<string> {
    const result = await Clothes.delete({ id: id });
    console.log("result", result.affected);
    if (result.affected === 1) {
      return "The clothes are successfully deleted";
    } else {
      return "No clothes found with the specified ID";
    }
  }

  @Mutation(() => Clothes)
  async modifyClotheById(
    @Arg("data") updatedData: UpdateAdInput
  ) {
    try {
      // Fetch the clothing ad to update by its ID, including its pictures and tags
      let adToUpdate = await Clothes.findOneOrFail({
        where: { id: updatedData.id },
        relations: ["pictures", "tags"],  // Include related tags to modify them
      });
  
      // Update the fields with the updated data
      adToUpdate = Object.assign(adToUpdate, updatedData);
  
      // Handle the pictures update by adding new ones
      if (updatedData.pictures && updatedData.pictures.length > 0) {
        const existingPictures = adToUpdate.pictures || [];
        
        // Create new picture instances and save them to the database
        const newPictures = await Promise.all(updatedData.pictures.map(async (url) => {
          if (!url) {
            throw new Error("Picture URL cannot be empty or null");
          }
          
          // Create and save the new picture
          const picture = Picture.create({ url });
          await picture.save();  // Ensure the picture is saved and has an id
          return picture;  // Return the saved picture which now has an id
        }));
  
        // Combine existing pictures and newly saved pictures
        adToUpdate.pictures = [...existingPictures, ...newPictures];
      }
  
      // Handle the tags update by fetching them using the IN operator
      if (updatedData.tags && updatedData.tags.length > 0) {
        const tags = await Tag.findBy({
          id: In(updatedData.tags),  // Use the In operator to find tags by their IDs
        });
        adToUpdate.tags = tags;  // Assign the tags to the ad
      }
  
      // Save the updated ad (with all properties and added pictures)
      const result = await adToUpdate.save();
      return result;
    } catch (err) {
      console.error("Error updating clothing ad:", err);
      throw new Error("Invalid request: Ad could not be updated");
    }
  }
  
  
}
export default ClothesResolver;