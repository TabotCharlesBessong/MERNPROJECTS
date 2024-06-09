import bcrypt from "bcrypt";
import { Request, Response } from "express";
import JWT from "jsonwebtoken";
import moment from "moment";
import { autoInjectable } from "tsyringe";
import { ResponseCode } from "../interfaces/enum/code.enum";
import {
  AccountStatus,
  EmailStatus,
  UserRoles,
} from "../interfaces/enum/user.enum";
import { IToken } from "../interfaces/token.interface";
import { IUserCreationBody } from "../interfaces/user.interfaces";
import EmailService from "../services/email.service";
import TokenService from "../services/token.service";
import UserService from "../services/user.services";
import Utility from "../utils/index.utils";
import Permissions from "../permission";

@autoInjectable()
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
      await EmailService.sendForgotPasswordMail(params.email, token.code);
      return Utility.handleSuccess(
        res,
        "Password reset code sent to your email",
        { token },
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
      const params = { ...req.body };
      let isValidToken = await this.tokenService.getTokenByField({
        key: params.email,
        code: params.code,
        type: this.tokenService.TokenTypes.FORGOT_PASSWORD,
        status: this.tokenService.TokenStatus.NOTUSED,
      });

      if (!isValidToken) {
        return Utility.handleError(
          res,
          "Token has expired",
          ResponseCode.NOT_FOUND
        );
      }

      if (
        isValidToken &&
        moment(isValidToken.expires).diff(moment(), "minute") <= 0
      ) {
        return Utility.handleError(
          res,
          "Token has expired",
          ResponseCode.NOT_FOUND
        );
      }

      let user = await this.userService.getUserByField({ email: params.email });
      if (!user) {
        return Utility.handleError(
          res,
          "Invalid user records",
          ResponseCode.NOT_FOUND
        );
      }

      const _password = bcrypt.hashSync(params.password, 10);

      await this.userService.updateRecord(
        { id: user.id },
        { password: _password }
      );

      await this.tokenService.updateRecord(
        { id: isValidToken.id },
        { status: this.tokenService.TokenStatus.USED }
      );
      return Utility.handleSuccess(
        res,
        "Password reset successfully",
        {},
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

  async getAllUsersByAdmin(req: Request, res: Response) {
    try {
      const admin = { ...req.body.user };
      const permission = Permissions.can(admin.role).readAny("users");
      if (!permission.granted)
        return Utility.handleError(
          res,
          "Invalid Permission",
          ResponseCode.NOT_FOUND
        );
      let users = await this.userService.getAllUsers();
      if (users && users.length > 0) {
        users = users.map((item) => {
          item.password = "";
          return item;
        });
      }
      return Utility.handleSuccess(
        res,
        "User fetched successfully",
        { users },
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

  async getSignleUserById(req: Request, res: Response) {
    try {
      const params = { ...req.params };
      const admin = { ...req.body.user };
      const permission = Permissions.can(admin.role).readAny("users");
      if (!permission.granted)
        return Utility.handleError(
          res,
          "Invalid Permission",
          ResponseCode.NOT_FOUND
        );
      let user = await this.userService.getUserByField({
        id: Utility.escapeHtml(params.id),
      });
      if (!user)
        return Utility.handleError(
          res,
          "User does not exist",
          ResponseCode.NOT_FOUND
        );
      user.password = "";
      return Utility.handleSuccess(
        res,
        "User fetched successfully",
        { user },
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

  async setAccountStatus(req: Request, res: Response) {
    try {
      const params = { ...req.body };
      const admin = { ...req.body.user };
      const permission = Permissions.can(admin.role).updateAny("users");
      if (!permission.granted)
        return Utility.handleError(
          res,
          "Invalid Permission",
          ResponseCode.NOT_FOUND
        );
      let user = await this.userService.getUserByField({ id: params.userId });
      if (!user)
        return Utility.handleError(
          res,
          "Invalid User Record",
          ResponseCode.NOT_FOUND
        );
      await this.userService.updateRecord(
        { id: user.id },
        { accountStatus: params.status }
      );
      return Utility.handleSuccess(
        res,
        "Account status updated successful ",
        {},
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

  async getProfile(req: Request, res: Response) {
    try {
      const params = { ...req.body };
      let user = await this.userService.getUserByField({ id: params.user.id });
      if (!user)
        return Utility.handleError(
          res,
          "User does not exist",
          ResponseCode.NOT_FOUND
        );
      user.password = "";
      return Utility.handleSuccess(
        res,
        "User fetched successfully",
        { user },
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
}

export default UserController;
