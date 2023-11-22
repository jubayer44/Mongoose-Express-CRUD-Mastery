import { TUser } from './user.interface';
import { User } from './user.model';

const createUserIntoDb = async (user: TUser) => {
  const result = await User.create(user);
  return result;
};

const getAllUserFromDb = async () => {
  const result = await User.find(
    {},
    { username: 1, fullName: 1, age: 1, email: 1, address: 1 },
  );

  return result;
};

export const studentServices = { createUserIntoDb, getAllUserFromDb };
