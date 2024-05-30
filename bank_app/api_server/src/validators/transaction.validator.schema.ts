import * as yup from "yup"
import { BANKCODES } from "../interfaces/enum/payee-enum"

const initiatePaystackDeposit = yup.object({
  amount:yup.number().required(),
  accountId:yup.string().trim().required()
})

const verifyPaystackDeposit = yup.object({
  reference:yup.string().trim().required()
})

const makeInternalTransferSchema = yup.object({
  senderAccountId:yup.string().trim().required(),
  receiverAccountNumber:yup.string().trim().required(),
  amount:yup.number().required()
})

const makeWithdrawalByPaystack = yup.object({
  senderAccountId:yup.string().trim().required(),
  senderAccountNumber:yup.string().trim().required(),
  senderAccountName:yup.string().trim().required(),
  bankCode:yup.string().trim().required().oneOf(BANKCODES),
  message:yup.string().trim().required(),
  amount:yup.number().required()
})

const ValidationSchema = {
  initiatePaystackDeposit,
  verifyPaystackDeposit,
  makeInternalTransferSchema,
  makeWithdrawalByPaystack
}

export default ValidationSchema