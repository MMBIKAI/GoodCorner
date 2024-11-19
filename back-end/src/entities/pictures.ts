import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  BaseEntity,
} from "typeorm";
import { Clothes } from "./clothes";
import { Field, ObjectType } from "type-graphql";

@ObjectType()
@Entity()
export class Picture extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id!: number;

  @Field()
  @Column({ nullable: false })
  url?: string;

  //@Field(() => Clothes, { nullable: true }) // Allows the clothes property to be nullable in the schema
  @ManyToOne(() => Clothes, (clothes) => clothes.pictures, {onDelete: "CASCADE"})
  clothes?: Clothes;
}

