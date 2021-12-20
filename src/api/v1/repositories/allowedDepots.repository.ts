import allowedDepotModel from "../models/allowedDepots.model";
import mongoose from "mongoose";

const createAllowedDepotRepository = async (data: any) => {
  try {
    const { OMC, product, sourceDepot, destinationDepot, fromDate, toDate } =
      data;
    const allowedDepot = await allowedDepotModel
      .findOne({ OMC, product, toDate })
      .exec();
    if (!allowedDepot) {
      const _id = new mongoose.Types.ObjectId();
      const newAllowedDepot = new allowedDepotModel({
        _id,
        OMC,
        product,
        sourceDepot,
        destinationDepot,
        fromDate,
        toDate,
      });

      await newAllowedDepot.save();

      return await allowedDepotModel
        .findOne({ _id })
        .populate("OMC sourceDepot destinationDepot")
        .exec();
    } else {
      throw new Error(
        '{"status":"Already Exists", "statusCode":403, "errorMessage":"Allowed Depot Have Already Been Registered"}'
      );
    }
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

const getAllowedDepotsRepository = async (
  userRole: string,
  OMC: mongoose.Types.ObjectId
) => {
  try {
    if (userRole === "OGRA Technical Team") {
      const allowedDepots = await allowedDepotModel
        .find()
        .populate("OMC sourceDepot destinationDepot")
        .exec();

      return allowedDepots;
    } else {
      const allowedDepots = await allowedDepotModel
        .find({ OMC })
        .populate("OMC sourceDepot destinationDepot")
        .exec();

      return allowedDepots;
    }
  } catch (err: any) {
    try {
      err = JSON.parse(err.message);
    } catch (err) {
      throw new Error(
        '{"status":"Failed", "statusCode":500, "errorMessage":"Error occurred while getting Allowed Depots."}'
      );
    }
    throw new Error(
      `{"status":"${err.status}", "statusCode":${err.statusCode}, "errorMessage":"${err.errorMessage}"}`
    );
  }
};

const updateAllowedDepotRepository = async (
  _id: mongoose.Types.ObjectId,
  data: any
) => {
  try {
    const allowedDepot = await allowedDepotModel
      .findOneAndUpdate({ _id }, { $set: { ...data } })
      .populate("OMC sourceDepot destinationDepot")
      .exec();
    if (allowedDepot) {
      return await allowedDepotModel
        .findOneAndUpdate({ _id }, { $set: { ...data } })
        .populate("OMC sourceDepot destinationDepot")
        .exec();
    } else {
      throw new Error(
        '{"status":"User Not Found", "statusCode":404, "errorMessage":"No Allowed Depot found with the given credentials."}'
      );
    }
  } catch (err: any) {
    try {
      err = JSON.parse(err.message);
    } catch (err) {
      throw new Error(
        '{"status":"Failed", "statusCode":500, "errorMessage":"Error occurred while updating Allowed Depot."}'
      );
    }
    throw new Error(
      `{"status":"${err.status}", "statusCode":${err.statusCode}, "errorMessage":"${err.errorMessage}"}`
    );
  }
};

const deleteAllowedDepotRepository = async (_id: mongoose.Types.ObjectId) => {
  try {
    const allowedDepot = await allowedDepotModel
      .findOneAndDelete({ _id })
      .populate("OMC sourceDepot destinationDepot")
      .exec();
    if (allowedDepot) {
      return allowedDepot;
    } else {
      throw new Error(
        '{"status":"User Not Found", "statusCode":404, "errorMessage":"No Allowed Depot found with the given credentials."}'
      );
    }
  } catch (err: any) {
    try {
      err = JSON.parse(err.message);
    } catch (err) {
      throw new Error(
        '{"status":"Failed", "statusCode":500, "errorMessage":"Error occurred while deleting Allowed Depot."}'
      );
    }
    throw new Error(
      `{"status":"${err.status}", "statusCode":${err.statusCode}, "errorMessage":"${err.errorMessage}"}`
    );
  }
};

export {
  createAllowedDepotRepository,
  getAllowedDepotsRepository,
  updateAllowedDepotRepository,
  deleteAllowedDepotRepository,
};
