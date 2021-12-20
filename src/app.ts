import express from "express";
import * as dotenv from "dotenv";
import connect from "./config/dataBaseConfig";
import cors from "cors";
import morgan from "morgan";
import cluster from "cluster";
import "./config/mongooseExecute";

import omcRoutes from "./api/v1/routes/omcs.routes";
import ifemRoutes from "./api/v1/routes/ifemLocation.routes";
import allowedDepotRoutes from "./api/v1/routes/allowedDepots.routes";
import citiesRoutes from "./api/v1/routes/cities.routes";
import userRoutes from "./api/v1/routes/users.routes";
import depotsRoutes from "./api/v1/routes/depots.routes";
import driversRoutes from "./api/v1/routes/drivers.routes";
import omcVehicleHistoryRoutes from "./api/v1/routes/omcVehicleHistory.routes";
import vehiclesRoutes from "./api/v1/routes/vehicles.routes";
import dispatchRoutes from "./api/v1/routes/dispatch.routes";
import carriageContractorRoutes from "./api/v1/routes/carriageContractor.routes";

const PORT = process.env.PORT || 5000;
dotenv.config();

const uri =
  typeof process.env.dbURI === "string" ? process.env.dbURI : "NO URI Found";

connect(uri);

if (cluster.isPrimary) {
  cluster.fork();
  cluster.fork();
  cluster.fork();
  cluster.fork();
} else {
  const app = express();

  app.use(cors());
  app.use(morgan("dev"));
  app.use(express.urlencoded({ extended: false }));
  app.use(express.json());

  app.use("/carriagecontractors", carriageContractorRoutes);
  app.use("/dispatches", dispatchRoutes);
  app.use("/vehicles", vehiclesRoutes);
  app.use("/history", omcVehicleHistoryRoutes);
  app.use("/drivers", driversRoutes);
  app.use("/depots", depotsRoutes);
  app.use("/cities", citiesRoutes);
  app.use("/alloweddepots", allowedDepotRoutes);
  app.use("/ifems", ifemRoutes);
  app.use("/omcs", omcRoutes);
  app.use("/users", userRoutes);

  app.listen(PORT, () => {
    console.log(`Listening on port : ${PORT}`);
  });
}
