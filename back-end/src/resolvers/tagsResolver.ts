import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { Tag } from "../entities/tags";

@Resolver(Tag)
class tagResolver {
    @Query(() => [Tag])
    async getAlltags() {
       const result = await Tag.find({
       order: {
        id: "DESC",
       }   
        
      });
      return result;
    }

    @Query(() => Tag)
    async getTagById(@Arg("idTag") id: number){
        try {
            let result = await Tag.findOneByOrFail({
              id: id
            });
        
            return result;
          } catch (err) {;
            throw new Error("Invalid request: No tag found with this ID");
          }
    }

    @Mutation(() => Tag)
    async createNewTag(@Arg("NewTagName") name: string){
        try{
        const tagTOsave = new Tag();
        tagTOsave.name = name;
        await tagTOsave.save();
        return tagTOsave;
        }
        catch(error)
        {
            console.error("Error creating tag:", error);
            throw new Error("Error creating tag");
        }
    }

    @Mutation(() => String)
    async deleteTagById(@Arg("idTagDelete") id: number){
        const result = await Tag.delete({id: id});
        console.log("result", result.affected);
        if (result.affected === 1) {
            return "The tag are successfully deleted";
          } else {
            throw new Error("No tag found with the specified ID");
          }
    }

    @Mutation(() => Tag)
    async modifyTagById(
        @Arg("idTagToModify") id: number,
        @Arg("ModifyTagName", { nullable: true }) name?: string){

        try{
            let tagToUpdate = await Tag.findOneByOrFail({id:id});
           // Update the name if it's provided
                if (name) {
                    tagToUpdate.name = name;
                }

                const result = await tagToUpdate.save();
                return result;
        }catch(err){
            //console.log(err);
            throw new Error("INvalid request: tag could not be updated")
        }
    }
}

export default tagResolver;