// src/models/Category.ts
import pool from "../db";

export interface Category {
  id: number;
  name: string;
  user_id: number;
  created_at: Date;
}

export interface CategoryInput {
  name: string;
  user_id: number;
}

class CategoryModel {
  async create({ name, user_id }: CategoryInput): Promise<Category> {
    const result = await pool.query(
      "INSERT INTO categories (name, user_id) VALUES ($1, $2) RETURNING *",
      [name, user_id]
    );

    return result.rows[0];
  }

  async findById(id: number): Promise<Category | null> {
    const result = await pool.query("SELECT * FROM categories WHERE id = $1", [
      id,
    ]);
    return result.rows[0] || null;
  }

  async findByUser(userId: number): Promise<Category[]> {
    const result = await pool.query(
      "SELECT * FROM categories WHERE user_id = $1",
      [userId]
    );
    return result.rows;
  }

  async update(id: number, name: string): Promise<Category | null> {
    const result = await pool.query(
      "UPDATE categories SET name = $1 WHERE id = $2 RETURNING *",
      [name, id]
    );
    return result.rows[0] || null;
  }

  async delete(id: number): Promise<boolean> {
    const result = await pool.query(
      "DELETE FROM categories WHERE id = $1 RETURNING id",
      [id]
    );
    return !!result.rows[0];
  }
}

export default new CategoryModel();
