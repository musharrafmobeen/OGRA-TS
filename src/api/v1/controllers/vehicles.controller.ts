import {
  addVehicleService,
  getVehiclesService,
  getDeletedVehiclesService,
  getWorkingVehiclesService,
  updateVehicleService,
  updateVehicleOMCHistoryService,
  deleteVehicleService,
} from "../services/vehicles.services";
import mongoose from "mongoose";
import { RequestHandler } from "express";

const addVehicle: RequestHandler = async (req, res, next) => {
  try {
    const vehicle = await addVehicleService(req.body);
    return res.status(201).json({
      message: "Vehicle Added",
      vehicle,
      request: {
        type: "POST",
        description: "Vehicle Added",
        URL: process.env.URL + "vehicles",
      },
    });
  } catch (err: any) {
    err = JSON.parse(err.message);
    return res.status(err.statusCode).json({
      error: {
        status: err.status,
        statusCode: err.statusCode,
        errorMessage: err.errorMessage,
      },
      message: err.errorMessage,
    });
  }
};

const getVehicles: RequestHandler = async (req, res, next) => {
  try {
    const { userRole, OMC } = req.body;
    const vehicles = await getVehiclesService(OMC, userRole);
    return res.status(200).json({
      message: "Vehicles Returned",
      vehicles,
      request: {
        type: "GET",
        description: "Vehicles Returned",
        URL: process.env.URL + "vehicles",
      },
    });
  } catch (err: any) {
    err = JSON.parse(err.message);
    return res.status(err.statusCode).json({
      error: {
        status: err.status,
        statusCode: err.statusCode,
        errorMessage: err.errorMessage,
      },
      message: err.errorMessage,
    });
  }
};

const getWorkingVehicles: RequestHandler = async (req, res, next) => {
  try {
    const vehicles = await getWorkingVehiclesService();

    return res.status(200).json({
      message: "Vehicles Returned",
      vehicles,
      request: {
        type: "GET",
        description: "Vehicles Returned",
        URL: process.env.URL + "vehicles",
      },
    });
  } catch (err: any) {
    err = JSON.parse(err.message);
    return res.status(err.statusCode).json({
      error: {
        status: err.status,
        statusCode: err.statusCode,
        errorMessage: err.errorMessage,
      },
      message: err.errorMessage,
    });
  }
};

const getDeletedVehicles: RequestHandler = async (req, res, next) => {
  try {
    const vehicles = await getDeletedVehiclesService();

    return res.status(200).json({
      message: "Vehicles Returned",
      vehicles,
      request: {
        type: "GET",
        description: "Vehicles Returned",
        URL: process.env.URL + "vehicles",
      },
    });
  } catch (err: any) {
    err = JSON.parse(err.message);
    return res.status(err.statusCode).json({
      error: {
        status: err.status,
        statusCode: err.statusCode,
        errorMessage: err.errorMessage,
      },
      message: err.errorMessage,
    });
  }
};

const updateVehicle: RequestHandler = async (req, res, next) => {
  try {
    const data = req.body;
    const _id = new mongoose.Types.ObjectId(req.params._id);
    const vehicle = await updateVehicleService(_id, data);
    return res.status(200).json({
      message: "Vehicle Updated",
      vehicle,
      request: {
        type: "PATCH",
        description: "Vehicle Updated",
        URL: process.env.URL + "vehicles",
      },
    });
  } catch (err: any) {
    err = JSON.parse(err.message);
    return res.status(err.statusCode).json({
      error: {
        status: err.status,
        statusCode: err.statusCode,
        errorMessage: err.errorMessage,
      },
      message: err.errorMessage,
    });
  }
};

const updateVehicleOMCHistory: RequestHandler = async (req, res, next) => {
  try {
    const data = req.body;
    const _id = new mongoose.Types.ObjectId(req.params._id);
    const vehicle = await updateVehicleOMCHistoryService(_id, data);

    return res.status(200).json({
      message: "Vehicle Updated",
      vehicle,
      request: {
        type: "PATCH",
        description: "Vehicle Updated",
        URL: process.env.URL + "vehicles",
      },
    });
  } catch (err: any) {
    err = JSON.parse(err.message);
    return res.status(err.statusCode).json({
      error: {
        status: err.status,
        statusCode: err.statusCode,
        errorMessage: err.errorMessage,
      },
      message: err.errorMessage,
    });
  }
};

const deleteVehicle: RequestHandler = async (req, res, next) => {
  try {
    const _id = new mongoose.Types.ObjectId(req.params._id);
    const vehicle = await deleteVehicleService(_id);
    return res.status(200).json({
      message: "Vehicle Deleted",
      vehicle,
      request: {
        type: "DELETE",
        description: "Vehicle Deleted",
        URL: process.env.URL + "vehicle",
      },
    });
  } catch (err: any) {
    err = JSON.parse(err.message);
    return res.status(err.statusCode).json({
      error: {
        status: err.status,
        statusCode: err.statusCode,
        errorMessage: err.errorMessage,
      },
      message: err.errorMessage,
    });
  }
};

export {
  addVehicle,
  getVehicles,
  getWorkingVehicles,
  getDeletedVehicles,
  updateVehicle,
  updateVehicleOMCHistory,
  deleteVehicle,
};
