import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, CreateDateColumn } from "typeorm";
import Post from "./Post";

@Entity("categories")
class Category {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @ManyToMany(() => Post, (post) => post.categories)
  posts!: Post[];

  @CreateDateColumn()
  createdAt!: Date;

  @CreateDateColumn()
  updatedAt!: Date;
}

export default Category;
