import {
  addDepotService,
  getDepotsService,
  updateDepotService,
  deleteDepotService,
} from "../services/depots.services";
import mongoose from "mongoose";
import { RequestHandler } from "express";

const addDepot: RequestHandler = async (req, res, next) => {
  try {
    const depot = await addDepotService(req.body);
    return res.status(201).json({
      message: "Depot Added",
      depot,
      request: {
        type: "POST",
        description: "Depot Added",
        URL: process.env.URL + "depots",
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

const getDepots: RequestHandler = async (req, res, next) => {
  try {
    const { OMC, userRole } = req.body;
    const depots = await getDepotsService(OMC, userRole);
    return res.status(200).json({
      message: "Depot Returned",
      depots,
      request: {
        type: "GET",
        description: "Depot Returned",
        URL: "http://localhost:5000/depots",
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

const updateDepot: RequestHandler = async (req, res, next) => {
  try {
    const data = req.body;
    const _id = new mongoose.Types.ObjectId(req.params._id);
    const depot = await updateDepotService(_id, data);
    return res.status(200).json({
      message: "Depot Updated",
      depot,
      request: {
        type: "PATCH",
        description: "Depot Updated",
        URL: process.env.URL + "depots",
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

const deleteDepot: RequestHandler = async (req, res, next) => {
  try {
    const _id = new mongoose.Types.ObjectId(req.params._id);
    const depot = await deleteDepotService(_id);
    return res.status(200).json({
      message: "Depot Deleted",
      storagePoint: depot,
      request: {
        type: "DELETE",
        description: "Depot Deleted",
        URL: process.env.URL + "depots",
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

export { addDepot, getDepots, updateDepot, deleteDepot };
