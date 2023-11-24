import { TOrder, TUser } from './user.interface';
import { User } from './user.model';

// post-route-"/api/users"
const createUserIntoDb = async (user: TUser) => {
  const result = await User.create(user);
  const data = await User.findOne({ userId: result.userId }).select(
    '-_id -__v -orders',
  );
  return data;
};

// get-route-"/api/users"
const getAllUserFromDb = async () => {
  const result = await User.find(
    {},
    { username: 1, fullName: 1, age: 1, email: 1, address: 1, _id: 0 },
  );

  return result;
};

// get-route-"/api/users/:userId"
const getSingleUserFromDb = async (id: number) => {
  const user = await User.isUserExists(id);
  if (!user) {
    throw new Error('User not found');
  }
  return user;
};

// put-route-"/api/users/:userId"
const updateUserIntoDb = async (id: number, user: TUser) => {
  const existsUser = await User.isUserExists(id);
  if (!existsUser) {
    throw new Error('User not found');
  }

  const userData = await User.updateOne({ userId: id }, user);
  const userInfo = await User.findOne(
    { userId: id },
    { _id: 0, orders: 0, __v: 0 },
  );
  return { userData, userInfo };
};

// delete-route-"/api/users/:userId"
const deleteUserFromDb = async (id: number) => {
  const existsUser = await User.isUserExists(id);
  if (!existsUser) {
    throw new Error('User not found');
  }
  const result = await User.deleteOne({ userId: id });
  return result;
};

// put-route-"/api/users/:userId/orders"
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

// get-route-"/api/users/:userId/orders"
const getUserOrdersFromDb = async (id: number) => {
  const existsUser = await User.isUserExists(id);
  if (!existsUser) {
    throw new Error('User not found');
  }

  const result = await User.findOne({ userId: id }, { orders: 1, _id: 0 });
  return result;
};

// get-route-"/api/users/:userId/orders/total-price"
const getUserOrderTotalAmount = async (id: number) => {
  const existsUser = await User.isUserExists(id);
  if (!existsUser) {
    throw new Error('User not found');
  }

  const result = await User.aggregate([
    {
      $match: { userId: id },
    },
    {
      $unwind: '$orders',
    },
    {
      $group: {
        _id: null,
        totalPrice: { $sum: '$orders.price' },
      },
    },
    {
      $project: {
        _id: 0,
        totalPrice: 1,
      },
    },
  ]);

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
  getUserOrderTotalAmount,
};
