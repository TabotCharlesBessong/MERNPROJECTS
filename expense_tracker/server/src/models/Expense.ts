import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/db";
import { User } from "./User";
import { Category } from "./Category";

export interface ExpenseInstance extends Model {
  id: string;
  title: string;
  amount: number;
  date: Date;
  userId: string;
  categoryId: string;
}

export const Expense = sequelize.define<ExpenseInstance>("Expense", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  title: DataTypes.STRING,
  amount: DataTypes.FLOAT,
  date: DataTypes.DATE,
});

User.hasMany(Expense, { foreignKey: "userId" });
Expense.belongsTo(User, { foreignKey: "userId" });

Category.hasMany(Expense, { foreignKey: "categoryId" });
Expense.belongsTo(Category, { foreignKey: "categoryId" });
