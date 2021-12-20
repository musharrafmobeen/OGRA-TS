import {
  createOMCRespository,
  getOMCsRespository,
  getAvailableDepotsRespository,
  updateOMCRespository,
  deleteOMCRespository,
} from "../repositories/omcs.repository";
import mongoose from "mongoose";

const createOMCService = async (data: any) => {
  try {
    return await createOMCRespository(data);
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

const getOMCsService = async () => {
  try {
    return await getOMCsRespository();
  } catch (error) {
    throw new Error(
      '{"status":"Failed", "statusCode":500, "errorMessage":"Error occurred while Creating New Allowed Depot."}'
    );
  }
};

const getAvailableDepotsService = async (OMC: mongoose.Types.ObjectId) => {
  try {
    return await getAvailableDepotsRespository(OMC);
  } catch (error) {
    throw new Error(
      '{"status":"Failed", "statusCode":500, "errorMessage":"Error occurred while Creating New Allowed Depot."}'
    );
  }
};

const updateOMCService = async (_id: mongoose.Types.ObjectId, data: any) => {
  try {
    return await updateOMCRespository(_id, data);
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

const deleteOMCService = async (_id: mongoose.Types.ObjectId) => {
  try {
    return await deleteOMCRespository(_id);
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
  createOMCService,
  getOMCsService,
  getAvailableDepotsService,
  updateOMCService,
  deleteOMCService,
};
