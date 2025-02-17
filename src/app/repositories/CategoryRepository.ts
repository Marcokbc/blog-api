import Category from "../entities/Category";
import { ICategory } from "../interfaces/ICategory";
import { AppDataSource } from "../../database/data-source";

const categoryRepository = AppDataSource.getRepository(Category);

const all = (): Promise<ICategory[]> => {
  return categoryRepository.find({ relations: ["posts"] });
};

const find = (id: number): Promise<ICategory | null> => {
  return categoryRepository.findOne({ where: { id }, relations: ["posts"] });
};

const set = async (data: ICategory): Promise<ICategory> => {
  const post = categoryRepository.create(data);
  return await categoryRepository.save(post);
};

const update = async (
  id: number,
  updateData: Partial<ICategory>
): Promise<ICategory | null> => {
  categoryRepository.update(id, updateData);

  return categoryRepository.findOne({ where: { id } });
};

const destroy = async (id: number): Promise<void> => {
  categoryRepository.delete(id);
};

export default { all, find, set, update, destroy };