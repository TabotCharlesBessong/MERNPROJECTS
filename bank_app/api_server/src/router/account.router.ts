import express, { Request, Response } from "express"
import AccountService from "../services/account.service"
import AccountDataSource from "../datasources/account.datasource"
import AccountController from "../controllers/account.controller"
import ValidationSchema from "../validators/account.validator.schema"
import { validator } from "../middlewares/index.middlewares"

const router = express.Router()
const accountService = new AccountService(new AccountDataSource())
const accountController = new AccountController(accountService)

const createAccountRoute = () => {

  router.post("/create",validator(ValidationSchema.createAccountSchema),(req:Request,res:Response) => {
    return accountController.createAccount(req,res)
  })
  return router
}

export default createAccountRoute