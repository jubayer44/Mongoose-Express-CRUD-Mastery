import { Request, Response } from 'express';
import { studentServices } from './user.service';

const createUser = async (req: Request, res: Response) => {
  try {
    const user = req.body;
    const result = await studentServices.createUserIntoDb(user);
    res.status(201).json({
      success: true,
      message: 'User created successfully',
      data: result,
    });
    // eslint-disable-next-line
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Internal server error',
    });
  }
};

export const studentController = { createUser };
