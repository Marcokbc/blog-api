import { Repository } from "typeorm";
import { AppDataSource } from "../../database/data-source";
import User from "../entities/User";

const userReepository = AppDataSource.getRepository(User);

const findByUsername = async (username: string): Promise<User | null> => {
  return await userReepository.findOne({ where: { username } });
};

const createUser = async (
  username: string,
  hashedPassword: string
): Promise<User> => {
  const user = userReepository.create({ username, password: hashedPassword });
  return await userReepository.save(user);
};

export default { findByUsername, createUser };
