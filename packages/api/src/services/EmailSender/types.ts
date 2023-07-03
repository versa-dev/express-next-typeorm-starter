const DEFAULT_SENDER =
  process.env.DEFAULT_SENDER_EMAIL ?? "support@myquiddle.com";

export const DEFAULT_SEND_OPTIONS = {
  from: DEFAULT_SENDER,
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
  password: string;
  link: string;
};
