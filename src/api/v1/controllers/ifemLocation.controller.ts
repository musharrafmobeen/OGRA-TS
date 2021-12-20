import {
  addIfemLocationService,
  getIfemLocationService,
  updateIfemLocationService,
  deleteIfemLocationService,
} from "../services/ifemLocation.services";
import mongoose from "mongoose";
import { RequestHandler } from "express";

const addIfemLocation: RequestHandler = async (req, res, next) => {
  try {
    const IFEM_Location = await addIfemLocationService(req.body);
    return res.status(201).json({
      message: "IFEM Location Added",
      IFEM_Location,
      request: {
        type: "POST",
        description: "IFEM Location Added",
        URL: process.env.URL + "ifems",
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

const getIfemLocation: RequestHandler = async (req, res, next) => {
  try {
    const IFEM_Locations = await getIfemLocationService();
    return res.status(200).json({
      message: "IFEM Locations Returned",
      IFEM_Locations,
      request: {
        type: "GET",
        description: "IFEM Location Returned",
        URL: process.env.URL + "ifems",
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

const updateIfemLocation: RequestHandler = async (req, res, next) => {
  try {
    const data = req.body;
    const _id = new mongoose.Types.ObjectId(req.params._id);
    const IFEM_Location = await updateIfemLocationService(_id, data);
    return res.status(200).json({
      message: "IFEM Location Updated",
      IFEM_Location,
      request: {
        type: "PATCH",
        description: "IFEM Location Updated",
        URL: process.env.URL + "ifems",
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

const deleteIfemLocation: RequestHandler = async (req, res, next) => {
  try {
    const _id = new mongoose.Types.ObjectId(req.params._id);
    const IFEM_Location = await deleteIfemLocationService(_id);

    return res.status(200).json({
      message: "IFEM Location Deleted",
      IFEM_Location,
      request: {
        type: "DELETE",
        description: "IFEM Location Deleted",
        URL: process.env.URL + "ifems",
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
  addIfemLocation,
  getIfemLocation,
  updateIfemLocation,
  deleteIfemLocation,
};
