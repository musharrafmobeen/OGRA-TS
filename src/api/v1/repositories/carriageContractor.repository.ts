import carriageContractorModel from "../models/carriageContractor.model";
import mongoose from "mongoose";

const createCarriageContractorRepository = async (data: any) => {
  try {
    const { name } = data;
    const _id = new mongoose.Types.ObjectId();
    const newCarriageContractor = new carriageContractorModel({
      _id,
      name,
    });
    await newCarriageContractor.save();

    return newCarriageContractor;
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

const getCarriageContractorsRepository = async () => {
  try {
    const carriageContractors = await carriageContractorModel.find().exec();

    return carriageContractors;
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

const updateCarriageContractorRepository = async (
  _id: mongoose.Types.ObjectId,
  data: any
) => {
  try {
    const carriageContractor = await carriageContractorModel
      .findOneAndUpdate({ _id }, { $set: { ...data } })
      .exec();
    if (carriageContractor) {
      return carriageContractor;
    } else {
      throw new Error(
        '{"status":"User Not Found", "statusCode":404, "errorMessage":"No Carriage Contractor found with the given credentials."}'
      );
    }
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

const deleteCarriageContractorRepository = async (
  _id: mongoose.Types.ObjectId
) => {
  try {
    const carriageContractor = await carriageContractorModel
      .findOneAndDelete({ _id })
      .exec();
    if (carriageContractor) {
      return carriageContractor;
    } else {
      throw new Error(
        '{"status":"User Not Found", "statusCode":404, "errorMessage":"No Carriage Contractor found with the given credentials."}'
      );
    }
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
  createCarriageContractorRepository,
  getCarriageContractorsRepository,
  updateCarriageContractorRepository,
  deleteCarriageContractorRepository,
};
