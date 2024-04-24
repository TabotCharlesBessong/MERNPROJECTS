import AccountModel from "../models/account.model";
import TokenModel from "../models/token.model";
import UserModel from "../models/user.model";
import Db from "./index";

const DbInitialize = async () => {
  try {
    await Db.authenticate();
    UserModel.sync({ alter: false });
    TokenModel.sync({ alter: false });
    AccountModel.sync({ alter: false });
  } catch (error) {
    console.log("Unable to connect our database", error);
  }
};

export default DbInitialize;
