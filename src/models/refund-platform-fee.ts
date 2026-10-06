import * as s from "../core/validation/index.js";
import type { Schema } from "../core/validation/schema.js";
import { moneySchema, type Money } from "./money.js";

/**
 * The platform or partner fee, commission, or brokerage fee that is associated with the
 * transaction. Not a separate or isolated transaction leg from the external perspective. The
 * platform fee is limited in scope and is always associated with the original payment for the
 * purchase unit.
 */
export type RefundPlatformFee = {
  /** The currency and amount for a financial transaction, such as a balance or payment due. */
  amount: Money;
};

export const refundPlatformFeeSchema: Schema<RefundPlatformFee> = s.object<RefundPlatformFee>({
  amount: moneySchema,
});
