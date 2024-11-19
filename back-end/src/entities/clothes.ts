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
import { Field, ObjectType } from "type-graphql";

@ObjectType()
@Entity()
export class Clothes extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id?: number;

  @Field()
  @Column()
  title?: string;

  @Field()
  @Column()
  description?: string;

  @Field()
  @Column()
  owner?: string;

  @Field()
  @Column("float")
  price?: number;

  @Field(() => [Picture])
  @OneToMany(() => Picture, (picture) => picture.clothes, { cascade: true, eager: true })
  pictures?: Picture[];

  @Field()
  @Column()
  location?: string;

  @Field()
  @Column()
  createdAt?: Date;

  @Field(() => Category, { nullable: true })
  @ManyToOne(() => Category, (category) => category.clothes, { eager: true })
  category?: Category;

  @Field(() => [Tag], { nullable: true })
  @ManyToMany(() => Tag, (tag) => tag.clothes, { eager: true, cascade: true })
  @JoinTable()
  tags?: Tag[];
}

