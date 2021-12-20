import { getHistoryRepository } from "../repositories/omcVehicleHistory.repository";

const getHistoryService = async () => {
  try {
    return await getHistoryRepository();
  } catch (error) {
    throw new Error(
      '{"status":"Failed", "statusCode":500, "errorMessage":"Error occurred while Creating New Allowed Depot."}'
    );
  }
};

export { getHistoryService };
