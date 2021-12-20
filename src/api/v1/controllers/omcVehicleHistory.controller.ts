import { RequestHandler } from "express";
import { getHistoryService } from "../services/omcVehicleHistory.services";

const getHistory: RequestHandler = async (req, res, next) => {
  try {
    const history = await getHistoryService();

    return res.status(200).json({
      message: "History Returned",
      history,
      request: {
        type: "GET",
        description: "History Returned",
        URL: process.env.URL + "history",
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

export { getHistory };
