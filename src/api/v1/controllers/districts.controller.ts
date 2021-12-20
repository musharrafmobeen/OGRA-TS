import {
  createDistrictService,
  getDistrictsService,
  updateDistrictService,
  deleteDistrictService,
} from "../services/districts.services";
import mongoose from "mongoose";
import { RequestHandler } from "express";

const createDistrict: RequestHandler = async (req, res, next) => {
  try {
    const district = await createDistrictService(req.body);

    return res.status(201).json({
      message: "District Added",
      district,
      request: {
        type: "POST",
        description: "District Added",
        URL: process.env.URL + "districts",
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

const getDistricts: RequestHandler = async (req, res, next) => {
  try {
    const districts = await getDistrictsService();

    return res.status(200).json({
      message: "Districts Returned",
      districts,
      request: {
        type: "GET",
        URL: process.env.URL + "districts",
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

const updateDistrict: RequestHandler = async (req, res, next) => {
  try {
    const data = req.body;
    const _id = new mongoose.Types.ObjectId(req.params._id);
    const district = await updateDistrictService(_id, data);

    return res.status(200).json({
      message: "District Updated",
      district,
      request: {
        type: "PATCH",
        description: "District Updated",
        URL: process.env.URL + "districts",
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

const deleteDistrict: RequestHandler = async (req, res, next) => {
  try {
    const _id = new mongoose.Types.ObjectId(req.params._id);
    const district = await deleteDistrictService(_id);

    return res.status(200).json({
      message: "District Deleted",
      district,
      request: {
        type: "DELETE",
        description: "District Deleted",
        URL: process.env.URL + "districts",
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

export { createDistrict, getDistricts, updateDistrict, deleteDistrict };
