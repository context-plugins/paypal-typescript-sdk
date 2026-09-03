import * as s from "../core/validation/index.js";
import type { Schema } from "../core/validation/schema.js";
import { moneySchema, type Money } from "./money.js";

export type RefundPlatformFee = {
  amount: Money;
};

export const refundPlatformFeeSchema: Schema<RefundPlatformFee> = s.object<RefundPlatformFee>({
  amount: moneySchema,
});
