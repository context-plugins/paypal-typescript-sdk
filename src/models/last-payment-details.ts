import * as s from "../core/validation/index.js";
import type { Schema } from "../core/validation/schema.js";
import { moneySchema, type Money } from "./money.js";

export type LastPaymentDetails = {
  amount?: Money;
  time?: string;
};

export const lastPaymentDetailsSchema: Schema<LastPaymentDetails> = s.object<LastPaymentDetails>({
  amount: s.optional(s.lazy(() => moneySchema)),
  time: s.optional(s.string()),
});
