import * as s from "../core/validation/index.js";
import type { Schema } from "../core/validation/schema.js";
import { moneySchema, type Money } from "./money.js";

export type BalanceInformation = {
  currency: string;
  primary?: boolean;
  totalBalance: Money;
  availableBalance?: Money;
  withheldBalance?: Money;
};

export const balanceInformationSchema: Schema<BalanceInformation> = s.object<BalanceInformation>({
  currency: s.string(),
  primary: s.optional(s.boolean()),
  totalBalance: moneySchema,
  availableBalance: s.optional(s.lazy(() => moneySchema)),
  withheldBalance: s.optional(s.lazy(() => moneySchema)),
  _keysMap: {
    totalBalance: "total_balance",
    availableBalance: "available_balance",
    withheldBalance: "withheld_balance",
  },
});
