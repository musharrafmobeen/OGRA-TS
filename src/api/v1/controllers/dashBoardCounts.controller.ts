import { RequestHandler } from "express";
import { getDashboardCountsService } from "../services/dashBoardCounts.services";

const getDashboardCounts: RequestHandler = async (req, res, next) => {
  try {
    const { filter } = req.params;
    const dashBoardCounts = await getDashboardCountsService(req.body, filter);
    return res.status(200).json({
      message: "Dispatch Returned",
      ...dashBoardCounts,
      request: {
        type: "GET",
        description: "Dispatch Returned",
        URL: process.env.URL + "dispatches",
      },
    });
  } catch (err: any) {
    try {
      err = JSON.parse(err.message);
    } catch (err) {
      throw new Error(
        '{"status":"Failed", "statusCode":500, "errorMessage":"Error occurred while Creating New Dispatches."}'
      );
    }
    throw new Error(
      `{"status":"${err.status}", "statusCode":${err.statusCode}, "errorMessage":"${err.errorMessage}"}`
    );
  }
};

export { getDashboardCounts };
