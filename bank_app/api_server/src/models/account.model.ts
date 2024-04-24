import Db from "../database";
import { DataTypes } from "sequelize";
import { v4 as uuidv4 } from "uuid";
import { IAccountModel } from "../interfaces/account.interface";

const AccountModel = Db.define<IAccountModel>(
  "AccountModel",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: () => uuidv4(),
      allowNull: false,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    accountNumber: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    balance: {
      type: DataTypes.DECIMAL(30, 2),
      defaultValue: 0.0,
      allowNull: false,
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      allowNull: false,
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      allowNull: false,
    },
  },
  {
    timestamps: true,
    tableName: "accounts",
    createdAt: "createdAt",
    updatedAt: "updatedAt",
  }
);

export default AccountModel;
