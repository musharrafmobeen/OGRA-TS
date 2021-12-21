import { RequestHandler } from "express";
import {
  createUserService,
  userLogInService,
  getUsersService,
  getUsersByTimeStampsService,
  userLoginByTokenAuthService,
  updateUserService,
  deleteUserService,
} from "../services/users.services";
import mongoose from "mongoose";

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

const getUsers: RequestHandler = async (req, res, next) => {
  try {
    const { userRole, OMC } = req.body;
    const users = await getUsersService(userRole, OMC);
    return res.status(200).json({
      users,
      request: {
        type: "GET",
        description: "Get Users",
        URL: process.env.URL + "users/",
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

const getUsersByTimeStamps: RequestHandler = async (req, res, next) => {
  try {
    let users = await getUsersByTimeStampsService();
    return res.status(200).json({
      users,
      request: {
        type: "GET",
        description: "Get Users",
        URL: process.env.URL + "users/",
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

const userLoginByTokenAuth: RequestHandler = async (req, res, next) => {
  try {
    const { user, token } = await userLoginByTokenAuthService(req.body.id);
    return res.status(200).json({
      user,
      token,
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

const updateUser: RequestHandler = async (req, res, next) => {
  try {
    const data = req.body;
    const _id = new mongoose.Types.ObjectId(req.params._id);
    const user = await updateUserService(_id, data);

    return res.status(200).json({
      user,
      request: {
        type: "PATCH",
        description: "Update User",
        URL: process.env.URL + "users/:id",
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

const deleteUser: RequestHandler = async (req, res, next) => {
  try {
    const _id = new mongoose.Types.ObjectId(req.params._id);
    const user = await deleteUserService(_id);

    return res.status(200).json({
      user,
      request: {
        type: "DELETE",
        description: "Delete User",
        URL: process.env.URL + "users/:id",
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

export {
  createUser,
  userLogin,
  deleteUser,
  getUsersByTimeStamps,
  getUsers,
  userLoginByTokenAuth,
  updateUser,
};
