import {
  addDepotRepository,
  getDepotsRepository,
  updateDepotRepository,
  deleteDepotRepository,
} from "../repositories/depots.repository";
import mongoose from "mongoose";

const addDepotService = async (data: any) => {
  try {
    return await addDepotRepository(data);
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

const getDepotsService = async (
  OMC: mongoose.Types.ObjectId,
  userRole: string
) => {
  try {
    return await getDepotsRepository(OMC, userRole);
  } catch (error) {
    throw new Error(
      '{"status":"Failed", "statusCode":500, "errorMessage":"Error occurred while Creating New Allowed Depot."}'
    );
  }
};

const updateDepotService = async (_id: mongoose.Types.ObjectId, data: any) => {
  try {
    return await updateDepotRepository(_id, data);
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

const deleteDepotService = async (_id: mongoose.Types.ObjectId) => {
  try {
    return await deleteDepotRepository(_id);
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
  addDepotService,
  getDepotsService,
  updateDepotService,
  deleteDepotService,
};
