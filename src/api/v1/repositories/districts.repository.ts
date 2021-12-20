import districtModel from "../models/districts.model";
import mongoose from "mongoose";

const createDistrictRepository = async (data: any) => {
  try {
    const { province, districtName } = data;
    const district = await districtModel
      .findOne({ province, districtName })
      .exec();
    if (!district) {
      const newDistrict = new districtModel({
        _id: new mongoose.Types.ObjectId(),
        province,
        districtName,
      });

      await newDistrict.save();
      return newDistrict;
    }

    throw new Error(
      '{"status":"Already Exists", "statusCode":403, "errorMessage":"District Already Exists"}'
    );
  } catch (err: any) {
    try {
      err = JSON.parse(err.message);
    } catch (err) {
      throw new Error(
        '{"status":"Failed", "statusCode":500, "errorMessage":"Error occurred while Creating New District."}'
      );
    }
    throw new Error(
      `{"status":"${err.status}", "statusCode":${err.statusCode}, "errorMessage":"${err.errorMessage}"}`
    );
  }
};

const getDistrictsRepository = async () => {
  try {
    const districts = await districtModel.find().exec();
    return districts;
  } catch (error) {
    throw new Error(
      '{"status":"Failed", "statusCode":500, "errorMessage":"Error occurred while getting districts."}'
    );
  }
};

const updateDistrictRepository = async (
  _id: mongoose.Types.ObjectId,
  data: any
) => {
  try {
    const district = await districtModel
      .findOneAndUpdate({ _id }, { $set: { ...data } })
      .exec();
    if (district) {
      return { ...district._doc, ...data };
    } else {
      throw new Error(
        '{"status":"User Not Found", "statusCode":404, "errorMessage":"No District found with the given credentials."}'
      );
    }
  } catch (err: any) {
    try {
      err = JSON.parse(err.message);
    } catch (err) {
      throw new Error(
        '{"status":"Failed", "statusCode":500, "errorMessage":"Error occurred while updating district."}'
      );
    }
    throw new Error(
      `{"status":"${err.status}", "statusCode":${err.statusCode}, "errorMessage":"${err.errorMessage}"}`
    );
  }
};

const deleteDistrictRepository = async (_id: mongoose.Types.ObjectId) => {
  try {
    const district = await districtModel.findOneAndDelete({ _id }).exec();
    if (district) {
      return district;
    } else {
      throw new Error(
        '{"status":"User Not Found", "statusCode":404, "errorMessage":"No District found with the given credentials."}'
      );
    }
  } catch (err: any) {
    try {
      err = JSON.parse(err.message);
    } catch (err) {
      throw new Error(
        '{"status":"Failed", "statusCode":500, "errorMessage":"Error occurred while deleting district."}'
      );
    }
    throw new Error(
      `{"status":"${err.status}", "statusCode":${err.statusCode}, "errorMessage":"${err.errorMessage}"}`
    );
  }
};

export {
  createDistrictRepository,
  getDistrictsRepository,
  updateDistrictRepository,
  deleteDistrictRepository,
};
