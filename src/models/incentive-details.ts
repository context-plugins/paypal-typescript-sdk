import * as s from "../core/validation/index.js";
import type { Schema } from "../core/validation/schema.js";
import { moneySchema, type Money } from "./money.js";

export type IncentiveDetails = {
  incentiveType?: string;
  incentiveCode?: string;
  incentiveAmount?: Money;
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
