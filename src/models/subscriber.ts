import * as s from "../core/validation/index.js";
import type { Schema } from "../core/validation/schema.js";
import { nameSchema, type Name } from "./name.js";
import { shippingDetailsSchema, type ShippingDetails } from "./shipping-details.js";
import {
  subscriptionPaymentSourceResponseSchema,
  type SubscriptionPaymentSourceResponse,
} from "./subscription-payment-source-response.js";

export type Subscriber = {
  emailAddress?: string;
  payerId?: string;
  name?: Name;
  shippingAddress?: ShippingDetails;
  paymentSource?: SubscriptionPaymentSourceResponse;
};

export const subscriberSchema: Schema<Subscriber> = s.object<Subscriber>({
  emailAddress: s.optional(s.string()),
  payerId: s.optional(s.string()),
  name: s.optional(s.lazy(() => nameSchema)),
  shippingAddress: s.optional(s.lazy(() => shippingDetailsSchema)),
  paymentSource: s.optional(s.lazy(() => subscriptionPaymentSourceResponseSchema)),
  _keysMap: {
    emailAddress: "email_address",
    payerId: "payer_id",
    shippingAddress: "shipping_address",
    paymentSource: "payment_source",
  },
});
