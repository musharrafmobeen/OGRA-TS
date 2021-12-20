import driversModel from "../models/drivers.model";
import mongoose from "mongoose";

const addDriverRepository = async (data: any) => {
  try {
    let {
      currentlyAssignedJob,
      name,
      cnic,
      contact,
      licenseNo,
      expiryDate,
      province,
      OMC,
    } = data;
    if (currentlyAssignedJob === "") {
      currentlyAssignedJob = null;
    }
    const driver = await driversModel.findOne({ cnic }).exec();
    if (!driver) {
      const _id = new mongoose.Types.ObjectId();
      const newDriver = new driversModel({
        _id,
        currentlyAssignedJob,
        name,
        cnic,
        contact,
        licenseNo,
        expiryDate,
        province,
        isDeleted: false,
        OMC,
      });

      await newDriver.save();
      return await driversModel
        .findOne({ _id })
        .populate("currentlyAssignedJob")
        .exec();
    }

    throw new Error(
      '{"status":"Already Exists", "statusCode":403, "errorMessage":"Driver Already Exists"}'
    );
  } catch (err: any) {
    try {
      err = JSON.parse(err.message);
    } catch (err) {
      throw new Error(
        '{"status":"Failed", "statusCode":500, "errorMessage":"Error occurred while Creating New driver."}'
      );
    }
    throw new Error(
      `{"status":"${err.status}", "statusCode":${err.statusCode}, "errorMessage":"${err.errorMessage}"}`
    );
  }
};

const getDriversRepository = async (
  OMC: mongoose.Types.ObjectId,
  userRole: string
) => {
  try {
    if (userRole === "OGRA Technical Team") {
      const drivers = await driversModel
        .find()
        .populate("currentlyAssignedJob")
        .exec();

      return drivers;
    } else {
      const drivers = await driversModel
        .find({ OMC })
        .populate("currentlyAssignedJob")
        .exec();

      return drivers;
    }
  } catch (err: any) {
    try {
      err = JSON.parse(err.message);
    } catch (err) {
      throw new Error(
        '{"status":"Failed", "statusCode":500, "errorMessage":"Error occurred while getting drivers."}'
      );
    }
    throw new Error(
      `{"status":"${err.status}", "statusCode":${err.statusCode}, "errorMessage":"${err.errorMessage}"}`
    );
  }
};

const updateDriverRepository = async (
  _id: mongoose.Types.ObjectId,
  data: any
) => {
  try {
    if (data.currentlyAssignedJob === "") {
      data.currentlyAssignedJob = null;
    }
    const driver = await driversModel
      .findOneAndUpdate({ _id }, { $set: { ...data } })
      .exec();
    if (driver) {
      return await driversModel
        .findOne({ _id })
        .populate("currentlyAssignedJob")
        .exec();
    } else {
      throw new Error(
        '{"status":"User Not Found", "statusCode":404, "errorMessage":"No Driver found with the given credentials."}'
      );
    }
  } catch (err: any) {
    try {
      err = JSON.parse(err.message);
    } catch (err) {
      throw new Error(
        '{"status":"Failed", "statusCode":500, "errorMessage":"Error occurred while updating driver."}'
      );
    }
    throw new Error(
      `{"status":"${err.status}", "statusCode":${err.statusCode}, "errorMessage":"${err.errorMessage}"}`
    );
  }
};

const deleteDriverRepository = async (_id: mongoose.Types.ObjectId) => {
  try {
    const driver = await driversModel
      .findOneAndUpdate({ _id }, { $set: { isDeleted: true } })
      .populate("currentlyAssignedJob")
      .exec();
    if (driver) {
      return driver;
    } else {
      throw new Error(
        '{"status":"User Not Found", "statusCode":404, "errorMessage":"No Driver found with the given credentials."}'
      );
    }
  } catch (err: any) {
    try {
      err = JSON.parse(err.message);
    } catch (err) {
      throw new Error(
        '{"status":"Failed", "statusCode":500, "errorMessage":"Error occurred while deleting driver."}'
      );
    }
    throw new Error(
      `{"status":"${err.status}", "statusCode":${err.statusCode}, "errorMessage":"${err.errorMessage}"}`
    );
  }
};

export {
  addDriverRepository,
  getDriversRepository,
  updateDriverRepository,
  deleteDriverRepository,
};
