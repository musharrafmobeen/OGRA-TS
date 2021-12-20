import {
  addIfemLocationRepository,
  getIfemLocationRepository,
  updateIfemLocationRepository,
  deleteIfemLocationRepository,
} from "../repositories/ifemLocation.repository";
import mongoose from "mongoose";

const addIfemLocationService = async (data: any) => {
  try {
    return addIfemLocationRepository(data);
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

const getIfemLocationService = async () => {
  try {
    return await getIfemLocationRepository();
  } catch (error) {
    throw new Error(
      '{"status":"Failed", "statusCode":500, "errorMessage":"Error occurred while Registering a User."}'
    );
  }
};

const updateIfemLocationService = async (
  _id: mongoose.Types.ObjectId,
  data: any
) => {
  try {
    return updateIfemLocationRepository(_id, data);
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

const deleteIfemLocationService = async (_id: mongoose.Types.ObjectId) => {
  try {
    return deleteIfemLocationRepository(_id);
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
  addIfemLocationService,
  getIfemLocationService,
  updateIfemLocationService,
  deleteIfemLocationService,
};
