import * as s from "../core/validation/index.js";
import type { Schema } from "../core/validation/schema.js";
import { nameSchema, type Name } from "./name.js";

/** The customer who approves and pays for the order. The customer is also known as the payer. */
export type SubscriptionPayer = {
  /**
   * The internationalized email address. Note: Up to 64 characters are allowed before and 255
   * characters are allowed after the \@ sign. However, the generally accepted maximum length for an
   * email address is 254 characters. The pattern verifies that an unquoted \@ sign exists.
   */
  emailAddress?: string;
  /** The account identifier for a PayPal account. */
  payerId?: string;
  /** The name of the party. */
  name?: Name;
};

export const subscriptionPayerSchema: Schema<SubscriptionPayer> = s.object<SubscriptionPayer>({
  emailAddress: s.optional(s.string()),
  payerId: s.optional(s.string()),
  name: s.optional(s.lazy(() => nameSchema)),
  _keysMap: {
    emailAddress: "email_address",
    payerId: "payer_id",
  },
});
