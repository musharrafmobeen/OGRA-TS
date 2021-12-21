import userModel from "../models/users.model";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { userData } from "../interfaces/users";
import { getSecretKey } from "../helpers/environmentVariables";

const createUserRespository = async (data: userData) => {
  try {
    console.log("data", data, { userName: data.userName });
    let user = await userModel.findOne({ userName: data.userName });
    console.log("user", user);
    if (!user) {
      const pass = bcrypt.hashSync(data.password, 10);
      if (data.userRole !== "OGRA Technical Team") {
        const userOMC = await userModel
          .findOne({ _id: data.id })
          .populate("OMC userIFEMLocation deployedDepot primaryDepot")
          .exec();
        data.OMC = userOMC.OMC;
      }

      const _id = new mongoose.Types.ObjectId(),
        newUser = new userModel({
          _id,
          ...data,
          password: pass,
        });
      await newUser.save();
      user = await userModel.findOne({ userName: data.userName }).exec();
      return user;
    } else {
      throw new Error(
        '{"status":"Already Exists", "statusCode":403, "errorMessage":"User Has Already Been Registered"}'
      );
    }
  } catch (err: any) {
    try {
      err = JSON.parse(err.message);
    } catch (err) {
      throw new Error(
        '{"status":"Failed", "statusCode":500, "errorMessage":"Error occurred while Registering a User."}'
      );
    }
    throw new Error(
      `{"status":"${err.status}", "statusCode":${err.statusCode}, "errorMessage":"${err.errorMessage}"}`
    );
  }
};

const userLogInRespository = async (data: {
  userName: string;
  password: string;
}) => {
  try {
    let userDoc = await userModel
      .findOne({ userName: data.userName })
      .populate("OMC userIFEMLocation deployedDepot primaryDepot")
      //@ts-ignore
      .cache();

    console.log(userDoc);

    if (userDoc) {
      if (bcrypt.compareSync(data.password, userDoc.password)) {
        const user = {
          userID: userDoc._id,
          userName: userDoc.userName,
          userType: userDoc.userType,
          deployedDepot: userDoc.deployedDepot,
          primaryDepot: userDoc.primaryDepot,
          OMC: userDoc.OMC,
          userIFEMLocation: userDoc.userIFEMLocation,
        };
        const token = jwt.sign(
          {
            userName: userDoc.userName,
            userType: userDoc.userType,
            _id: userDoc._id,
          },
          getSecretKey(),
          {
            expiresIn: "2h",
          }
        );

        return { user, token };
      }
      throw new Error(
        '{"status":"Auth Failed", "statusCode":401, "errorMessage":"No User Found with given Email and Password."}'
      );
    } else {
      throw new Error(
        '{"status":"User Not Found", "statusCode":404, "errorMessage":"No User found with the given credentials."}'
      );
    }
  } catch (err: any) {
    console.log(err);
    try {
      err = JSON.parse(err.message);
    } catch (err) {
      throw new Error(
        '{"status":"Failed", "statusCode":500, "errorMessage":"Error occurred while Login."}'
      );
    }
    throw new Error(
      `{"status":"${err.status}", "statusCode":${err.statusCode}, "errorMessage":"${err.errorMessage}"}`
    );
  }
};

const getUsersRespository = async (
  userRole: string,
  OMC: mongoose.Types.ObjectId
) => {
  try {
    if (userRole === "OGRA Technical Team") {
      const users = await userModel
        .find({ userType: { $ne: "OMCs Supply Managers" } })
        .select("_id userName userType OMC userIFEMLocation")
        .populate("OMC userIFEMLocation deployedDepot primaryDepot")
        .exec();

      return users;
    } else {
      const users = await userModel
        .find({ OMC })
        .select("_id userName userType OMC userIFEMLocation")
        .populate("OMC userIFEMLocation deployedDepot primaryDepot")
        .exec();

      return users;
    }
  } catch (err) {
    throw new Error(
      '{"status":"Failed", "statusCode":500, "errorMessage":"Error occurred while getting users."}'
    );
  }
};

const getUsersByTimeStampsRespository = async () => {
  try {
    let users = await userModel
      .find()
      .select("_id userName userType OMC userIFEMLocation")
      .populate("OMC userIFEMLocation deployedDepot primaryDepot")
      .sort("-createdOn")
      .exec();

    return users;
  } catch (err) {
    throw new Error(
      '{"status":"Failed", "statusCode":500, "errorMessage":"Error occurred while getting users by timestamp."}'
    );
  }
};

const userLoginByTokenAuthRespository = async (id: mongoose.Types.ObjectId) => {
  try {
    let userDoc = await userModel
      .findOne({ _id: id })
      .populate("OMC userIFEMLocation deployedDepot primaryDepot")
      .exec();

    if (userDoc) {
      const user = {
        userID: userDoc._id,
        userName: userDoc.userName,
        userType: userDoc.userType,
        deployedDepot: userDoc.deployedDepot,
        primaryDepot: userDoc.primaryDepot,
        OMC: userDoc.OMC,
        userIFEMLocation: userDoc.userIFEMLocation,
      };

      const token = jwt.sign(
        {
          userName: userDoc.userName,
          userType: userDoc.userType,
          _id: userDoc._id,
        },
        getSecretKey(),
        {
          expiresIn: "2h",
        }
      );

      return { user, token };
    } else {
      throw new Error(
        '{"status":"User Not Found", "statusCode":404, "errorMessage":"No User found with the given credentials."}'
      );
    }
  } catch (err: any) {
    try {
      err = JSON.parse(err.message);
    } catch (err) {
      throw new Error(
        '{"status":"Failed", "statusCode":500, "errorMessage":"Error occurred while login with token."}'
      );
    }
    throw new Error(
      `{"status":"${err.status}", "statusCode":${err.statusCode}, "errorMessage":"${err.errorMessage}"}`
    );
  }
};

const updateUserRespository = async (
  _id: mongoose.Types.ObjectId,
  data: Object
) => {
  try {
    let user = await userModel
      .findOneAndUpdate({ _id }, { $set: { ...data } })
      .select("_id userName userType OMC userIFEMLocation")
      .populate("OMC userIFEMLocation deployedDepot primaryDepot")
      .exec();

    if (!user) {
      throw new Error(
        '{"status":"User Not Found", "statusCode":404, "errorMessage":"No User found with the given credentials."}'
      );
    }

    return { ...user._doc, ...data };
  } catch (err: any) {
    try {
      err = JSON.parse(err.message);
    } catch (err) {
      throw new Error(
        '{"status":"Failed", "statusCode":500, "errorMessage":"Error occurred while updating user."}'
      );
    }
    throw new Error(
      `{"status":"${err.status}", "statusCode":${err.statusCode}, "errorMessage":"${err.errorMessage}"}`
    );
  }
};

const deleteUserRespository = async (_id: mongoose.Types.ObjectId) => {
  try {
    let user = await userModel
      .findOneAndDelete({ _id })
      .select("_id userName userType OMC userIFEMLocation")
      .populate("OMC userIFEMLocation deployedDepot primaryDepot")
      .exec();

    if (!user) {
      throw new Error(
        '{"status":"User Not Found", "statusCode":404, "errorMessage":"No User found with the given credentials."}'
      );
    }

    return user;
  } catch (err: any) {
    try {
      err = JSON.parse(err.message);
    } catch (err) {
      throw new Error(
        '{"status":"Failed", "statusCode":500, "errorMessage":"Error occurred while deleting a User."}'
      );
    }
    throw new Error(
      `{"status":"${err.status}", "statusCode":${err.statusCode}, "errorMessage":"${err.errorMessage}"}`
    );
  }
};

export {
  createUserRespository,
  userLogInRespository,
  getUsersRespository,
  getUsersByTimeStampsRespository,
  userLoginByTokenAuthRespository,
  updateUserRespository,
  deleteUserRespository,
};
