import {
    BaseEntity,
    Column,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn,
  } from "typeorm";
  import { Clothes } from "./clothes";
  
  @Entity( )
  export class Category extends BaseEntity {
    @PrimaryGeneratedColumn()
    id?: number;
  
    @Column({ nullable: false})
    name?: string;
  
    @OneToMany(() => Clothes, (clothes) => clothes.category)
    clothes?: Clothes[];

  }