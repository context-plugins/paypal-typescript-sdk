import * as s from "../core/validation/index.js";
import type { Schema } from "../core/validation/schema.js";
import { nameSchema, type Name } from "./name.js";
import { phoneWithTypeSchema, type PhoneWithType } from "./phone-with-type.js";
import { shippingDetailsSchema, type ShippingDetails } from "./shipping-details.js";
import {
  subscriptionPaymentSourceSchema,
  type SubscriptionPaymentSource,
} from "./subscription-payment-source.js";

export type SubscriberRequest = {
  emailAddress?: string;
  payerId?: string;
  name?: Name;
  shippingAddress?: ShippingDetails;
  paymentSource?: SubscriptionPaymentSource;
  phone?: PhoneWithType;
};

export const subscriberRequestSchema: Schema<SubscriberRequest> = s.object<SubscriberRequest>({
  emailAddress: s.optional(s.string()),
  payerId: s.optional(s.string()),
  name: s.optional(s.lazy(() => nameSchema)),
  shippingAddress: s.optional(s.lazy(() => shippingDetailsSchema)),
  paymentSource: s.optional(s.lazy(() => subscriptionPaymentSourceSchema)),
  phone: s.optional(s.lazy(() => phoneWithTypeSchema)),
  _keysMap: {
    emailAddress: "email_address",
    payerId: "payer_id",
    shippingAddress: "shipping_address",
    paymentSource: "payment_source",
  },
});
