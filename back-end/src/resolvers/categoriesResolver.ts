import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { Category } from "../entities/categories";


@Resolver(Category)
class categoryResolver {
    @Query(() => [Category])
    async getAllCategories() {
       const result = await Category.find({
       order: {
        id: "DESC",
       }   
        
      });
      return result;
    }

    @Query(() => Category)
    async getCategoryById(@Arg("idCat") id: number){
        try {
            let result = await Category.findOneByOrFail({
              id: id
            });
        
            return result;
          } catch (err) {;
            throw new Error("Invalid request: No category found with this ID");
          }
    }

    @Mutation(() => Category)
    async createNewcategory(@Arg("NewCatName") name: string){
        try{
        const categoryTOsave = new Category();
        categoryTOsave.name = name;
        await categoryTOsave.save();
        return categoryTOsave;
        }
        catch(error)
        {
            console.error("Error creating category:", error);
            throw new Error("Error creating category");
        }
    }

    @Mutation(() => String)
    async deleteCategoryById(@Arg("idCateDelete") id: number){
        const result = await Category.delete({id: id});
        console.log("result", result.affected);
        if (result.affected === 1) {
            return "The category are successfully deleted";
          } else {
            throw new Error("No category found with the specified ID");
          }
    }
    @Mutation(() => Category)
    async modifyCategoryById(
        @Arg("idCatToModify") id: number,
        @Arg("ModifyCatName", { nullable: true }) name?: string){

        try{
            let catToUpdate = await Category.findOneByOrFail({id:id});
           // Update the name if it's provided
                if (name) {
                    catToUpdate.name = name;
                }

                const result = await catToUpdate.save();
                return result;
        }catch(err){
            //console.log(err);
            throw new Error("INvalid request: category could not be updated")
        }
    }
}
export default categoryResolver;