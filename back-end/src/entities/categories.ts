import {
    BaseEntity,
    Column,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn,
  } from "typeorm";
  import { Clothes } from "./clothes";
import { Field, ObjectType } from "type-graphql";
  
  @ObjectType()
  @Entity( )
  export class Category extends BaseEntity {
    @Field()
    @PrimaryGeneratedColumn()
    id?: number;
  
    @Field()
    @Column({ nullable: false})
    name?: string;
  
    @OneToMany(() => Clothes, (clothes) => clothes.category)
    clothes?: Clothes[];

  }