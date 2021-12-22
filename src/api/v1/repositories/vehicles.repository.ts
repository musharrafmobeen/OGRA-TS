import vehiclesModel from "../models/vehicles.model";
import OMCVehicleHistoryModel from "../models/omcVehicleHistory.model";
import mongoose from "mongoose";
import { vehicle } from "../interfaces/vehicle";

const addVehicleRepository = async (data: vehicle) => {
  try {
    let { associatedDrivers, regNo, compartNo, OMC, currentlyAssignedJob } =
      data;
    if (associatedDrivers === "") {
      associatedDrivers = null;
    }
    if (currentlyAssignedJob === "") {
      currentlyAssignedJob = null;
    }
    if (compartNo.length < 6) {
      let overallCap = 0;
      compartNo.map((comapartment: any) => {
        overallCap += comapartment.capacity;
      });
      const vehicle = await vehiclesModel.findOne({ regNo }).exec();
      if (!vehicle) {
        const _id = new mongoose.Types.ObjectId();
        const newVehicle = new vehiclesModel({
          _id,
          associatedDrivers,
          regNo,
          compartNo,
          overallCap,
          OMC,
          isDeleted: false,
          currentlyAssignedJob: null,
        });

        await newVehicle.save();
        return await vehiclesModel
          .findOne({ _id })
          .populate("associatedDrivers currentlyAssignedJob")
          .exec();
      }

      throw new Error(
        '{"status":"Already Exists", "statusCode":403, "errorMessage":"Vehicle Already Exists"}'
      );
    } else {
      throw new Error(
        '{"status":"Too Many Compartments", "statusCode":422, "errorMessage":"Compartments cannot be any more then 6 for a vehicle."}'
      );
    }
  } catch (err: any) {
    try {
      err = JSON.parse(err.message);
    } catch (err) {
      throw new Error(
        '{"status":"Failed", "statusCode":500, "errorMessage":"Error occurred while Registering a vehicle."}'
      );
    }
    throw new Error(
      `{"status":"${err.status}", "statusCode":${err.statusCode}, "errorMessage":"${err.errorMessage}"}`
    );
  }
};

const getVehiclesRepository = async (
  OMC: mongoose.Types.ObjectId,
  userRole: string
) => {
  try {
    if (userRole === "OGRA Technical Team") {
      const vehicles = await vehiclesModel
        .find()
        .populate("associatedDrivers currentlyAssignedJob")
        .exec();

      return vehicles;
    } else {
      const vehicles = await vehiclesModel
        .find({ OMC })
        .populate("associatedDrivers currentlyAssignedJob")
        .exec();

      return vehicles;
    }
  } catch (error) {
    throw new Error(
      '{"status":"Failed", "statusCode":500, "errorMessage":"Error occurred while getting vehicles."}'
    );
  }
};

const getWorkingVehiclesRepository = async () => {
  try {
    const vehicles = await vehiclesModel
      .find({ isDeleted: false })
      .populate("associatedDrivers currentlyAssignedJob")
      .exec();

    return vehicles;
  } catch (error) {
    throw new Error(
      '{"status":"Failed", "statusCode":500, "errorMessage":"Error occurred while getting working vehicles."}'
    );
  }
};

const getDeletedVehiclesRepository = async () => {
  try {
    const vehicles = await vehiclesModel
      .find({ isDeleted: false })
      .populate("associatedDrivers currentlyAssignedJob")
      .exec();

    return vehicles;
  } catch (error) {
    throw new Error(
      '{"status":"Failed", "statusCode":500, "errorMessage":"Error occurred while getting deleted vehicles."}'
    );
  }
};

const updateVehicleRepository = async (
  _id: mongoose.Types.ObjectId,
  data: vehicle
) => {
  try {
    if (data.associatedDrivers === "") {
      data.associatedDrivers = null;
    }
    const vehicle = await vehiclesModel
      .findOneAndUpdate({ _id }, { $set: { ...data } })
      .exec();
    if (vehicle) {
      return await vehiclesModel
        .findOne({ _id })
        .populate("associatedDrivers currentlyAssignedJob")
        .exec();
    } else {
      throw new Error(
        '{"status":"User Not Found", "statusCode":404, "errorMessage":"No Vehicle found with the given credentials."}'
      );
    }
  } catch (err: any) {
    try {
      err = JSON.parse(err.message);
    } catch (err) {
      throw new Error(
        '{"status":"Failed", "statusCode":500, "errorMessage":"Error occurred while updating vehicle."}'
      );
    }
    throw new Error(
      `{"status":"${err.status}", "statusCode":${err.statusCode}, "errorMessage":"${err.errorMessage}"}`
    );
  }
};

const updateVehicleOMCHistoryRepository = async (
  _id: mongoose.Types.ObjectId,
  data: vehicle
) => {
  try {
    const vehicle = await vehiclesModel
      .findOneAndUpdate({ _id }, { $set: { ...data, associatedDrivers: null } })
      .exec();
    if (vehicle) {
      const newHistory = new OMCVehicleHistoryModel({
        _id: new mongoose.Types.ObjectId(),
        OMC: vehicle.OMC,
        vehicle: vehicle._id,
      });

      await newHistory.save();

      return await vehiclesModel
        .findOne({ _id })
        .populate("associatedDrivers currentlyAssignedJob")
        .exec();
    } else {
      throw new Error(
        '{"status":"User Not Found", "statusCode":404, "errorMessage":"No Vehicle found with the given credentials."}'
      );
    }
  } catch (err: any) {
    try {
      err = JSON.parse(err.message);
    } catch (err) {
      throw new Error(
        '{"status":"Failed", "statusCode":500, "errorMessage":"Error occurred while updating vehicle OMC history."}'
      );
    }
    throw new Error(
      `{"status":"${err.status}", "statusCode":${err.statusCode}, "errorMessage":"${err.errorMessage}"}`
    );
  }
};

const deleteVehicleRepository = async (_id: mongoose.Types.ObjectId) => {
  try {
    const vehicle = await vehiclesModel
      .findOneAndUpdate({ _id }, { $set: { isDeleted: true } })
      .populate("associatedDrivers currentlyAssignedJob")
      .exec();
    if (vehicle) {
      return { ...vehicle._doc, isDeleted: true };
    } else {
      throw new Error(
        '{"status":"User Not Found", "statusCode":404, "errorMessage":"No Vehicle found with the given credentials."}'
      );
    }
  } catch (err: any) {
    try {
      err = JSON.parse(err.message);
    } catch (err) {
      throw new Error(
        '{"status":"Failed", "statusCode":500, "errorMessage":"Error occurred while deleting vehicle."}'
      );
    }
    throw new Error(
      `{"status":"${err.status}", "statusCode":${err.statusCode}, "errorMessage":"${err.errorMessage}"}`
    );
  }
};

export {
  addVehicleRepository,
  getVehiclesRepository,
  getWorkingVehiclesRepository,
  getDeletedVehiclesRepository,
  updateVehicleRepository,
  updateVehicleOMCHistoryRepository,
  deleteVehicleRepository,
};
