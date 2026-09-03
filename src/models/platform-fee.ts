import * as s from "../core/validation/index.js";
import type { Schema } from "../core/validation/schema.js";
import { moneySchema, type Money } from "./money.js";
import { payeeBaseSchema, type PayeeBase } from "./payee-base.js";

export type PlatformFee = {
  amount: Money;
  payee?: PayeeBase;
};

export const platformFeeSchema: Schema<PlatformFee> = s.object<PlatformFee>({
  amount: moneySchema,
  payee: s.optional(s.lazy(() => payeeBaseSchema)),
});
