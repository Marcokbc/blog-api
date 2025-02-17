import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
  CreateDateColumn,
} from "typeorm";
import Category from "./Category";

@Entity("posts")
class Post {
  @PrimaryGeneratedColumn("increment")
  id!: number;

  @Column()
  title!: string;

  @Column("text", { nullable: true })
  content!: string;

  @Column("varchar", { nullable: true })
  imageUrl!: string;

  @Column("varchar", { nullable: true })
  audioUrl!: string;

  @ManyToMany(() => Category, (category) => category.posts)
  @JoinTable({
    name: "post_categories_pivot",
    joinColumn: { name: "postId", referencedColumnName: "id" },
    inverseJoinColumn: { name: "categoryId", referencedColumnName: "id" },
  })
  categories!: Category[];

  @CreateDateColumn()
  createdAt!: Date;

  @CreateDateColumn()
  updatedAt!: Date;
}

export default Post;
