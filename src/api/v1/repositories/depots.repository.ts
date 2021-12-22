import depotModel from "../models/depots.model";
import mongoose from "mongoose";
import { depots } from "../interfaces/depots";

const addDepotRepository = async (data: depots) => {
  try {
    let { IFEM_Location, depotName, depotIncharge, OMC } = data;
    const storagePoint = await depotModel.findOne({ depotName }).exec();
    if (!storagePoint) {
      if (depotIncharge === "") {
        depotIncharge = null;
      }
      const _id = new mongoose.Types.ObjectId();
      const newDepot = new depotModel({
        _id,
        IFEM_Location,
        depotName,
        depotIncharge,
        isDeleted: false,
        OMC,
      });

      await newDepot.save();
      return await depotModel
        .findOne({ _id })
        .populate("OMC IFEM_Location depotIncharge")
        .exec();
    }

    throw new Error(
      '{"status":"Already Exists", "statusCode":403, "errorMessage":"Depot Already Exists"}'
    );
  } catch (err: any) {
    try {
      err = JSON.parse(err.message);
    } catch (err) {
      throw new Error(
        '{"status":"Failed", "statusCode":500, "errorMessage":"Error occurred while Creating New depot."}'
      );
    }
    throw new Error(
      `{"status":"${err.status}", "statusCode":${err.statusCode}, "errorMessage":"${err.errorMessage}"}`
    );
  }
};

const getDepotsRepository = async (
  OMC: mongoose.Types.ObjectId,
  userRole: string
) => {
  try {
    if (userRole === "OGRA Technical Team") {
      const depots = await depotModel
        .find()
        .populate("IFEM_Location depotIncharge")
        .exec();

      return depots;
    } else {
      const depots = await depotModel
        .find({ OMC })
        .populate("IFEM_Location depotIncharge")
        .exec();

      return depots;
    }
  } catch (error) {
    throw new Error(
      '{"status":"Failed", "statusCode":500, "errorMessage":"Error occurred while getting depots."}'
    );
  }
};

const updateDepotRepository = async (
  _id: mongoose.Types.ObjectId,
  data: depots
) => {
  try {
    if (data.depotIncharge === "") {
      data.depotIncharge = null;
    }
    const depot = await depotModel
      .findOneAndUpdate({ _id }, { $set: { ...data } })
      .exec();
    if (depot) {
      return await depotModel
        .findOne({ _id })
        .populate("IFEM_Location depotIncharge")
        .exec();
    } else {
      throw new Error(
        '{"status":"User Not Found", "statusCode":404, "errorMessage":"No Depot found with the given credentials."}'
      );
    }
  } catch (err: any) {
    try {
      err = JSON.parse(err.message);
    } catch (err) {
      throw new Error(
        '{"status":"Failed", "statusCode":500, "errorMessage":"Error occurred while updating depot."}'
      );
    }
    throw new Error(
      `{"status":"${err.status}", "statusCode":${err.statusCode}, "errorMessage":"${err.errorMessage}"}`
    );
  }
};

const deleteDepotRepository = async (_id: mongoose.Types.ObjectId) => {
  try {
    const depot = await depotModel
      .findOneAndUpdate({ _id }, { $set: { isDeleted: true } })
      .populate("IFEM_Location depotIncharge")
      .exec();
    if (depot) {
      return depot;
    } else {
      throw new Error(
        '{"status":"User Not Found", "statusCode":404, "errorMessage":"No Depot found with the given credentials."}'
      );
    }
  } catch (err: any) {
    try {
      err = JSON.parse(err.message);
    } catch (err) {
      throw new Error(
        '{"status":"Failed", "statusCode":500, "errorMessage":"Error occurred while deleting depot."}'
      );
    }
    throw new Error(
      `{"status":"${err.status}", "statusCode":${err.statusCode}, "errorMessage":"${err.errorMessage}"}`
    );
  }
};

export {
  addDepotRepository,
  getDepotsRepository,
  updateDepotRepository,
  deleteDepotRepository,
};
