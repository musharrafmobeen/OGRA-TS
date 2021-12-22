import {
  createDistrictRepository,
  getDistrictsRepository,
  updateDistrictRepository,
  deleteDistrictRepository,
} from "../repositories/districts.repository";
import mongoose from "mongoose";
import { districts } from "../interfaces/districts";

const createDistrictService = async (data: districts) => {
  try {
    return await createDistrictRepository(data);
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

const getDistrictsService = async () => {
  try {
    return await getDistrictsRepository();
  } catch (error) {
    throw new Error(
      '{"status":"Failed", "statusCode":500, "errorMessage":"Error occurred while Creating New Allowed Depot."}'
    );
  }
};

const updateDistrictService = async (
  _id: mongoose.Types.ObjectId,
  data: districts
) => {
  try {
    return await updateDistrictRepository(_id, data);
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

const deleteDistrictService = async (_id: mongoose.Types.ObjectId) => {
  try {
    return await deleteDistrictRepository(_id);
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
  createDistrictService,
  getDistrictsService,
  updateDistrictService,
  deleteDistrictService,
};
