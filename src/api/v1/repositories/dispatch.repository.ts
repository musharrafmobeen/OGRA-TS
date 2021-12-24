import dispatchModel from "../models/dispatch.model";
import userModel from "../models/users.model";
import depotModel from "../models/depots.model";
import omcModel from "../models/omcs.model";
import vehiclesModel from "../models/vehicles.model";
import driversModel from "../models/drivers.model";
import mongoose from "mongoose";
import { dispatch } from "../interfaces/dispatch";

const driversUpdate = async (Drivers: any, _id: mongoose.Types.ObjectId) => {
  let data = [];

  for (let i = 0; i < Drivers.length; i++) {
    data.push(
      await driversModel
        .findOneAndUpdate(
          { _id: Drivers[i] },
          { $set: { currentlyAssignedJob: _id } }
        )
        .exec()
    );
  }

  return data;
};

const addDispatchRespository = async (data: dispatch) => {
  try {
    let { OMC, id, vehicle, Drivers, destinationDepot, recordID } = data;
    const OMC_OBJ = await omcModel.findById(OMC).exec();
    if (OMC_OBJ.permissions.pr03Dashboard.createPR03) {
      const dispatch = await dispatchModel
        .findOne({ vehicle, status: "D" })
        .exec();

      if (!dispatch) {
        const dispatchDataEntryUserId = await userModel
          .findOne({ _id: id })
          .exec();

        const recieveDataEntryUserId = await userModel
          .find({ deployedDepot: destinationDepot })
          .exec();

        const destinationDpt = await depotModel
          .findOne({ _id: destinationDepot })
          .exec();
        const sourceDpt = await depotModel
          .findOne({ _id: dispatchDataEntryUserId.primaryDepot })
          .exec();

        const _id = recordID;

        const updatedVehicle = await vehiclesModel
          .findOneAndUpdate(
            { _id: vehicle._id },
            { $set: { currentlyAssignedJob: _id } }
          )
          .populate("associatedDrivers");

        const drivers = await driversUpdate(Drivers, _id);

        for (let i = 0; i < drivers.length; i++) {
          drivers[i]["currentlyAssignedJob"] = _id;
        }

        const newDispatch = new dispatchModel({
          _id,
          OMC: OMC_OBJ,
          dispatchDataEntryUserId,
          recieveDataEntryUserId,
          vehicle: {
            ...vehicle,
            currentlyAssignedJob: updatedVehicle.currentlyAssignedJob,
          },
          Drivers: drivers,
          sourceDepot: sourceDpt,
          destinationDepot: destinationDpt,
          statusByInspector: [],
          status: "D",
        });

        await newDispatch.save();

        return await dispatchModel.findOne({ _id }).exec();
      }
      throw new Error(
        '{"status":"Already Exists", "statusCode":403, "errorMessage":"Dispatch Already Exists"}'
      );
    } else {
      throw new Error(
        '{"status":"Not Authorized", "statusCode":401, "errorMessage":"OMC Does Not Have Permission to Create Dispatches."}'
      );
    }
  } catch (err: any) {
    try {
      err = JSON.parse(err.message);
    } catch (err) {
      throw new Error(
        '{"status":"Failed", "statusCode":500, "errorMessage":"Error occurred while Creating New Dispatch."}'
      );
    }
    throw new Error(
      `{"status":"${err.status}", "statusCode":${err.statusCode}, "errorMessage":"${err.errorMessage}"}`
    );
  }
};

const getDispatchesRespository = async (
  id: mongoose.Types.ObjectId,
  userRole: string,
  status: string,
  skip: number,
  rows: number
) => {
  try {
    if (userRole === "OGRA Technical Team") {
      // const dispatches = await dispatchModel.find().exec();

      const dispatches =
        status === "all"
          ? await dispatchModel.find().skip(skip).limit(rows).exec()
          : await dispatchModel.find({ status }).skip(skip).limit(rows).exec();

      const totalCount = await getDispatchesCounts(userRole, { status });
      console.log(totalCount);

      return { dispatches, totalCount };
    } else {
      const { OMC } = await userModel
        .findOne({ _id: id })
        .populate("OMC")
        .exec();
      if (OMC.permissions.pr03Dashboard.viewPR03) {
        // if (updated === true || updated === undefined) {
        const dispatches = await dispatchModel
          .find({ "OMC._id": OMC._id })
          .exec();
        const totalCount = await getDispatchesCounts(userRole, { status, OMC });
        return { dispatches, totalCount };
      } else {
        throw new Error(
          '{"status":"Not Authorized", "statusCode":401, "errorMessage":"OMC Does Not Have Permission to get Dispatches."}'
        );
      }
    }
  } catch (err: any) {
    try {
      err = JSON.parse(err.message);
    } catch (err) {
      throw new Error(
        '{"status":"Failed", "statusCode":500, "errorMessage":"Error occurred while Get dispatches."}'
      );
    }
    throw new Error(
      `{"status":"${err.status}", "statusCode":${err.statusCode}, "errorMessage":"${err.errorMessage}"}`
    );
  }
};

const getPersonalDispatchesRespository = async (
  id: mongoose.Types.ObjectId,
  status: string,
  skip: number,
  rows: number
) => {
  try {
    const { primaryDepot, OMC } = await userModel
      .findOne({ _id: id })
      .populate("OMC")
      .exec();
    if (OMC.permissions.pr03Dashboard.viewPR03) {
      // const dispatches = await dispatchModel
      //   .find({ "sourceDepot._id": primaryDepot })
      //   .exec();

      const dispatches =
        status === "all"
          ? await dispatchModel
              .find({ "sourceDepot._id": primaryDepot })
              .skip(skip)
              .limit(rows)
              .exec()
          : await dispatchModel
              .find({ status, "sourceDepot._id": primaryDepot })
              .skip(skip)
              .limit(rows)
              .exec();

      const role = "supplymanager-personalDispatches";

      const totalCount = await getDispatchesCounts(role, {
        status,
        primaryDepot,
      });

      return { dispatches, totalCount };
    } else {
      throw new Error(
        '{"status":"Not Authorized", "statusCode":401, "errorMessage":"OMC Does Not Have Permission to Get Dispatches."}'
      );
    }
  } catch (err: any) {
    try {
      err = JSON.parse(err.message);
    } catch (err) {
      throw new Error(
        '{"status":"Failed", "statusCode":500, "errorMessage":"Error occurred while getting personal dispacthes."}'
      );
    }
    throw new Error(
      `{"status":"${err.status}", "statusCode":${err.statusCode}, "errorMessage":"${err.errorMessage}"}`
    );
  }
};

const getReceivingDispatchesRespository = async (
  id: mongoose.Types.ObjectId,
  status: string,
  skip: number,
  rows: number
) => {
  try {
    const { deployedDepot, OMC } = await userModel
      .findOne({ _id: id })
      .populate("OMC")
      .exec();
    if (OMC.permissions.pr03Dashboard.viewPR03) {
      // const dispatches = await dispatchModel
      //   .find({ "destinationDepot._id": deployedDepot })
      //   .exec();
      const dispatches =
        status === "all"
          ? await dispatchModel
              .find({ "destinationDepot._id": deployedDepot })
              .skip(skip)
              .limit(rows)
              .exec()
          : await dispatchModel
              .find({ status, "destinationDepot._id": deployedDepot })
              .skip(skip)
              .limit(rows)
              .exec();

      const role = "supplymanager-receivingDispatches";

      const totalCount = await getDispatchesCounts(role, {
        status,
        deployedDepot,
      });

      return { dispatches, totalCount };
    } else {
      throw new Error(
        '{"status":"Not Authorized", "statusCode":401, "errorMessage":"OMC Does Not Have Permission to Get Dispatches."}'
      );
    }
  } catch (err: any) {
    try {
      err = JSON.parse(err.message);
    } catch (err) {
      throw new Error(
        '{"status":"Failed", "statusCode":500, "errorMessage":"Error occurred while getting receiving dispatches."}'
      );
    }
    throw new Error(
      `{"status":"${err.status}", "statusCode":${err.statusCode}, "errorMessage":"${err.errorMessage}"}`
    );
  }
};

const updateDispatchRespository = async (
  _id: mongoose.Types.ObjectId,
  data: any
) => {
  try {
    const { OMC } = await userModel
      .findOne({ _id: data.id })
      .populate("OMC")
      .exec();
    if (OMC.permissions.pr03Dashboard.updatePR03) {
      const recieveDataEntryUserId = data.id;
      let updateData = [];
      if (data.hasOwnProperty("userStatus")) {
        updateData = [
          { _id },
          { $set: { ...data } },
          {
            $push: {
              statusByInspector: {
                userID: recieveDataEntryUserId,
                userStatus: data.userStatus,
                comment: data.comment,
              },
            },
          },
        ];
      } else {
        updateData = [{ _id }, { $set: { ...data } }];
      }

      const dispatch = await dispatchModel
        .findOneAndUpdate(...updateData)
        .exec();

      if (dispatch) {
        return await dispatchModel.findOne({ _id }).exec();
      } else {
        throw new Error(
          '{"status":"User Not Found", "statusCode":404, "errorMessage":"No Dispatch found with the given credentials."}'
        );
      }
    } else {
      throw new Error(
        '{"status":"Not Authorized", "statusCode":401, "errorMessage":"OMC Does Not Have Permission to Update Dispatches."}'
      );
    }
  } catch (err: any) {
    try {
      err = JSON.parse(err.message);
    } catch (err) {
      throw new Error(
        '{"status":"Failed", "statusCode":500, "errorMessage":"Error occurred while updating dispatch."}'
      );
    }
    throw new Error(
      `{"status":"${err.status}", "statusCode":${err.statusCode}, "errorMessage":"${err.errorMessage}"}`
    );
  }
};

const deleteDispatchRespository = async (
  _id: mongoose.Types.ObjectId,
  id: mongoose.Types.ObjectId
) => {
  try {
    const { OMC } = await userModel.findOne({ _id: id }).populate("OMC").exec();
    if (OMC.permissions.pr03Dashboard.deletePR03) {
      const dispatch = await dispatchModel
        .findOneAndDelete({ _id })
        .populate("OMC storagePoint sourceIFEMLocation destinationIFEMLocation")
        .exec();
      if (dispatch) {
        return dispatch;
      } else {
        throw new Error(
          '{"status":"User Not Found", "statusCode":404, "errorMessage":"No Dispatch found with the given credentials."}'
        );
      }
    } else {
      throw new Error(
        '{"status":"Not Authorized", "statusCode":401, "errorMessage":"OMC Does Not Have Permission to Delete Dispatches."}'
      );
    }
  } catch (err: any) {
    try {
      err = JSON.parse(err.message);
    } catch (err) {
      throw new Error(
        '{"status":"Failed", "statusCode":500, "errorMessage":"Error occurred while deleting dispatch."}'
      );
    }
    throw new Error(
      `{"status":"${err.status}", "statusCode":${err.statusCode}, "errorMessage":"${err.errorMessage}"}`
    );
  }
};

const getDispatchesCounts = async (
  userRole: string,
  data: any
): Promise<number> => {
  let match;
  if (userRole === "OGRA Technical Team") {
    match = data.status === "all" ? {} : { status: data.status };
  } else if (userRole === "OMCs Management") {
    match =
      data.status === "all"
        ? { OMC: data.OMC }
        : { OMC: data.OMC, status: data.status };
  } else if (userRole === "supplymanager-personalDispatches") {
    match =
      data.status === "all"
        ? { "sourceDepot._id": data.primaryDepot }
        : { "sourceDepot._id": data.primaryDepot, status: data.status };
  } else {
    match =
      data.status === "all"
        ? { "destinationDepot._id": data.deployedDepot }
        : { "destinationDepot._id": data.deployedDepot, status: data.status };
  }
  console.log("match", match);
  const count = await dispatchModel
    .aggregate([
      {
        $match: match,
      },
      {
        $group: {
          _id: { status: "$status" },
          count: { $sum: 1 },
        },
      },
    ])
    .exec();
  let totalCount = 0;
  for (let i = 0; i < count.length; i++) {
    totalCount += count[i].count;
  }
  console.log("totalCount", totalCount);
  return totalCount;
};

export {
  addDispatchRespository,
  getDispatchesRespository,
  updateDispatchRespository,
  deleteDispatchRespository,
  getPersonalDispatchesRespository,
  getReceivingDispatchesRespository,
};
