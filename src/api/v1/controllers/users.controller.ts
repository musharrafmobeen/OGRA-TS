import { RequestHandler } from "express";
import { addUserValidation, userLoginValidation } from "../validations/users";
import {
  createUserService,
  userLogInService,
  getUsersService,
  getUsersByTimeStampsService,
  userLoginByTokenAuthService,
  updateUserService,
  deleteUserService,
} from "../services/users.services";

const createUser: RequestHandler = async (req, res, next) => {
  try {
    const createdUser = await createUserService(req.body);
    return res.status(201).json({
      message: "User Registered",
      user: createdUser,
      request: {
        type: "POST",
        description: "Register User",
        URL: process.env.URL + "users/signup",
      },
    });
  } catch (err: any) {
    err = JSON.parse(err.message);
    return res.status(err.statusCode).json({
      error: {
        status: err.status,
        statusCode: err.statusCode,
        errorMessage: err.errorMessage,
      },
      message: err.errorMessage,
    });
  }
};

const userLogin: RequestHandler = async (req, res, next) => {
  try {
    const user: any = await userLogInService(req.body);
    return res.status(200).json({
      user: user.user,
      token: user.token,
      request: {
        type: "POST",
        description: "Logging in",
        URL: process.env.URL + "users/login",
      },
    });
  } catch (err: any) {
    err = JSON.parse(err.message);

    return res.status(err.statusCode).json({
      error: {
        status: err.status,
        statusCode: err.statusCode,
        errorMessage: err.errorMessage,
      },
      message: err.errorMessage,
    });
  }
};

export { createUser, userLogin };
