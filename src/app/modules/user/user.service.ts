import { TOrder, TUser } from './user.interface';
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

const getSingleUserFromDb = async (id: number) => {
  const user = await User.isUserExists(id);
  if (!user) {
    throw new Error('User not found');
  }
  return user;
};

const updateUserIntoDb = async (id: number, user: TUser) => {
  const existsUser = await User.isUserExists(id);
  if (!existsUser) {
    throw new Error('User not found');
  }

  const userData = await User.updateOne({ userId: id }, user);
  const userInfo = await User.findOne({ userId: id }, { _id: 0, orders: 0 });
  return { userData, userInfo };
};

const deleteUserFromDb = async (id: number) => {
  const existsUser = await User.isUserExists(id);
  if (!existsUser) {
    throw new Error('User not found');
  }
  const result = await User.deleteOne({ userId: id });
  return result;
};

const addNewProductIntoOrder = async (id: number, product: TOrder) => {
  const existsUser = await User.isUserExists(id);
  if (!existsUser) {
    throw new Error('User not found');
  }
  const result = await User.updateOne(
    { userId: id },
    { $addToSet: { orders: product } },
  );
  return result;
};

const getUserOrdersFromDb = async (id: number) => {
  const existsUser = await User.isUserExists(id);
  if (!existsUser) {
    throw new Error('User not found');
  }

  const result = await User.findOne({ userId: id }, { orders: 1, _id: 0 });
  return result;
};

export const UserServices = {
  createUserIntoDb,
  getAllUserFromDb,
  getSingleUserFromDb,
  updateUserIntoDb,
  deleteUserFromDb,
  addNewProductIntoOrder,
  getUserOrdersFromDb,
};
