import {
  createAllowedDepotService,
  getAllowedDepotsService,
  updateAllowedDepotService,
  deleteAllowedDepotService,
  getAllowedDepotsPaginationService,
} from "../services/allowedDepots.services";
import mongoose from "mongoose";
import { RequestHandler } from "express";

const createAllowedDepot: RequestHandler = async (req, res, next) => {
  try {
    const allowedDepot = await createAllowedDepotService(req.body);
    return res.status(201).json({
      message: "Allowed Depot  Added",
      allowedDepot,
      request: {
        type: "POST",
        description: "Allowed Depot Added",
        URL: process.env.URL + "alloweddepots",
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

const getAllowedDepots: RequestHandler = async (req, res, next) => {
  try {
    const { id, userRole, OMC } = req.body;
    const allowedDepots = await getAllowedDepotsService(userRole, OMC);
    return res.status(200).json({
      message: "Allowed Depots Returned",
      allowedDepots,
      request: {
        type: "GET",
        URL: process.env.URL + "alloweddepots",
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

const getAllowedDepotsPagination: RequestHandler = async (req, res, next) => {
  try {
    const { id, userRole, OMC } = req.body;
    const { page, rows } = req.query;
    const { allowedDepots, totalCount } =
      await getAllowedDepotsPaginationService(userRole, OMC, page, rows);
    return res.status(200).json({
      message: "Allowed Depots Returned",
      allowedDepots,
      totalCount,
      request: {
        type: "GET",
        URL: process.env.URL + "alloweddepots/paginated",
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

const updateAllowedDepot: RequestHandler = async (req, res, next) => {
  try {
    const data = req.body;
    const _id = new mongoose.Types.ObjectId(req.params._id);
    const allowedDepot = await updateAllowedDepotService(_id, data);

    return res.status(200).json({
      message: "Allowed Depot Updated",
      allowedDepot,
      request: {
        type: "PATCH",
        description: "Allowed Depot Updated",
        URL: process.env.URL + "alloweddepots",
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

const deleteAllowedDepot: RequestHandler = async (req, res, next) => {
  try {
    const _id = new mongoose.Types.ObjectId(req.params._id);
    const allowedDepot = await deleteAllowedDepotService(_id);
    return res.status(200).json({
      message: "Allowed Depot Deleted",
      allowedDepot,
      request: {
        type: "DELETE",
        description: "Allowed Depot Deleted",
        URL: process.env.URL + "alloweddepots",
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
  createAllowedDepot,
  getAllowedDepots,
  updateAllowedDepot,
  deleteAllowedDepot,
  getAllowedDepotsPagination,
};
