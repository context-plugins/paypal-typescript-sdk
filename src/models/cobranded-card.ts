import * as s from "../core/validation/index.js";
import type { Schema } from "../core/validation/schema.js";
import { moneySchema, type Money } from "./money.js";
import { payeeBaseSchema, type PayeeBase } from "./payee-base.js";

export type CobrandedCard = {
  labels?: string[];
  payee?: PayeeBase;
  amount?: Money;
};

export const cobrandedCardSchema: Schema<CobrandedCard> = s.object<CobrandedCard>({
  labels: s.optional(s.array(s.string())),
  payee: s.optional(s.lazy(() => payeeBaseSchema)),
  amount: s.optional(s.lazy(() => moneySchema)),
});
