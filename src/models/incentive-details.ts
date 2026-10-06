import * as s from "../core/validation/index.js";
import type { Schema } from "../core/validation/schema.js";
import { moneySchema, type Money } from "./money.js";

/** The incentive details. */
export type IncentiveDetails = {
  /** The type of incentive, such as a special offer or coupon. */
  incentiveType?: string;
  /** The code that identifies an incentive, such as a coupon. */
  incentiveCode?: string;
  /** The currency and amount for a financial transaction, such as a balance or payment due. */
  incentiveAmount?: Money;
  /** The incentive program code that identifies a merchant loyalty or incentive program. */
  incentiveProgramCode?: string;
};

export const incentiveDetailsSchema: Schema<IncentiveDetails> = s.object<IncentiveDetails>({
  incentiveType: s.optional(s.string()),
  incentiveCode: s.optional(s.string()),
  incentiveAmount: s.optional(s.lazy(() => moneySchema)),
  incentiveProgramCode: s.optional(s.string()),
  _keysMap: {
    incentiveType: "incentive_type",
    incentiveCode: "incentive_code",
    incentiveAmount: "incentive_amount",
    incentiveProgramCode: "incentive_program_code",
  },
});
