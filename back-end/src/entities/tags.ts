import {
  BaseEntity,
  Column,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Clothes } from "./clothes";
import { Field, ObjectType } from "type-graphql";

@ObjectType()
@Entity()
export class Tag extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id?: number;

  @Field()
  @Column({ unique: true })
  name?: string;

  //@Field(() => [Clothes])
  @ManyToMany(() => Clothes, (clothes) => clothes.tags, { onDelete: "CASCADE" })
  clothes?: Clothes[];
}
