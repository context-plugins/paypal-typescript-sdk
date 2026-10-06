import * as s from "../core/validation/index.js";
import type { Schema } from "../core/validation/schema.js";
import { balanceInformationSchema, type BalanceInformation } from "./balance-information.js";

/** The balances response information. */
export type BalancesResponse = {
  /** An array of balance detail objects. */
  balances?: BalanceInformation[];
  /**
   * The PayPal payer ID, which is a masked version of the PayPal account number intended for use
   * with third parties. The account number is reversibly encrypted and a proprietary variant of
   * Base32 is used to encode the result.
   */
  accountId?: string;
  /**
   * The date and time, in [Internet date and time
   * format](https://tools.ietf.org/html/rfc3339#section-5.6). Seconds are required while fractional
   * seconds are optional. Note: The regular expression provides guidance but does not reject all
   * invalid dates.
   */
  asOfTime?: string;
  /**
   * The date and time, in [Internet date and time
   * format](https://tools.ietf.org/html/rfc3339#section-5.6). Seconds are required while fractional
   * seconds are optional. Note: The regular expression provides guidance but does not reject all
   * invalid dates.
   */
  lastRefreshTime?: string;
};

export const balancesResponseSchema: Schema<BalancesResponse> = s.object<BalancesResponse>({
  balances: s.optional(s.array(s.lazy(() => balanceInformationSchema))),
  accountId: s.optional(s.string()),
  asOfTime: s.optional(s.string()),
  lastRefreshTime: s.optional(s.string()),
  _keysMap: {
    accountId: "account_id",
    asOfTime: "as_of_time",
    lastRefreshTime: "last_refresh_time",
  },
});
