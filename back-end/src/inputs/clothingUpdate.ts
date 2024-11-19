import { Field, ID, InputType } from "type-graphql";
import { Category } from "../entities/categories";
import { Clothes } from "../entities/clothes";

@InputType()
class UpdateAdInput  {
  @Field()
  id?: number;

  @Field({ nullable: true })
  title?: string;

  @Field({ nullable: true })
  description?: string;

  @Field({ nullable: true })
  owner?: string;

  @Field({ nullable: true })
  price?: number;

  // Change this field to be a list of strings (URLs or filenames)
  @Field(() => [String], { nullable: true })
  pictures?: string[];


  @Field({ nullable: true })
  location?: string;

  @Field({ nullable: true })
  createdAt?: Date;

  @Field(() => ID, { nullable: true })
  category?: Category;

  @Field(() => [ID], { nullable: true })  // Array of tag IDs (number[])
  tags?: number[]; 
}

export default UpdateAdInput;