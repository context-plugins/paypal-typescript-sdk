import * as s from "../core/validation/index.js";
import type { Schema } from "../core/validation/schema.js";
import {
  cardResponseWithBillingAddressSchema,
  type CardResponseWithBillingAddress,
} from "./card-response-with-billing-address.js";

export type SubscriptionPaymentSourceResponse = {
  card?: CardResponseWithBillingAddress;
};

export const subscriptionPaymentSourceResponseSchema: Schema<SubscriptionPaymentSourceResponse> =
  s.object<SubscriptionPaymentSourceResponse>({
    card: s.optional(s.lazy(() => cardResponseWithBillingAddressSchema)),
  });
