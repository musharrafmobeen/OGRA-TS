import dispatchModel from "../models/dispatch.model";
import userModel from "../models/users.model";
import OMCsModel from "../models/omcs.model";
import vehiclesModel from "../models/vehicles.model";
import driversModel from "../models/drivers.model";
import allowedDepotModel from "../models/allowedDepots.model";
import ifemModel from "../models/ifemLocation.model";
import { RequestHandler } from "express";

const getDashboardCountsRepository = async (data: any, filter: any) => {
  try {
    let date = new Date();
    const dateFilter: any = {
      d: async () => {
        date.setDate(date.getDate() - 1);
      },
      w: async () => {
        date.setDate(date.getDate() - 7);
      },
      m: async () => {
        date.setMonth(date.getMonth() - 1);
      },
      q: async () => {
        date.setMonth(date.getMonth() - 3);
      },
    };

    if (!filter) {
      filter = "d";
    }
    await dateFilter[filter]();

    if (data.userRole === "OGRA Technical Team") {
      const dispatchesCount = await getDispatchesCounts(data, date);
      const usersCount = await getUsersCount(data, date);
      const omcsCount = await getOMCsCount(data, date);
      const ifemsCount = await getIfemLocationsCount(data, date);

      return {
        dispatchesCount,
        ifemsCount,
        omcsCount,
        usersCount,
      };
    } else if (data.userRole === "OMCs Management") {
      const dispatchesCount = await getDispatchesCounts(data, date);
      const allowedDepotsCount = await getAllowedDepotsCount(data, date);
      const driversCount = await getDriversCount(data, date);
      const usersCount = await getUsersCount(data, date);
      const vehiclesCount = await getVehiclesCount(data, date);
      return {
        dispatchesCount,
        allowedDepotsCount,
        driversCount,
        usersCount,
        vehiclesCount,
      };
    } else {
      const dispatchesCount = await getDispatchesCounts(data, date);
      return {
        dispatchesCount,
      };
    }
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

const getDispatchesCounts = async (data: any, date: Date) => {
  try {
    const { userRole, id } = data;
    if (userRole === "OGRA Technical Team") {
      const dispatches = await dispatchModel
        .aggregate([
          {
            $match: {
              createdAt: {
                $gte: date,
              },
            },
          },
          {
            $group: {
              _id: { status: "$status" },
              count: { $sum: 1 },
            },
          },
        ])
        .exec();

      const dispatchesCount: any = { D: 0, R: 0, A: 0 };

      for (let i = 0; i < dispatches.length; i++) {
        dispatchesCount[dispatches[i]._id.status] = dispatches[i].count;
      }

      return dispatchesCount;
    } else if (userRole === "OMCs Management") {
      const { OMC } = await userModel
        .findOne({ _id: id })
        .populate("OMC")
        .exec();
      if (OMC.permissions.pr03Dashboard.viewPR03) {
        const dispatches = await dispatchModel
          .aggregate([
            {
              $match: {
                createdAt: {
                  $gte: date,
                },
                "OMC._id": OMC._id,
              },
            },
            {
              $group: {
                _id: { status: "$status" },
                count: { $sum: 1 },
              },
            },
          ])
          .exec();

        const dispatchesCount: any = { D: 0, R: 0, A: 0 };

        for (let i = 0; i < dispatches.length; i++) {
          dispatchesCount[dispatches[i]._id.status] = dispatches[i].count;
        }
        return dispatchesCount;
      } else {
        throw new Error(
          '{"status":"Not Authorized", "statusCode":401, "errorMessage":"OMC Does Not Have Permission to Get Dispatches."}'
        );
      }
    } else {
      const user = await userModel.findOne({ _id: id }).populate("OMC").exec();
      console.log(user);
      if (user.OMC.permissions.pr03Dashboard.viewPR03) {
        const dispatches = await dispatchModel
          .aggregate([
            {
              $match: {
                createdAt: {
                  $gte: date,
                },
                "sourceDepot._id": user.primaryDepot,
              },
            },
            {
              $group: {
                _id: { status: "$status" },
                count: { $sum: 1 },
              },
            },
          ])
          .exec();
        const arrivalDispatches = await dispatchModel
          .aggregate([
            {
              $match: {
                createdAt: {
                  $gte: date,
                },
                "destinationDepot._id": user.deployedDepot,
                status: "D",
              },
            },
            {
              $group: {
                _id: { status: "$status" },
                count: { $sum: 1 },
              },
            },
          ])
          .exec();

        const dispatchesCount: any = {
          D: 0,
          R: 0,
          A: 0,
          AR: arrivalDispatches[0] ? arrivalDispatches[0].count : 0,
        };

        for (let i = 0; i < dispatches.length; i++) {
          dispatchesCount[dispatches[i]._id.status] = dispatches[i].count;
        }
        return dispatchesCount;
      } else {
        throw new Error(
          '{"status":"Not Authorized", "statusCode":401, "errorMessage":"OMC Does Not Have Permission to Get Dispatches."}'
        );
      }
    }
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

const getAllowedDepotsCount = async (data: any, date: Date) => {
  try {
    const { OMC } = data;
    const allowedDepots = await allowedDepotModel
      .aggregate([
        {
          $match: {
            createdAt: {
              $gte: date,
            },
            OMC: OMC,
          },
        },
        {
          $group: {
            _id: null,
            count: { $sum: 1 },
          },
        },
      ])
      .exec();
    return allowedDepots[0] ? allowedDepots[0].count : 0;
  } catch (error) {
    throw new Error(
      '{"status":"Failed", "statusCode":500, "errorMessage":"Error occurred while Trying To Get All Allowed Depots."}'
    );
  }
};

const getDriversCount = async (data: any, date: Date) => {
  try {
    const { OMC } = data;

    const drivers = await driversModel
      .aggregate([
        {
          $match: {
            createdAt: {
              $gte: date,
            },
            OMC: OMC,
          },
        },
        {
          $group: {
            _id: null,
            count: { $sum: 1 },
          },
        },
      ])
      .exec();

    return drivers[0] ? drivers[0].count : 0;
  } catch (error) {
    throw new Error(
      '{"status":"Failed", "statusCode":500, "errorMessage":"Error occurred while Trying To Get drivers."}'
    );
  }
};

const getVehiclesCount = async (data: any, date: Date) => {
  try {
    const { OMC } = data;

    const vehicles = await vehiclesModel
      .aggregate([
        {
          $match: {
            createdAt: {
              $gte: date,
            },
            OMC: OMC,
          },
        },
        {
          $group: {
            _id: null,
            count: { $sum: 1 },
          },
        },
      ])
      .exec();

    return vehicles[0] ? vehicles[0].count : 0;
  } catch (error) {
    throw new Error(
      '{"status":"Failed", "statusCode":500, "errorMessage":"Error occurred while Trying To Get vehicles."}'
    );
  }
};

const getUsersCount = async (data: any, date: Date) => {
  try {
    const { userRole, id, OMC } = data;
    if (userRole === "OGRA Technical Team") {
      const users = await userModel
        .aggregate([
          {
            $match: {
              createdAt: {
                $gte: date,
              },
            },
          },
          {
            $group: {
              _id: null,
              count: { $sum: 1 },
            },
          },
        ])
        .exec();

      return users[0] ? users[0].count : 0;
    } else {
      const users = await userModel
        .aggregate([
          {
            $match: {
              createdAt: {
                $gte: date,
              },
              OMC,
            },
          },
          {
            $group: {
              _id: null,
              count: { $sum: 1 },
            },
          },
        ])
        .exec();
      return users[0] ? users[0].count : 0;
    }
  } catch (err) {
    throw new Error(
      '{"status":"Failed", "statusCode":500, "errorMessage":"Error occurred while Trying To Get Users."}'
    );
  }
};

const getOMCsCount = async (data: any, date: Date) => {
  try {
    const OMCs = await OMCsModel.aggregate([
      {
        $match: {
          createdAt: {
            $gte: date,
          },
        },
      },
      {
        $group: {
          _id: null,
          count: { $sum: 1 },
        },
      },
    ]).exec();

    return OMCs[0] ? OMCs[0].count : 0;
  } catch (error) {
    throw new Error(
      '{"status":"Failed", "statusCode":500, "errorMessage":"Error occurred while Trying To Get OMCs."}'
    );
  }
};

const getIfemLocationsCount = async (data: any, date: Date) => {
  try {
    const IFEM_Locations = await ifemModel
      .aggregate([
        {
          $match: {
            createdAt: {
              $gte: date,
            },
          },
        },
        {
          $group: {
            _id: null,
            count: { $sum: 1 },
          },
        },
      ])
      .exec();

    return IFEM_Locations[0] ? IFEM_Locations[0].count : 0;
  } catch (error) {
    throw new Error(
      '{"status":"Failed", "statusCode":500, "errorMessage":"Error occurred while Trying To Get OMCs."}'
    );
  }
};

export { getDashboardCountsRepository };
