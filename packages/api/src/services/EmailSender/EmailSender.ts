import * as sendgrid from "@sendgrid/mail";
import {
  DEFAULT_LOGIN_OPTIONS,
  DEFAULT_SEND_OPTIONS,
  SendLoginEmailOptions,
  SendRawOptions,
} from "./types";

export default class TransactionEmailSender {
  constructor() {
    const apiKey = process.env.SENDGRID_API_KEY || "";

    if (!apiKey) {
      throw new Error(
        "Cannot start EmailSender without SENDGRID_API_KEY in environment"
      );
    } else {
      sendgrid.setApiKey(apiKey);
    }
  }

  async sendRaw(input: SendRawOptions): Promise<void> {
    const { to, from, subject, text, html } = {
      ...DEFAULT_SEND_OPTIONS,
      html: input.text.replace(/\n/g, "<br />"),
      ...input,
    };
    const payload = {
      to,
      from,
      subject,
      text,
      html,
    };
    await sendgrid.send(payload);
  }

  async sendLoginEmail(input: SendLoginEmailOptions): Promise<void> {
    const { to, from, firstName, password, link } = {
      ...DEFAULT_SEND_OPTIONS,
      ...DEFAULT_LOGIN_OPTIONS,
      ...input,
    };

    const subject = "One Time Password";

    const text = `Hello ${
      firstName ?? ""
    }! This is your first time login password to Quiddle, please reset your password after login: ${password}`;

    await this.sendRaw({
      text,
      subject,
      to,
      from,
    });
  }
}
