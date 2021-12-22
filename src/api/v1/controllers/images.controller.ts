import imagesModel from "../models/images.model";
import mongoose from "mongoose";
import { RequestHandler } from "express";
import { addImagesService, getImageService } from "../services/images.services";

const addImages: RequestHandler = async (req, res, next) => {
  try {
    //@ts-ignore
    if (await addImagesService(req.fields)) {
      return res.status(201).json({
        message: "Image Added",
        request: {
          type: "POST",
          description: "Image Added",
          URL: process.env.URL + "images",
        },
      });
    }
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

const getImage: RequestHandler = async (req, res, next) => {
  try {
    const { recordID } = req.params;
    const imageDoc = await getImageService(recordID);

    return res.status(200).json({
      message: "Images Returned",
      imageDoc,
      request: {
        type: "GET",
        URL: process.env.URL + "images/" + recordID,
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

export { addImages, getImage };
