// src/models/User.ts
import pool from "../db";
import bcrypt from "bcrypt";

export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  created_at: Date;
}

export interface UserInput {
  name: string;
  email: string;
  password: string;
}

class UserModel {
  async create({ name, email, password }: UserInput): Promise<User> {
    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await pool.query(
      "INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *",
      [name, email, hashedPassword]
    );

    return result.rows[0];
  }

  async findByEmail(email: string): Promise<User | null> {
    const result = await pool.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);
    return result.rows[0] || null;
  }

  async findById(id: number): Promise<User | null> {
    const result = await pool.query("SELECT * FROM users WHERE id = $1", [id]);
    return result.rows[0] || null;
  }

  async validatePassword(user: User, password: string): Promise<boolean> {
    return bcrypt.compare(password, user.password);
  }
}

export default new UserModel();
