import * as s from "../core/validation/index.js";
import type { EnumSchema } from "../core/validation/schema.js";

export const PaymentTokenStatus = {
  Created: "CREATED",
  PayerActionRequired: "PAYER_ACTION_REQUIRED",
  Approved: "APPROVED",
  Vaulted: "VAULTED",
  Tokenized: "TOKENIZED",
} as const;
export type PaymentTokenStatus = (typeof PaymentTokenStatus)[keyof typeof PaymentTokenStatus] | (string & {});

export const paymentTokenStatusSchema: EnumSchema<PaymentTokenStatus> =
  s.enumOf<PaymentTokenStatus>(PaymentTokenStatus);
