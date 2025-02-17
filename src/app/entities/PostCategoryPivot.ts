import { Entity, PrimaryColumn, ManyToOne, CreateDateColumn } from "typeorm";
import Post from "./Post";
import Category from "./Category";

@Entity("post_categories_pivot")
class PostCategoryPivot {
  @PrimaryColumn()
  postId!: number;

  @PrimaryColumn()
  categoryId!: number;

  @ManyToOne(() => Post, (post) => post.categories)
  post!: Post;

  @ManyToOne(() => Category, (category) => category.posts)
  category!: Category;

  @CreateDateColumn()
  createdAt!: Date;

  @CreateDateColumn()
  updatedAt!: Date;
}

export default PostCategoryPivot;
