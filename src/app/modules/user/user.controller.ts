import { Request, Response } from 'express';
import { studentServices } from './user.service';
import userValidationSchema from './user.validation';

const createUser = async (req: Request, res: Response) => {
  try {
    const userData = req.body;

    const parsedUserData = userValidationSchema.parse(userData);

    const result = await studentServices.createUserIntoDb(parsedUserData);
    res.status(201).json({
      success: true,
      message: 'User created successfully!',
      data: result,
    });
    // eslint-disable-next-line
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: 'Something went wrong!',
      error: error.message,
    });
  }
};

const getAllUser = async (req: Request, res: Response) => {
  try {
    const result = await studentServices.getAllUserFromDb();
    res.status(200).json({
      success: true,
      message: 'User fetched successfully!',
      data: result,
    });

    // eslint-disable-next-line
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: 'Something went wrong!',
      error: error.message,
    });
  }
};

const getSingleUser = async (req: Request, res: Response) => {
  try {
    const id = req.params?.userId;

    const result = await studentServices.getSingleUserFromDb(parseFloat(id));

    if (result) {
      res.status(200).json({
        success: true,
        message: 'User fetched successfully!',
        data: result,
      });
    } else {
      res.status(404).json({
        success: false,
        message: 'User not found',
        error: {
          code: 404,
          description: 'User not found!',
        },
      });
    }

    // eslint-disable-next-line
  } catch (error: any) {
    res.status(404).json({
      success: false,
      message: 'Something went wrong!',
      error: error.message,
    });
  }
};

export const studentController = { createUser, getAllUser, getSingleUser };
