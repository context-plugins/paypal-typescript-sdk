import * as s from "../core/validation/index.js";
import type { Schema } from "../core/validation/schema.js";
import { moneySchema, type Money } from "./money.js";
import { payeeBaseSchema, type PayeeBase } from "./payee-base.js";

/**
 * The platform or partner fee, commission, or brokerage fee that is associated with the
 * transaction. Not a separate or isolated transaction leg from the external perspective. The
 * platform fee is limited in scope and is always associated with the original payment for the
 * purchase unit.
 */
export type PlatformFee = {
  /** The currency and amount for a financial transaction, such as a balance or payment due. */
  amount: Money;
  /**
   * The details for the merchant who receives the funds and fulfills the order. The merchant is
   * also known as the payee.
   */
  payee?: PayeeBase;
};

export const platformFeeSchema: Schema<PlatformFee> = s.object<PlatformFee>({
  amount: moneySchema,
  payee: s.optional(s.lazy(() => payeeBaseSchema)),
});
