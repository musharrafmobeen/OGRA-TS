import {
  addDriverService,
  getDriversService,
  updateDriverService,
  deleteDriverService,
} from "../services/drivers.services";
import mongoose from "mongoose";
import { RequestHandler } from "express";

const addDriver: RequestHandler = async (req, res, next) => {
  try {
    const driver = await addDriverService(req.body);
    return res.status(201).json({
      message: "Driver Added",
      driver,
      request: {
        type: "POST",
        description: "Driver Added",
        URL: process.env.URL + "drivers",
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

const getDrivers: RequestHandler = async (req, res, next) => {
  try {
    const { userRole, OMC } = req.body;
    const drivers = await getDriversService(OMC, userRole);

    return res.status(200).json({
      message: "Drivers Returned",
      drivers,
      request: {
        type: "GET",
        description: "Drivers Returned",
        URL: process.env.URL + "drivers",
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

const updateDriver: RequestHandler = async (req, res, next) => {
  try {
    const data = req.body;
    const _id = new mongoose.Types.ObjectId(req.params._id);
    const driver = await updateDriverService(_id, data);
    return res.status(200).json({
      message: "Driver Updated",
      driver,
      request: {
        type: "PATCH",
        description: "Driver Updated",
        URL: process.env.URL + "drivers",
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

const deleteDriver: RequestHandler = async (req, res, next) => {
  try {
    const _id = new mongoose.Types.ObjectId(req.params._id);
    const driver = await deleteDriverService(_id);
    return res.status(200).json({
      message: "Driver Deleted",
      driver,
      request: {
        type: "DELETE",
        description: "Driver Deleted",
        URL: process.env.URL + "drivers",
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

export { addDriver, getDrivers, updateDriver, deleteDriver };
