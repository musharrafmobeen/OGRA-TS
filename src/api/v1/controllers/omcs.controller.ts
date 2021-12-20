import { RequestHandler } from "express";
import mongoose from "mongoose";
import {
  createOMCService,
  getOMCsService,
  getAvailableDepotsService,
  updateOMCService,
  deleteOMCService,
} from "../services/omcs.services";

const createOMC: RequestHandler = async (req, res, next) => {
  try {
    const OMC = await createOMCService(req.body);
    return res.status(201).json({
      message: "OMC Added",
      OMC,
      request: {
        type: "POST",
        description: "OMC Added",
        URL: process.env.URL + "omcs",
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

const getOMCs: RequestHandler = async (req, res, next) => {
  try {
    const OMCs = await getOMCsService();

    return res.status(200).json({
      message: "OMCs Returned",
      OMCs,
      request: {
        type: "GET",
        URL: process.env.URL + "omcs",
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

const getAvailableDepots: RequestHandler = async (req, res, next) => {
  try {
    const { OMC } = req.body;
    const depots = await getAvailableDepotsService(OMC);
    return res.status(200).json({
      message: "OMCs Returned",
      availableDepots: depots,
      request: {
        type: "GET",
        URL: process.env.URL + "omcs/availabledepots",
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

const updateOMC: RequestHandler = async (req, res, next) => {
  try {
    const data = req.body;
    const _id = new mongoose.Types.ObjectId(req.params._id);
    const OMC = await updateOMCService(_id, data);
    return res.status(200).json({
      message: "OMC Updated",
      OMC,
      request: {
        type: "PATCH",
        description: "OMC Updated",
        URL: process.env.URL + "omcs",
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

const deleteOMC: RequestHandler = async (req, res, next) => {
  try {
    const _id = new mongoose.Types.ObjectId(req.params._id);
    const OMC = deleteOMCService(_id);
    return res.status(200).json({
      message: "OMC Deleted",
      OMC,
      request: {
        type: "DELETE",
        description: "OMC Deleted",
        URL: process.env.URL + "omcs",
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

export { createOMC, getOMCs, updateOMC, deleteOMC, getAvailableDepots };
