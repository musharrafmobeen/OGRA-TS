import { RequestHandler } from "express";
import mongoose from "mongoose";
import {
  addDispatchService,
  getDispatchesService,
  getPersonalDispatchesService,
  getReceivingDispatchesService,
  updateDispatchService,
  deleteDispatchService,
} from "../services/dispatch.services";

const addDispatch: RequestHandler = async (req, res, next) => {
  try {
    const dispatch = await addDispatchService(req.body);
    return res.status(201).json({
      message: "Dispatch Added",
      dispatch,
      request: {
        type: "POST",
        description: "Dispatch Added",
        URL: process.env.URL + "dispatches",
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

const getDispatches: RequestHandler = async (req, res, next) => {
  try {
    const { userRole, id } = req.body;
    const { status, page, rows } = req.query;
    const { dispatches, totalCount } = await getDispatchesService(
      id,
      userRole,
      status,
      page,
      rows
    );

    return res.status(200).json({
      message: "Dispatch Returned",
      dispatches,
      totalCount,
      request: {
        type: "GET",
        description: "Dispatch Returned",
        URL: process.env.URL + "dispatches",
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

const getPersonalDispatches: RequestHandler = async (req, res, next) => {
  try {
    const { id } = req.body;
    const { status, page, rows } = req.query;
    const { dispatches, totalCount } = await getPersonalDispatchesService(
      id,
      status,
      page,
      rows
    );
    return res.status(200).json({
      message: "Dispatch Returned",
      dispatches,
      totalCount,
      request: {
        type: "GET",
        description: "Dispatch Returned",
        URL: process.env.URL + "dispatches",
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

const getReceivingDispatches: RequestHandler = async (req, res, next) => {
  try {
    const { id } = req.body;
    const { status, page, rows } = req.query;
    const { dispatches, totalCount } = await getReceivingDispatchesService(
      id,
      status,
      page,
      rows
    );
    return res.status(200).json({
      message: "Dispatch Returned",
      dispatches,
      totalCount,
      request: {
        type: "GET",
        description: "Dispatch Returned",
        URL: process.env.URL + "dispatches",
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

const updateDispatch: RequestHandler = async (req, res, next) => {
  try {
    const data = req.body;
    const _id = new mongoose.Types.ObjectId(req.params._id);
    const dispatch = await updateDispatchService(_id, data);
    return res.status(200).json({
      message: "Dispatch Updated",
      dispatch,
      request: {
        type: "PATCH",
        description: "Dispatch Updated",
        URL: process.env.URL + "dispatches",
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

const deleteDispatch: RequestHandler = async (req, res, next) => {
  try {
    const _id = new mongoose.Types.ObjectId(req.params._id);
    const dispatch = await deleteDispatchService(_id, req.body.id);
    return res.status(200).json({
      message: "Dispatch Deleted",
      dispatch,
      request: {
        type: "DELETE",
        description: "Dispatch Deleted",
        URL: process.env.URL + "dispatches",
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
  addDispatch,
  getDispatches,
  updateDispatch,
  deleteDispatch,
  getPersonalDispatches,
  getReceivingDispatches,
};
