import {
  addVehicleRepository,
  getVehiclesRepository,
  getWorkingVehiclesRepository,
  getDeletedVehiclesRepository,
  updateVehicleRepository,
  updateVehicleOMCHistoryRepository,
  deleteVehicleRepository,
} from "../repositories/vehicles.repository";
import mongoose from "mongoose";

const addVehicleService = async (data: any) => {
  try {
    return await addVehicleRepository(data);
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

const getVehiclesService = async (
  OMC: mongoose.Types.ObjectId,
  userRole: string
) => {
  try {
    return await getVehiclesRepository(OMC, userRole);
  } catch (error) {
    throw new Error(
      '{"status":"Failed", "statusCode":500, "errorMessage":"Error occurred while Registering a User."}'
    );
  }
};

const getWorkingVehiclesService = async () => {
  try {
    return await getWorkingVehiclesRepository();
  } catch (error) {
    throw new Error(
      '{"status":"Failed", "statusCode":500, "errorMessage":"Error occurred while Registering a User."}'
    );
  }
};

const getDeletedVehiclesService = async () => {
  try {
    return await getDeletedVehiclesRepository();
  } catch (error) {
    throw new Error(
      '{"status":"Failed", "statusCode":500, "errorMessage":"Error occurred while Registering a User."}'
    );
  }
};

const updateVehicleService = async (
  _id: mongoose.Types.ObjectId,
  data: any
) => {
  try {
    return await updateVehicleRepository(_id, data);
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

const updateVehicleOMCHistoryService = async (
  _id: mongoose.Types.ObjectId,
  data: any
) => {
  try {
    return await updateVehicleOMCHistoryRepository(_id, data);
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

const deleteVehicleService = async (_id: mongoose.Types.ObjectId) => {
  try {
    return await deleteVehicleRepository(_id);
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
  addVehicleService,
  getVehiclesService,
  getWorkingVehiclesService,
  getDeletedVehiclesService,
  updateVehicleService,
  updateVehicleOMCHistoryService,
  deleteVehicleService,
};
