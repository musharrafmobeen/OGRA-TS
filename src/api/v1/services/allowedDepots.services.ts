import {
  createAllowedDepotRepository,
  getAllowedDepotsRepository,
  updateAllowedDepotRepository,
  deleteAllowedDepotRepository,
} from "../repositories/allowedDepots.repository";
import mongoose from "mongoose";

const createAllowedDepotService = async (data: any) => {
  try {
    return await createAllowedDepotRepository(data);
  } catch (err: any) {
    try {
      err = JSON.parse(err.message);
    } catch (err) {
      throw new Error(
        '{"status":"Failed", "statusCode":500, "errorMessage":"Error occurred while Creating New Allowed Depot."}'
      );
    }
    throw new Error(
      `{"status":"${err.status}", "statusCode":${err.statusCode}, "errorMessage":"${err.errorMessage}"}`
    );
  }
};

const getAllowedDepotsService = async (
  userRole: string,
  OMC: mongoose.Types.ObjectId
) => {
  try {
    return await getAllowedDepotsRepository(userRole, OMC);
  } catch (err: any) {
    try {
      err = JSON.parse(err.message);
    } catch (err) {
      throw new Error(
        '{"status":"Failed", "statusCode":500, "errorMessage":"Error occurred while Creating New Allowed Depot."}'
      );
    }
    throw new Error(
      `{"status":"${err.status}", "statusCode":${err.statusCode}, "errorMessage":"${err.errorMessage}"}`
    );
  }
};

const updateAllowedDepotService = async (
  _id: mongoose.Types.ObjectId,
  data: any
) => {
  try {
    return await updateAllowedDepotRepository(_id, data);
  } catch (err: any) {
    try {
      err = JSON.parse(err.message);
    } catch (err) {
      throw new Error(
        '{"status":"Failed", "statusCode":500, "errorMessage":"Error occurred while Creating New Allowed Depot."}'
      );
    }
    throw new Error(
      `{"status":"${err.status}", "statusCode":${err.statusCode}, "errorMessage":"${err.errorMessage}"}`
    );
  }
};

const deleteAllowedDepotService = async (_id: mongoose.Types.ObjectId) => {
  try {
    return await deleteAllowedDepotRepository(_id);
  } catch (err: any) {
    try {
      err = JSON.parse(err.message);
    } catch (err) {
      throw new Error(
        '{"status":"Failed", "statusCode":500, "errorMessage":"Error occurred while Creating New Allowed Depot."}'
      );
    }
    throw new Error(
      `{"status":"${err.status}", "statusCode":${err.statusCode}, "errorMessage":"${err.errorMessage}"}`
    );
  }
};

export {
  createAllowedDepotService,
  getAllowedDepotsService,
  updateAllowedDepotService,
  deleteAllowedDepotService,
};
