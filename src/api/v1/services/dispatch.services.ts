import {
  addDispatchRespository,
  getDispatchesRespository,
  getPersonalDispatchesRespository,
  getReceivingDispatchesRespository,
  updateDispatchRespository,
  deleteDispatchRespository,
} from "../repositories/dispatch.repository";
import mongoose from "mongoose";

const addDispatchService = async (data: any) => {
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
  userRole: string
) => {
  try {
    return await getDispatchesRespository(id, userRole);
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

const getPersonalDispatchesService = async (id: mongoose.Types.ObjectId) => {
  try {
    return await getPersonalDispatchesRespository(id);
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

const getReceivingDispatchesService = async (id: mongoose.Types.ObjectId) => {
  try {
    return await getReceivingDispatchesRespository(id);
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
