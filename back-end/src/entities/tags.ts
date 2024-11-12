import {
  BaseEntity,
  Column,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Clothes } from "./clothes";

@Entity()
export class Tag extends BaseEntity {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({ unique: true })
  name?: string;

  @ManyToMany(() => Clothes, (clothes) => clothes.tags)
  clothes?: Clothes[];
}
