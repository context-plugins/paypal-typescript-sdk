import * as s from "../core/validation/index.js";
import type { EnumSchema } from "../core/validation/schema.js";

/** The status of the payment token. */
export const PaymentTokenStatus = {
  /**
   * A setup token is initialized with minimal information, more data must be added to the
   * setup-token to be vaulted
   */
  Created: "CREATED",
  /** A contingency on payer approval is required before the payment method can be saved. */
  PayerActionRequired: "PAYER_ACTION_REQUIRED",
  /**
   * Setup token is ready to be vaulted. If a buyer approval contigency was returned, it is has been
   * approved.
   */
  Approved: "APPROVED",
  /** The payment token has been vaulted. */
  Vaulted: "VAULTED",
  /** A vaulted payment method token has been tokenized for short term (one time) use. */
  Tokenized: "TOKENIZED",
} as const;
export type PaymentTokenStatus = (typeof PaymentTokenStatus)[keyof typeof PaymentTokenStatus] | (string & {});

export const paymentTokenStatusSchema: EnumSchema<PaymentTokenStatus> =
  s.enumOf<PaymentTokenStatus>(PaymentTokenStatus);
