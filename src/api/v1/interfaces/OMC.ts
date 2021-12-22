import mongoose from "mongoose";

interface OMC {
  _id: mongoose.Schema.Types.ObjectId;
  OMCType: string;
  OMCLogo: string;
  OMCShortName: string;
  OMCName: string;
  provinceWiseROQuota: string;
  carriageContractors: mongoose.Schema.Types.ObjectId[] | string | null;
  permissions:
    | {
        pr03Dashboard: {
          createPR03: boolean;
          viewPR03: boolean;
          updatePR03: boolean;
          deletePR03: boolean;
          changeDestination: boolean;
        };
        pr03Form: {
          registerTankLorry: boolean;
          saveAndDispatchTankLorry: boolean;
          updatePR03: boolean;
        };
      }
    | string;
}

export { OMC };
