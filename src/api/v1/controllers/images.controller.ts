import { RequestHandler } from "express";
import { addImagesService, getImageService } from "../services/images.services";

const addImages: RequestHandler = async (req, res, next) => {
  try {
    await addImagesService(req.body);
    console.log("adrak");
    next();
  } catch (err: any) {
    err = JSON.parse(err.message);
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
