import {
  createCityService,
  getCitiesService,
  updateCityService,
  deleteCityService,
} from "../services/cities.services";
import mongoose from "mongoose";
import { RequestHandler } from "express";

const createCity: RequestHandler = async (req, res, next) => {
  try {
    const city = await createCityService(req.body);

    return res.status(201).json({
      message: "City Added",
      city,
      request: {
        type: "POST",
        description: "City Added",
        URL: process.env.URL + "cities",
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

const getCities: RequestHandler = async (req, res, next) => {
  try {
    const cities = await getCitiesService();

    return res.status(200).json({
      message: "Cities Returned",
      cities,
      request: {
        type: "GET",
        URL: process.env.URL + "cities",
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

const updateCity: RequestHandler = async (req, res, next) => {
  try {
    const data = req.body;
    const _id = new mongoose.Types.ObjectId(req.params._id);
    const city = await updateCityService(_id, data);
    return res.status(200).json({
      message: "City Updated",
      city,
      request: {
        type: "PATCH",
        description: "City Updated",
        URL: process.env.URL + "cities",
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

const deleteCity: RequestHandler = async (req, res, next) => {
  try {
    const _id = new mongoose.Types.ObjectId(req.params._id);
    const city = await deleteCityService(_id);

    return res.status(200).json({
      message: "City Deleted",
      city,
      request: {
        type: "DELETE",
        description: "City Deleted",
        URL: process.env.URL + "cities",
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

export { createCity, getCities, updateCity, deleteCity };
