import { v4 as uuidv4 } from "uuid";
import { IPayStackPaymentObject } from "../interfaces/transaction.interface";
import axios from "axios";

class PaymentService {
  private static generatePaystackReference(): string {
    console.log("X1XXXXXXXX2-------3XXXXXXX41");
    return uuidv4();
  }

  public static async generatePaystackPaymentUrl(
    email: string,
    amount: number
  ): Promise<IPayStackPaymentObject | null> {
    console.log("X1XXXXXXXX2-------3XXXXXXX42");
    try {
      console.log("X1XXXXXXXX2-------3XXXXXXX43");
      const amountInKobo = amount * 100;
      const params = {
        email,
        amount: amountInKobo,
        channels: ["card"],
        callback_url: `${process.env.PAYSTACK_CALLBACK_URL}`,
        reference: PaymentService.generatePaystackReference(),
      };
      console.log("X1XXXXXXXX2-------3XXXXXXX44");
      const config = {
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.post(
        "https://api.paystack.co/transaction/initialize",
        params,
        config
      );
      if (data && data.status) return data.data;
      return null;
    } catch (error) {
      return null;
    }
  }
}

export default PaymentService;
