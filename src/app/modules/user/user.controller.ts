import { Request, Response } from 'express';
import { UserServices } from './user.service';
import userValidationSchema, { orderValidationSchema } from './user.validation';

// post-route-"/api/users"
const createUser = async (req: Request, res: Response) => {
  try {
    const userData = req.body;

    const parsedUserData = userValidationSchema.parse(userData);

    const result = await UserServices.createUserIntoDb(parsedUserData);
    res.status(201).json({
      success: true,
      message: 'User created successfully!',
      data: result,
    });
    // eslint-disable-next-line
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
      error: {
        code: 500,
        description: error.message,
      },
    });
  }
};

// get-route-"/api/users"
const getAllUser = async (req: Request, res: Response) => {
  try {
    const result = await UserServices.getAllUserFromDb();
    res.status(200).json({
      success: true,
      message: 'User fetched successfully!',
      data: result,
    });

    // eslint-disable-next-line
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
      error: {
        code: 500,
        description: error.message,
      },
    });
  }
};

// get-route-"/api/users/:userId"
const getSingleUser = async (req: Request, res: Response) => {
  try {
    const id = req.params?.userId;
    const result = await UserServices.getSingleUserFromDb(parseFloat(id));

    if (result) {
      res.status(200).json({
        success: true,
        message: 'User fetched successfully!',
        data: result,
      });
    }

    // eslint-disable-next-line
  } catch (error: any) {
    res.status(404).json({
      success: false,
      message: error.message,
      error: {
        code: 404,
        description: error.message,
      },
    });
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
      res.status(200).json({
        success: true,
        message: 'User updated successfully!',
        data: result.userInfo,
      });

    // eslint-disable-next-line
  } catch (error: any) {
    res.status(404).json({
      success: false,
      message: error.message,
      error: {
        code: 404,
        description: error.message,
      },
    });
  }
};

// delete-route-"/api/users/:userId"
const deleteUser = async (req: Request, res: Response) => {
  try {
    const id = req.params?.userId;
    const result = await UserServices.deleteUserFromDb(parseFloat(id));

    if (result.deletedCount === 1) {
      res.status(200).json({
        success: true,
        message: 'User deleted successfully!',
        data: null,
      });
    }

    // eslint-disable-next-line
  } catch (error: any) {
    res.status(404).json({
      success: false,
      message: error.message,
      error: {
        code: 404,
        description: error.message,
      },
    });
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
      res.status(200).json({
        success: true,
        message: 'Order created successfully!',
        data: null,
      });
    }

    // eslint-disable-next-line
  } catch (error: any) {
    res.status(404).json({
      success: false,
      message: error.message,
      error: {
        code: 404,
        description: error.message,
      },
    });
  }
};

// get-route-"/api/users/:userId/orders"
const getUserOrders = async (req: Request, res: Response) => {
  try {
    const id = req.params?.userId;
    const result = await UserServices.getUserOrdersFromDb(parseFloat(id));

    res.status(200).json({
      success: true,
      message: 'User fetched successfully!',
      data: result,
    });

    // eslint-disable-next-line
  } catch (error: any) {
    res.status(404).json({
      success: false,
      message: error.message,
      error: {
        code: 404,
        description: error.message,
      },
    });
  }
};

// get-route-"/api/users/:userId/orders/total-price"
const getUserOrdersTotal = async (req: Request, res: Response) => {
  try {
    const id = req.params?.userId;
    const result = await UserServices.getUserOrderTotalAmount(parseFloat(id));
    res.status(200).json({
      success: true,
      message: 'Total price calculated successfully!',
      data: result,
    });

    // eslint-disable-next-line
  } catch (error: any) {
    res.status(404).json({
      success: false,
      message: error.message,
      error: {
        code: 404,
        description: error.message,
      },
    });
  }
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
