import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/db";

export interface UserInstance extends Model {
  id: string;
  email: string;
  password: string;
  tokenVersion: number;
}

export const User = sequelize.define<UserInstance>("User", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  tokenVersion: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
});
