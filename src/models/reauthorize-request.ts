import * as s from "../core/validation/index.js";
import type { Schema } from "../core/validation/schema.js";
import { moneySchema, type Money } from "./money.js";

export type ReauthorizeRequest = {
  amount?: Money;
};

export const reauthorizeRequestSchema: Schema<ReauthorizeRequest> = s.object<ReauthorizeRequest>({
  amount: s.optional(s.lazy(() => moneySchema)),
});
