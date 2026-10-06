import * as s from "../core/validation/index.js";
import type { Schema } from "../core/validation/schema.js";
import {
  cardResponseWithBillingAddressSchema,
  type CardResponseWithBillingAddress,
} from "./card-response-with-billing-address.js";

/** The payment source used to fund the payment. */
export type SubscriptionPaymentSourceResponse = {
  /** The payment card used to fund the payment. Card can be a credit or debit card. */
  card?: CardResponseWithBillingAddress;
};

export const subscriptionPaymentSourceResponseSchema: Schema<SubscriptionPaymentSourceResponse> =
  s.object<SubscriptionPaymentSourceResponse>({
    card: s.optional(s.lazy(() => cardResponseWithBillingAddressSchema)),
  });
