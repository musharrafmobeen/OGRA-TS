import ifemModel from "../models/ifemLocation.model";
import mongoose from "mongoose";
import { ifemLocation } from "../interfaces/ifemLocation";

const addIfemLocationRepository = async (data: ifemLocation) => {
  try {
    const { ifemCode, district, ifemLocationName } = data;
    const IFEM_Location = await ifemModel
      .findOne({ ifemCode, district })
      .exec();
    if (!IFEM_Location) {
      const _id = new mongoose.Types.ObjectId();
      const newIFEMLocation = new ifemModel({
        _id,
        ifemCode,
        ifemLocationName,
        district,
        isDeleted: false,
      });

      await newIFEMLocation.save();
      return await ifemModel.findOne({ _id }).populate("district").exec();
    }

    throw new Error(
      '{"status":"Already Exists", "statusCode":403, "errorMessage":"Ifem Location Already Exists"}'
    );
  } catch (err: any) {
    try {
      err = JSON.parse(err.message);
    } catch (err) {
      throw new Error(
        '{"status":"Failed", "statusCode":500, "errorMessage":"Error occurred while Registering new ifem location."}'
      );
    }
    throw new Error(
      `{"status":"${err.status}", "statusCode":${err.statusCode}, "errorMessage":"${err.errorMessage}"}`
    );
  }
};

const getIfemLocationRepository = async () => {
  try {
    const IFEM_Locations = await ifemModel.find().populate("district").exec();
    return IFEM_Locations;
  } catch (error) {
    throw new Error(
      '{"status":"Failed", "statusCode":500, "errorMessage":"Error occurred while getting  ifem locations."}'
    );
  }
};

const updateIfemLocationRepository = async (
  _id: mongoose.Types.ObjectId,
  data: ifemLocation
) => {
  try {
    const IFEM_Location = await ifemModel
      .findOneAndUpdate({ _id }, { $set: { ...data } })
      .exec();
    if (IFEM_Location) {
      return await ifemModel.findOne({ _id }).populate("district").exec();
    } else {
      throw new Error(
        '{"status":"User Not Found", "statusCode":404, "errorMessage":"No Ifem Location found with the given credentials."}'
      );
    }
  } catch (err: any) {
    try {
      err = JSON.parse(err.message);
    } catch (err) {
      throw new Error(
        '{"status":"Failed", "statusCode":500, "errorMessage":"Error occurred while updating ifem location."}'
      );
    }
    throw new Error(
      `{"status":"${err.status}", "statusCode":${err.statusCode}, "errorMessage":"${err.errorMessage}"}`
    );
  }
};

const deleteIfemLocationRepository = async (_id: mongoose.Types.ObjectId) => {
  try {
    const IFEM_Location = await ifemModel
      .findOneAndUpdate({ _id }, { $set: { isDeleted: true } })
      .populate("district")
      .exec();
    if (IFEM_Location) {
      return IFEM_Location;
    } else {
      throw new Error(
        '{"status":"User Not Found", "statusCode":404, "errorMessage":"No Ifem Location found with the given credentials."}'
      );
    }
  } catch (err: any) {
    try {
      err = JSON.parse(err.message);
    } catch (err) {
      throw new Error(
        '{"status":"Failed", "statusCode":500, "errorMessage":"Error occurred while deleting ifem location."}'
      );
    }
    throw new Error(
      `{"status":"${err.status}", "statusCode":${err.statusCode}, "errorMessage":"${err.errorMessage}"}`
    );
  }
};

export {
  addIfemLocationRepository,
  getIfemLocationRepository,
  updateIfemLocationRepository,
  deleteIfemLocationRepository,
};
