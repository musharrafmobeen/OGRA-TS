import cityModel from "../models/cities.model";
import mongoose from "mongoose";
import { cities } from "../interfaces/cities";

const createCityRepository = async (data: cities) => {
  try {
    const { cityName, district } = data;
    const city = await cityModel.findOne({ cityName }).exec();

    if (!city) {
      const _id = new mongoose.Types.ObjectId();
      const newCity = new cityModel({
        _id,
        cityName,
        district,
      });

      await newCity.save();

      return await cityModel.findOne({ _id }).populate("district").exec();
    }

    throw new Error(
      '{"status":"Already Exists", "statusCode":403, "errorMessage":"City Already Exists"}'
    );
  } catch (err: any) {
    try {
      err = JSON.parse(err.message);
    } catch (err) {
      throw new Error(
        '{"status":"Failed", "statusCode":500, "errorMessage":"Error occurred while Creating A New City."}'
      );
    }
    throw new Error(
      `{"status":"${err.status}", "statusCode":${err.statusCode}, "errorMessage":"${err.errorMessage}"}`
    );
  }
};

const getCitiesRepository = async () => {
  try {
    const cities = await cityModel.find().populate("district").exec();

    return cities;
  } catch (error) {
    throw new Error(
      '{"status":"Failed", "statusCode":500, "errorMessage":"Error occurred while getting All Cities."}'
    );
  }
};

const updateCityRepository = async (
  _id: mongoose.Types.ObjectId,
  data: cities
) => {
  try {
    const city = await cityModel
      .findOneAndUpdate({ _id }, { $set: { ...data } })
      .exec();
    if (city) {
      return await cityModel.findOne({ _id }).populate("district").exec();
    } else {
      throw new Error(
        '{"status":"User Not Found", "statusCode":404, "errorMessage":"No City found with the given credentials."}'
      );
    }
  } catch (err: any) {
    try {
      err = JSON.parse(err.message);
    } catch (err) {
      throw new Error(
        '{"status":"Failed", "statusCode":500, "errorMessage":"Error occurred while updating city."}'
      );
    }
    throw new Error(
      `{"status":"${err.status}", "statusCode":${err.statusCode}, "errorMessage":"${err.errorMessage}"}`
    );
  }
};

const deleteCityRepository = async (_id: mongoose.Types.ObjectId) => {
  try {
    const city = await cityModel
      .findOneAndDelete({ _id })
      .populate("district")
      .exec();
    if (city) {
      return city;
    } else {
      throw new Error(
        '{"status":"Failed", "statusCode":500, "errorMessage":"Error occurred while Creating New Allowed Depot."}'
      );
    }
  } catch (err: any) {
    try {
      err = JSON.parse(err.message);
    } catch (err) {
      throw new Error(
        '{"status":"Failed", "statusCode":500, "errorMessage":"Error occurred while deleting city."}'
      );
    }
    throw new Error(
      `{"status":"${err.status}", "statusCode":${err.statusCode}, "errorMessage":"${err.errorMessage}"}`
    );
  }
};

export {
  createCityRepository,
  getCitiesRepository,
  updateCityRepository,
  deleteCityRepository,
};
