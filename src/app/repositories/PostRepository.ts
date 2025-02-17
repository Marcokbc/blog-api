import Post from "../entities/Post";
import { IPost } from "../interfaces/IPost";
import { AppDataSource } from "../../database/data-source";
import Category from "../entities/Category";
import { In } from "typeorm";

const postRepository = AppDataSource.getRepository(Post);
const categoryRepository = AppDataSource.getRepository(Category);

const all = (): Promise<IPost[]> => {
  return postRepository.find({ relations: ["categories"], order: { createdAt: "DESC" } });
};

const find = (id: number): Promise<IPost | null> => {
  return postRepository.findOne({ where: { id }, relations: ["categories"] });
};

const findByTitle = (title: string): Promise<IPost | null> => {
  return postRepository.findOne({ where: { title }, relations: ["categories"] });
};

const set = async (
  data: IPost & { categoryIds?: number[] }
): Promise<IPost> => {
  const post = postRepository.create(data);

  if (data.categoryIds && data.categoryIds.length > 0) {
    const categories = await categoryRepository.findBy({
      id: In([data.categoryIds]),
    });
    post.categories = categories;
  }

  return await postRepository.save(post);
};

const update = async (
  id: number,
  updateData: Partial<IPost> & { categoryIds?: number[] }
): Promise<IPost | null> => {
  const post = await postRepository.findOne({
    where: { id },
    relations: ["categories"],
  });

  if (!post) return null;

  Object.assign(post, updateData);

  if (updateData.categoryIds) {
    const categories = await categoryRepository.findBy({
      id: In([updateData.categoryIds]),
    });
    post.categories = categories;
  }

  return await postRepository.save(post);
};

const destroy = async (id: number): Promise<void> => {
  postRepository.delete(id);
};

export default { all, find, findByTitle, set, update, destroy };
