// import { NextFunction, Request, Response } from "express";
// import { createdResponse } from "../helpers/responses";
import {
  createUserRespository,
  getUsersRespository,
  getUsersByTimeStampsRespository,
  userLogInRespository,
  userLoginByTokenAuthRespository,
  updateUserRespository,
  deleteUserRespository,
} from "../repositories/users.repository";
import userModel from "../models/users.model";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { throwError } from "../helpers/errorHandler";
import { userData } from "../interfaces/users";
import { OMC } from "../interfaces/OMC";
import { getSalt, getSecretKey } from "../helpers/environmentVariables";

const createUserService = async (data: userData) => {
  try {
    return await createUserRespository(data);
  } catch (err: any) {
    try {
      err = JSON.parse(err.message);
    } catch (err) {
      throw new Error(
        '{"status":"Failed", "statusCode":500, "errorMessage":"Error occurred while Registering a User."}'
      );
    }
    throw new Error(
      `{"status":"${err.status}", "statusCode":${err.statusCode}, "errorMessage":"${err.errorMessage}"}`
    );
  }
};

const userLogInService = async (data: {
  userName: string;
  password: string;
}) => {
  try {
    return await userLogInRespository(data);
  } catch (err: any) {
    try {
      err = JSON.parse(err.message);
    } catch (err) {
      throw new Error(
        '{"status":"Failed", "statusCode":500, "errorMessage":"Error occurred while Registering a User."}'
      );
    }
    throw new Error(
      `{"status":"${err.status}", "statusCode":${err.statusCode}, "errorMessage":"${err.errorMessage}"}`
    );
  }
};

const getUsersService = async (
  userRole: string,
  OMC: mongoose.Types.ObjectId
) => {
  try {
    return await getUsersRespository(userRole, OMC);
  } catch (err) {
    throw new Error(
      '{"status":"Failed", "statusCode":500, "errorMessage":"Error occurred while Registering a User."}'
    );
  }
};

const getUsersByTimeStampsService = async () => {
  try {
    return await getUsersByTimeStampsRespository();
  } catch (err) {
    throw new Error(
      '{"status":"Failed", "statusCode":500, "errorMessage":"Error occurred while Registering a User."}'
    );
  }
};

const userLoginByTokenAuthService = async (id: mongoose.Types.ObjectId) => {
  try {
    return await userLoginByTokenAuthRespository(id);
  } catch (err: any) {
    try {
      err = JSON.parse(err.message);
    } catch (err) {
      throw new Error(
        '{"status":"Failed", "statusCode":500, "errorMessage":"Error occurred while Registering a User."}'
      );
    }
    throw new Error(
      `{"status":"${err.status}", "statusCode":${err.statusCode}, "errorMessage":"${err.errorMessage}"}`
    );
  }
};

const updateUserService = async (
  _id: mongoose.Types.ObjectId,
  data: Object
) => {
  try {
    return await updateUserRespository(_id, data);
  } catch (err: any) {
    try {
      err = JSON.parse(err.message);
    } catch (err) {
      throw new Error(
        '{"status":"Failed", "statusCode":500, "errorMessage":"Error occurred while Registering a User."}'
      );
    }
    throw new Error(
      `{"status":"${err.status}", "statusCode":${err.statusCode}, "errorMessage":"${err.errorMessage}"}`
    );
  }
};

const deleteUserService = async (_id: mongoose.Types.ObjectId) => {
  try {
    return await deleteUserRespository(_id);
  } catch (err: any) {
    try {
      err = JSON.parse(err.message);
    } catch (err) {
      throw new Error(
        '{"status":"Failed", "statusCode":500, "errorMessage":"Error occurred while Registering a User."}'
      );
    }
    throw new Error(
      `{"status":"${err.status}", "statusCode":${err.statusCode}, "errorMessage":"${err.errorMessage}"}`
    );
  }
};

export {
  createUserService,
  userLoginByTokenAuthService,
  getUsersService,
  getUsersByTimeStampsService,
  userLogInService,
  updateUserService,
  deleteUserService,
};
