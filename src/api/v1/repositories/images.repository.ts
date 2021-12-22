import imagesModel from "../models/images.model";
import mongoose from "mongoose";

const addImagesRepository = async (data: any) => {
  try {
    const { recordID, images } = data;
    const _id = new mongoose.Types.ObjectId();
    const image = new imagesModel({
      _id,
      recordID,
      images,
    });

    await image.save();

    return true;
  } catch (error) {
    throw new Error(
      '{"status":"Failed", "statusCode":500, "errorMessage":"Error occurred while Creating New Dispatches."}'
    );
  }
};

const getImageRepository = async (recordID: any) => {
  try {
    const imageDoc = await imagesModel.findOne({ recordID });
    return imageDoc;
  } catch (error) {
    throw new Error(
      '{"status":"Failed", "statusCode":500, "errorMessage":"Error occurred while Creating New Dispatches."}'
    );
  }
};

export { addImagesRepository, getImageRepository };
