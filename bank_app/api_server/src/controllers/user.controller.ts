import { Request, Response } from "express";
import UserService from "../services/user.services";
import {
  AccountStatus,
  EmailStatus,
  UserRoles,
} from "../interfaces/enum/user.enum";
import { IUserCreationBody } from "../interfaces/user.interfaces";
import bcrypt from "bcrypt";
import Utility from "../utils/index.utils";
import { ResponseCode } from "../interfaces/enum/code.enum";
import JWT from "jsonwebtoken";
import TokenService from "../services/token.service";
import { IToken } from "../interfaces/token.interface";
import EmailService from "../services/email.service";

class UserController {
  private userService: UserService;
  private tokenService: TokenService;

  constructor(_userService: UserService, _tokenService: TokenService) {
    this.userService = _userService;
    this.tokenService = _tokenService;
  }

  async register(req: Request, res: Response) {
    try {
      const params = { ...req.body };
      const newUser = {
        firstname: params.firstname,
        lastname: params.lastname,
        email: params.email,
        username: params.email.split("@")[0],
        password: params.password,
        role: UserRoles.CUSTOMER,
        isEmailVerified: EmailStatus.NOT_VERIFIED,
        accountStatus: AccountStatus.ACTIVE,
      } as IUserCreationBody;
      newUser.password = bcrypt.hashSync(newUser.password, 10);
      let userExists = await this.userService.getUserByField({
        email: newUser.email,
      });
      if (userExists)
        return Utility.handleError(
          res,
          "User with email address already exists",
          ResponseCode.ALREADY_EXIST
        );

      let user = await this.userService.createUser(newUser);
      return Utility.handleSuccess(
        res,
        "User registered successfully",
        { user },
        ResponseCode.SUCCESS
      );
    } catch (error) {
      res.send({ message: "Server error" });
    }
  }

  async login(req: Request, res: Response) {
    try {
      const params = { ...req.body };
      let user = await this.userService.getUserByField({ email: params.email });
      if (!user) {
        return Utility.handleError(
          res,
          "Invalid Login Detail",
          ResponseCode.NOT_FOUND
        );
      }
      const passwordMatch = await bcrypt.compare(
        params.password,
        user.password
      );
      if (!passwordMatch) {
        return Utility.handleError(
          res,
          "Invalid login detail",
          ResponseCode.NOT_FOUND
        );
      }
      const token = JWT.sign(
        {
          firstname: user.firstname,
          lastname: user.lastname,
          id: user.id,
          email: user.email,
          role: user.role,
        },
        process.env.JWT_KEY as string,
        { expiresIn: "30d" }
      );
      return Utility.handleSuccess(
        res,
        "Login successful",
        { user, token },
        ResponseCode.SUCCESS
      );
    } catch (error) {
      return Utility.handleError(
        res,
        (error as TypeError).message,
        ResponseCode.SERVER_ERROR
      );
    }
  }

  async forgotPassword(req: Request, res: Response) {
    try {
      const params = { ...req.body };
      let user = await this.userService.getUserByField({ email: params.email });
      if (!user) {
        return Utility.handleError(
          res,
          "Account does not exist!",
          ResponseCode.NOT_FOUND
        );
      }
      const token = (await this.tokenService.createForgotPasswordToken(
        params.email
      )) as IToken;
      await EmailService.sendForgotPasswordMail(params.email,token.code)
      return Utility.handleSuccess(
        res,
        "Password reset code sent to your email",
        {token},
        ResponseCode.SUCCESS
      );
    } catch (error) {
      return Utility.handleError(
        res,
        (error as TypeError).message,
        ResponseCode.SERVER_ERROR
      );
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

export default UserController;
