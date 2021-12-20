import {
  createCarriageContractorService,
  getCarriageContractorsService,
  updateCarriageContractorService,
  deleteCarriageContractorService,
} from "../services/carriageContractor.services";
import mongoose from "mongoose";
import { RequestHandler } from "express";

const createCarriageContractor: RequestHandler = async (req, res, next) => {
  try {
    const newCarriageContractor = await createCarriageContractorService(
      req.body
    );

    return res.status(201).json({
      message: "Carriage Contractor  Added",
      carriageContractor: newCarriageContractor,
      request: {
        type: "POST",
        description: "Carriage Contractor Added",
        URL: process.env.URL + "carriagecontractors",
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

const getCarriageContractors: RequestHandler = async (req, res, next) => {
  try {
    const carriageContractors = await getCarriageContractorsService();

    return res.status(200).json({
      message: "Carriage Contractor Returned",
      carriageContractors,
      request: {
        type: "GET",
        URL: process.env.URL + "carriagecontractors",
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

const updateCarriageContractor: RequestHandler = async (req, res, next) => {
  try {
    const data = req.body;
    const _id = new mongoose.Types.ObjectId(req.params._id);
    const carriageContractor = await updateCarriageContractorService(_id, data);
    return res.status(200).json({
      message: "Carriage Contractor Updated",
      carriageContractor,
      request: {
        type: "PATCH",
        description: "Carriage Contractor Updated",
        URL: process.env.URL + "carriagecontractors",
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

const deleteCarriageContractor: RequestHandler = async (req, res, next) => {
  try {
    const _id = new mongoose.Types.ObjectId(req.params._id);
    const carriageContractor = await deleteCarriageContractorService(_id);
    return res.status(200).json({
      message: "Carriage Contractor Deleted",
      carriageContractor,
      request: {
        type: "DELETE",
        description: "Carriage Contractor Deleted",
        URL: process.env.URL + "carriagecontractors",
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
  createCarriageContractor,
  getCarriageContractors,
  updateCarriageContractor,
  deleteCarriageContractor,
};
