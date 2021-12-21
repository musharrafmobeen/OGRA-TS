import { getDashboardCountsRepository } from "../repositories/dashBoardCounts.repository";

const getDashboardCountsService = async (data: any, filter: any) => {
  try {
    return await getDashboardCountsRepository(data, filter);
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

export { getDashboardCountsService };
