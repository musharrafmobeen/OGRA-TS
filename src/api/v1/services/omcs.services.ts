import {
  createOMCRespository,
  getOMCsRespository,
  getAvailableDepotsRespository,
  updateOMCRespository,
  deleteOMCRespository,
} from "../repositories/omcs.repository";
import mongoose from "mongoose";
import { OMC } from "../interfaces/OMC";

const createOMCService = async (data: OMC) => {
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

const getOMCsService = async (page: any, rows: any) => {
  try {
    if (typeof page === "string" && typeof rows === "string") {
      const noOfRows = parseInt(rows);
      const skip = (parseInt(page) - 1) * noOfRows;
      return await getOMCsRespository(skip, noOfRows);
    }
    throw new Error(
      '{"status":"Invalid Data", "statusCode":422, "errorMessage":"Invalid Data Types"}'
    );
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

const updateOMCService = async (_id: mongoose.Types.ObjectId, data: OMC) => {
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
