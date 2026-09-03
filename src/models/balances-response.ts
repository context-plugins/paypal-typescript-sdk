import * as s from "../core/validation/index.js";
import type { Schema } from "../core/validation/schema.js";
import { balanceInformationSchema, type BalanceInformation } from "./balance-information.js";

export type BalancesResponse = {
  balances?: BalanceInformation[];
  accountId?: string;
  asOfTime?: string;
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
