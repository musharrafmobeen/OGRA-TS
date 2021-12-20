import {
  createCarriageContractorRepository,
  getCarriageContractorsRepository,
  updateCarriageContractorRepository,
  deleteCarriageContractorRepository,
} from "../repositories/carriageContractor.repository";
import mongoose from "mongoose";

const createCarriageContractorService = async (data: any) => {
  try {
    return await createCarriageContractorRepository(data);
  } catch (err: any) {
    try {
      err = JSON.parse(err.message);
    } catch (err) {
      throw new Error(
        '{"status":"Failed", "statusCode":500, "errorMessage":"Error occurred while Creating New Carriage Contractor."}'
      );
    }
    throw new Error(
      `{"status":"${err.status}", "statusCode":${err.statusCode}, "errorMessage":"${err.errorMessage}"}`
    );
  }
};

const getCarriageContractorsService = async () => {
  try {
    return await getCarriageContractorsRepository();
  } catch (err: any) {
    try {
      err = JSON.parse(err.message);
    } catch (err) {
      throw new Error(
        '{"status":"Failed", "statusCode":500, "errorMessage":"Error occurred while getting Carriage Contractors."}'
      );
    }
    throw new Error(
      `{"status":"${err.status}", "statusCode":${err.statusCode}, "errorMessage":"${err.errorMessage}"}`
    );
  }
};

const updateCarriageContractorService = async (
  _id: mongoose.Types.ObjectId,
  data: any
) => {
  try {
    return await updateCarriageContractorRepository(_id, data);
  } catch (err: any) {
    try {
      err = JSON.parse(err.message);
    } catch (err) {
      throw new Error(
        '{"status":"Failed", "statusCode":500, "errorMessage":"Error occurred while updating Carriage Contractor."}'
      );
    }
    throw new Error(
      `{"status":"${err.status}", "statusCode":${err.statusCode}, "errorMessage":"${err.errorMessage}"}`
    );
  }
};

const deleteCarriageContractorService = async (
  _id: mongoose.Types.ObjectId
) => {
  try {
    return await deleteCarriageContractorRepository(_id);
  } catch (err: any) {
    try {
      err = JSON.parse(err.message);
    } catch (err) {
      throw new Error(
        '{"status":"Failed", "statusCode":500, "errorMessage":"Error occurred while deleting Carriage Contractor."}'
      );
    }
    throw new Error(
      `{"status":"${err.status}", "statusCode":${err.statusCode}, "errorMessage":"${err.errorMessage}"}`
    );
  }
};

export {
  createCarriageContractorService,
  getCarriageContractorsService,
  updateCarriageContractorService,
  deleteCarriageContractorService,
};
