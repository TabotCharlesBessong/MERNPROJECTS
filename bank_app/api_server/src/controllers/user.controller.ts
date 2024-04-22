import { Request, Response } from "express";
import UserService from "../services/user.services";

class UserController {
  private userService: UserService;

  constructor(_userService: UserService) {
    this.userService = _userService;
  }

  async register(req: Request, res: Response) {
    try {
      res.send({ message: "Register successful" });
    } catch (error) {
      res.send({ message: "Server error" });
    }
  }

  async login(req: Request, res: Response) {
    try {
      res.send({ message: "login successful" });
    } catch (error) {
      res.send({ message: "Server Error" });
    }
  }

  async forgotPassword(req: Request, res: Response) {
    try {
      res.send({ message: "forgot password successful" });
    } catch (error) {
      res.send({ message: "Server Error" });
    }
  }

  async resetPassword(req: Request, res: Response) {
    try {
      res.send({ message: "reset password successful" });
    } catch (error) {
      res.send({ message: "Server Error" });
    }
  }
}

export default UserController