//import { MinLength } from "class-validator";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  BaseEntity,
  ManyToMany,
  JoinTable,
  OneToMany,
} from "typeorm";
import { Category } from "./categories";
import { Tag } from "./tags";
import { Picture } from "./pictures";

@Entity()
export class Clothes extends BaseEntity {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  title?: string;

  @Column()
  description?: string;

  @Column()
  owner?: string;

  @Column("float")
  price?: number;

  @OneToMany(() => Picture, (picture) => picture.clothes, {
    cascade: true,
  })
  pictures?: Picture[];

  @Column()
  location?: string;

  @Column({ type: "datetime" }) // Use datetime instead of timestamp
  createdAt?: Date;

  @ManyToOne(() => Category, (category) => category.clothes, { eager: true }) //eager: to get the category with the other properties, when get the details of the ad
  category?: Category;

  @ManyToMany(() => Tag, (tag) => tag.clothes)
  @JoinTable()
  tags?: Tag[];
}
