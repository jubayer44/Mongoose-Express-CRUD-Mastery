import { Request, Response } from 'express';
import { UserServices } from './user.service';
import userValidationSchema, { orderValidationSchema } from './user.validation';

// post-route-"/api/users"
const createUser = async (req: Request, res: Response) => {
  try {
    const userData = req.body;

    const parsedUserData = userValidationSchema.parse(userData);

    const result = await UserServices.createUserIntoDb(parsedUserData);
    res.status(201).json(successMessage('User created successfully!', result));
    // eslint-disable-next-line
  } catch (error: any) {
    res.status(404).json(errorMessage(error));
  }
};

// get-route-"/api/users"
const getAllUser = async (req: Request, res: Response) => {
  try {
    const result = await UserServices.getAllUserFromDb();
    res.status(200).json(successMessage('User fetched successfully!', result));

    // eslint-disable-next-line
  } catch (error: any) {
    res.status(404).json(errorMessage(error));
  }
};

// get-route-"/api/users/:userId"
const getSingleUser = async (req: Request, res: Response) => {
  try {
    const id = req.params?.userId;
    const result = await UserServices.getSingleUserFromDb(parseFloat(id));

    if (result) {
      res
        .status(200)
        .json(successMessage('User fetched successfully!', result));
    }

    // eslint-disable-next-line
  } catch (error: any) {
    res.status(404).json(errorMessage(error));
  }
};

// put-route-"/api/users/:userId"
const updateUser = async (req: Request, res: Response) => {
  try {
    const id = req.params?.userId;
    const userData = req.body;

    const parsedUserData = userValidationSchema.parse(userData);
    const result = await UserServices.updateUserIntoDb(
      parseFloat(id),
      parsedUserData,
    );
    if (result?.userData)
      res
        .status(200)
        .json(successMessage('User updated successfully!', result.userInfo));

    // eslint-disable-next-line
  } catch (error: any) {
    res.status(404).json(errorMessage(error));
  }
};

// delete-route-"/api/users/:userId"
const deleteUser = async (req: Request, res: Response) => {
  try {
    const id = req.params?.userId;
    const result = await UserServices.deleteUserFromDb(parseFloat(id));

    if (result.deletedCount === 1) {
      res.status(200).json(successMessage('User deleted successfully!', null));
    }

    // eslint-disable-next-line
  } catch (error: any) {
    res.status(404).json(errorMessage(error));
  }
};

// put-route-"/api/users/:userId/orders"
const addNewProduct = async (req: Request, res: Response) => {
  try {
    const id = req.params?.userId;
    const product = req.body;
    const parsedOrderData = orderValidationSchema.parse(product);
    const result = await UserServices.addNewProductIntoOrder(
      parseFloat(id),
      parsedOrderData,
    );

    if (result.acknowledged === true) {
      res.status(200).json(successMessage('Order created successfully!', null));
    }

    // eslint-disable-next-line
  } catch (error: any) {
    res.status(404).json(errorMessage(error));
  }
};

// get-route-"/api/users/:userId/orders"
const getUserOrders = async (req: Request, res: Response) => {
  try {
    const id = req.params?.userId;
    const result = await UserServices.getUserOrdersFromDb(parseFloat(id));

    res
      .status(200)
      .json(successMessage('Orders fetched successfully!', result));

    // eslint-disable-next-line
  } catch (error: any) {
    res.status(404).json(errorMessage(error));
  }
};

// get-route-"/api/users/:userId/orders/total-price"
const getUserOrdersTotal = async (req: Request, res: Response) => {
  try {
    const id = req.params?.userId;
    const result = await UserServices.getUserOrderTotalAmount(parseFloat(id));
    res
      .status(200)
      .json(successMessage('Total price calculated successfully!', result));

    // eslint-disable-next-line
  } catch (error: any) {
    res.status(404).json(errorMessage(error));
  }
};

// Response Success Message
// eslint-disable-next-line
const successMessage = (message: string, data: any) => {
  return {
    success: true,
    message: message,
    data: data,
  };
};

// Response Error Message
// eslint-disable-next-line
const errorMessage = (error: any) => {
  return {
    success: false,
    message:
      error.message.includes('duplicate key error') ||
      error.message.includes('not found')
        ? error.message
        : JSON.parse(error?.message)[0]?.message,
    error: {
      code: 404,
      description:
        error.message.includes('duplicate key error') ||
        error.message.includes('User not found')
          ? error.message
          : JSON.parse(error?.message)[0]?.message,
    },
  };
};

export const UserController = {
  createUser,
  getAllUser,
  getSingleUser,
  updateUser,
  deleteUser,
  addNewProduct,
  getUserOrders,
  getUserOrdersTotal,
};
