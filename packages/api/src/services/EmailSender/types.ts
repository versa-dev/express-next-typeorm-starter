const DEFAULT_SENDER =
  process.env.DEFAULT_SENDER_EMAIL ?? "support@myquiddle.com";

const DEFAULT_LOGIN_LINK =
  process.env.DEFAULT_LOGIN_LINK ?? "localhost:3001/login";

export const DEFAULT_SEND_OPTIONS = {
  from: DEFAULT_SENDER,
};

export const DEFAULT_LOGIN_OPTIONS = {
  link: DEFAULT_LOGIN_LINK,
};

export type SenderRecipientOptions = {
  /**
   * @default {DEFAULT_SENDER}
   */
  from?: string;
  to: string;
};

export type SendRawOptions = SenderRecipientOptions & {
  subject: string;
  text: string;
  /**
   * @default converts `text` to a sensible html string (not recommended)
   */
  html?: string;
};

export type SendLoginEmailOptions = SenderRecipientOptions & {
  firstName?: string;
  /**
   * @default {DEFAULT_LOGIN_LINK}
   */
  link?: string;
  password: string;
};
