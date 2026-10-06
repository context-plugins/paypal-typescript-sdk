import * as s from "../core/validation/index.js";
import type { Schema } from "../core/validation/schema.js";
import { moneySchema, type Money } from "./money.js";

/** The Balance information. */
export type BalanceInformation = {
  /**
   * The [three-character ISO-4217 currency code](/docs/integration/direct/rest/currency-codes/)
   * that identifies the currency.
   */
  currency: string;
  /** Optional field representing if the currency is primary currency or not. */
  primary?: boolean;
  /** The currency and amount for a financial transaction, such as a balance or payment due. */
  totalBalance: Money;
  /** The currency and amount for a financial transaction, such as a balance or payment due. */
  availableBalance?: Money;
  /** The currency and amount for a financial transaction, such as a balance or payment due. */
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
