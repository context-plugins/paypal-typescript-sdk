import * as s from "../core/validation/index.js";
import type { Schema } from "../core/validation/schema.js";
import { moneySchema, type Money } from "./money.js";
import { payeeBaseSchema, type PayeeBase } from "./payee-base.js";

/** Details about the merchant cobranded card used for order purchase. */
export type CobrandedCard = {
  /** Array of labels for the cobranded card. */
  labels?: string[];
  /**
   * The details for the merchant who receives the funds and fulfills the order. The merchant is
   * also known as the payee.
   */
  payee?: PayeeBase;
  /** The currency and amount for a financial transaction, such as a balance or payment due. */
  amount?: Money;
};

export const cobrandedCardSchema: Schema<CobrandedCard> = s.object<CobrandedCard>({
  labels: s.optional(s.array(s.string())),
  payee: s.optional(s.lazy(() => payeeBaseSchema)),
  amount: s.optional(s.lazy(() => moneySchema)),
});
