// src/models/Expense.ts
import pool from "../db";

export interface Expense {
  id: number;
  amount: number;
  description: string;
  date: Date;
  user_id: number;
  category_id: number | null;
  created_at: Date;
}

export interface ExpenseInput {
  amount: number;
  description: string;
  date: Date;
  user_id: number;
  category_id?: number | null;
}

export interface ExpenseFilters {
  startDate?: Date;
  endDate?: Date;
  categoryId?: number;
  minAmount?: number;
  maxAmount?: number;
}

class ExpenseModel {
  async create({
    amount,
    description,
    date,
    user_id,
    category_id,
  }: ExpenseInput): Promise<Expense> {
    const result = await pool.query(
      "INSERT INTO expenses (amount, description, date, user_id, category_id) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [amount, description, date, user_id, category_id || null]
    );

    return result.rows[0];
  }

  async findById(id: number): Promise<Expense | null> {
    const result = await pool.query("SELECT * FROM expenses WHERE id = $1", [
      id,
    ]);
    return result.rows[0] || null;
  }

  async findByUser(
    userId: number,
    filters?: ExpenseFilters
  ): Promise<Expense[]> {
    let query = "SELECT * FROM expenses WHERE user_id = $1";
    const queryParams: any[] = [userId];
    let paramIndex = 2;

    if (filters) {
      if (filters.startDate) {
        query += ` AND date >= $${paramIndex}`;
        queryParams.push(filters.startDate);
        paramIndex++;
      }

      if (filters.endDate) {
        query += ` AND date <= $${paramIndex}`;
        queryParams.push(filters.endDate);
        paramIndex++;
      }

      if (filters.categoryId) {
        query += ` AND category_id = $${paramIndex}`;
        queryParams.push(filters.categoryId);
        paramIndex++;
      }

      if (filters.minAmount !== undefined) {
        query += ` AND amount >= $${paramIndex}`;
        queryParams.push(filters.minAmount);
        paramIndex++;
      }

      if (filters.maxAmount !== undefined) {
        query += ` AND amount <= $${paramIndex}`;
        queryParams.push(filters.maxAmount);
        paramIndex++;
      }
    }

    query += " ORDER BY date DESC";

    const result = await pool.query(query, queryParams);
    return result.rows;
  }

  async update(
    id: number,
    expenseData: Partial<ExpenseInput>
  ): Promise<Expense | null> {
    const expense = await this.findById(id);

    if (!expense) {
      return null;
    }

    const { amount, description, date, category_id } = {
      ...expense,
      ...expenseData,
    };

    const result = await pool.query(
      "UPDATE expenses SET amount = $1, description = $2, date = $3, category_id = $4 WHERE id = $5 RETURNING *",
      [amount, description, date, category_id, id]
    );

    return result.rows[0] || null;
  }

  async delete(id: number): Promise<boolean> {
    const result = await pool.query(
      "DELETE FROM expenses WHERE id = $1 RETURNING id",
      [id]
    );
    return !!result.rows[0];
  }

  async getTotal(userId: number, filters?: ExpenseFilters): Promise<number> {
    let query = "SELECT SUM(amount) as total FROM expenses WHERE user_id = $1";
    const queryParams: any[] = [userId];
    let paramIndex = 2;

    if (filters) {
      if (filters.startDate) {
        query += ` AND date >= $${paramIndex}`;
        queryParams.push(filters.startDate);
        paramIndex++;
      }

      if (filters.endDate) {
        query += ` AND date <= $${paramIndex}`;
        queryParams.push(filters.endDate);
        paramIndex++;
      }

      if (filters.categoryId) {
        query += ` AND category_id = $${paramIndex}`;
        queryParams.push(filters.categoryId);
        paramIndex++;
      }
    }

    const result = await pool.query(query, queryParams);
    return parseFloat(result.rows[0].total) || 0;
  }

  async getByCategory(
    userId: number
  ): Promise<{ category_id: number; total: number }[]> {
    const query = `
      SELECT category_id, SUM(amount) as total 
      FROM expenses 
      WHERE user_id = $1 
      GROUP BY category_id
    `;

    const result = await pool.query(query, [userId]);
    return result.rows;
  }
}

export default new ExpenseModel();
