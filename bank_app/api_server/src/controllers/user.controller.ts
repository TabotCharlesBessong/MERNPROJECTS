import { Request, Response } from "express";
import UserService from "../services/user.services";
import { AccountStatus, EmailStatus, UserRoles } from "../interfaces/enum/user.enum";
import { IUserCreationBody } from "../interfaces/user.interfaces";
import bcrypt from "bcrypt"

class UserController {
  private userService: UserService;

  constructor(_userService: UserService) {
    this.userService = _userService;
  }

  async register(req: Request, res: Response) {
    try {
      const params = {...req.body}
      const newUser = {
        firstname: params.firstname,
        lastname: params.lastname,
        email: params.email,
        username: params.email.split("@")[0],
        password: params.password,
        role:UserRoles.CUSTOMER,
        isEmailVerified:EmailStatus.NOT_VERIFIED,
        accountStatus:AccountStatus.ACTIVE
      } as IUserCreationBody
      newUser.password = bcrypt.hashSync(newUser.password,10)
      // let userExists = await 
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