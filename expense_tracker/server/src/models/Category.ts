import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/db";

export interface CategoryInstance extends Model {
  id: string;
  name: string;
}

export const Category = sequelize.define<CategoryInstance>("Category", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});
