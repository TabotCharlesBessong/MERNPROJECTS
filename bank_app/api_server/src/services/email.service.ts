const nodemailer = require("nodemailer");
const fs = require("fs");
const path = require("path");

const emailTemplate = path.join(`${__dirname}`, "..", "template/email.html");
const template = fs.readFileSync(emailTemplate, "utf8");

class EmailService {
  constructor() {}

  static async sendForgotPasswordMail(to: string, code: string) {
    const subject = "Forgot Password";
    const message = `Your email verification code is <b>${code}</b>`;
    return this.sendMail(to, subject, message);
  }

  private static replaceTemplateConstant(
    _template: string,
    key: string,
    data: string
  ) {
    const regex = new RegExp(key, "g");
    return _template.replace(regex, data);
  }

  private static async sendMail(to: string, subject: string, message: string) {
    const appName = process.env.APPNAME as string;
    const supportMail = process.env.VERIFICATION_EMAIL as string;
    const name = to.split("@")[0];
    let html = this.replaceTemplateConstant(template, "#APP_NAME#", appName);
    html = this.replaceTemplateConstant(html, "#NAME#", name);
    html = this.replaceTemplateConstant(html, "#MESSAGE#", message);
    html = this.replaceTemplateConstant(html, "#SUPPORT_MAIL#", supportMail);
    const transport = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.MAILTRAP_USER,
        pass: process.env.MAILTRAP_PASS,
      },
    });

    const mailOptions = {
      from: process.env.MAILTRAP_USER,
      to,
      subject,
      text: message,
      html: html,
    };

    const infoMail = await transport.sendMail(mailOptions);
    return infoMail;
  }
}

export default EmailService;
