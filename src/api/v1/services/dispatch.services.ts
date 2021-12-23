import {
  addDispatchRespository,
  getDispatchesRespository,
  getPersonalDispatchesRespository,
  getReceivingDispatchesRespository,
  updateDispatchRespository,
  deleteDispatchRespository,
} from "../repositories/dispatch.repository";
import mongoose from "mongoose";
import { dispatch } from "../interfaces/dispatch";

const addDispatchService = async (data: dispatch) => {
  try {
    return await addDispatchRespository(data);
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

const getDispatchesService = async (
  id: mongoose.Types.ObjectId,
  userRole: string,
  status: any,
  page: any,
  rows: any
) => {
  try {
    if (
      typeof status === "string" ||
      typeof page === "string" ||
      typeof rows === "string"
    ) {
      const noOfRows = parseInt(rows);
      const skip = (parseInt(page) - 1) * noOfRows;
      return await getDispatchesRespository(
        id,
        userRole,
        status,
        skip,
        noOfRows
      );
    }
    throw new Error(
      '{"status":"Invalid Data", "statusCode":422, "errorMessage":"Invalid Data Types"}'
    );
  } catch (err: any) {
    try {
      err = JSON.parse(err.message);
    } catch (err) {
      throw new Error(
        '{"status":"Failed", "statusCode":500, "errorMessage":"Error occurred while Get New Allowed Depot."}'
      );
    }
    throw new Error(
      `{"status":"${err.status}", "statusCode":${err.statusCode}, "errorMessage":"${err.errorMessage}"}`
    );
  }
};

const getPersonalDispatchesService = async (
  id: mongoose.Types.ObjectId,
  status: any,
  page: any,
  rows: any
) => {
  try {
    if (
      typeof status === "string" &&
      typeof page === "string" &&
      typeof rows === "string"
    ) {
      const noOfRows = parseInt(rows);
      const skip = (parseInt(page) - 1) * noOfRows;
      return await getPersonalDispatchesRespository(id, status, skip, noOfRows);
    }
    throw new Error(
      '{"status":"Invalid Data", "statusCode":422, "errorMessage":"Invalid Data Types"}'
    );
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

const getReceivingDispatchesService = async (
  id: mongoose.Types.ObjectId,
  status: any,
  page: any,
  rows: any
) => {
  try {
    if (
      typeof status === "string" ||
      typeof page === "string" ||
      typeof rows === "string"
    ) {
      const noOfRows = parseInt(rows);
      const skip = (parseInt(page) - 1) * noOfRows;
      return await getReceivingDispatchesRespository(
        id,
        status,
        skip,
        noOfRows
      );
    }
    throw new Error(
      '{"status":"Invalid Data", "statusCode":422, "errorMessage":"Invalid Data Types"}'
    );
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

const updateDispatchService = async (
  _id: mongoose.Types.ObjectId,
  data: any
) => {
  try {
    return await updateDispatchRespository(_id, data);
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

const deleteDispatchService = async (
  _id: mongoose.Types.ObjectId,
  id: mongoose.Types.ObjectId
) => {
  try {
    return await deleteDispatchRespository(_id, id);
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
  addDispatchService,
  getDispatchesService,
  updateDispatchService,
  deleteDispatchService,
  getPersonalDispatchesService,
  getReceivingDispatchesService,
};
