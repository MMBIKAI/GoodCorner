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
import { Clothes } from "./clothes";

@Entity()
export class Picture extends BaseEntity {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({ nullable: false })
  url?: string;

  @ManyToOne(() => Clothes, (cl) => cl.pictures, { eager: true }) //eager: to get the category with the other properties, when get the details of the ad
  clothes?: Clothes;
}
