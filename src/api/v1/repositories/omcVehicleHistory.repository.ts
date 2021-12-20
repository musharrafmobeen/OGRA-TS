import OMCVehicleHistoryModel from "../models/omcVehicleHistory.model";

const getHistoryRepository = async () => {
  try {
    const history = await OMCVehicleHistoryModel.find().exec();
    return history;
  } catch (error) {
    throw new Error(
      '{"status":"Failed", "statusCode":500, "errorMessage":"Error occurred while getting OMC Vehicle History."}'
    );
  }
};

export { getHistoryRepository };
