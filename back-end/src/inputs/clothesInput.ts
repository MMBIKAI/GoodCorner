import { Field, ID, InputType } from "type-graphql";
import { Category } from "../entities/categories";
import { Tag } from "../entities/tags";
import { Picture } from "../entities/pictures";

@InputType()
class PictureInput {
    @Field()
    url!: string;
}

@InputType()
class TagInput {
  @Field()
  id!: number;
}

@InputType()
class clotheInput {
    @Field()
    title!: string;

    @Field()
    description!: string;

    @Field()
    owner!: string;

    @Field()
    price!: number;

    @Field(() => [PictureInput], { nullable: true })
    pictures?: PictureInput[];

    @Field()
    location!: string;

    @Field()
    createdAt!: Date;

    @Field(() => ID)
    category!: number;

    //@Field(() => [ID], { nullable: true })
    //tags?: number[];

    @Field(() => [TagInput], { nullable: true })
    tags?: TagInput[];
}

export default clotheInput ;
