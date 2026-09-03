import * as s from "../core/validation/index.js";
import type { Schema } from "../core/validation/schema.js";
import { addressSchema, type Address } from "./address.js";
import { cardTypeSchema, type CardType } from "./card-type.js";
import {
  subscriptionsCardAttributesSchema,
  type SubscriptionsCardAttributes,
} from "./subscriptions-card-attributes.js";
import { subscriptionsCardBrandSchema, type SubscriptionsCardBrand } from "./subscriptions-card-brand.js";

export type SubscriptionCardRequest = {
  name?: string;
  number?: string;
  expiry?: string;
  securityCode?: string;
  type?: CardType;
  brand?: SubscriptionsCardBrand;
  billingAddress?: Address;
  attributes?: SubscriptionsCardAttributes;
};

export const subscriptionCardRequestSchema: Schema<SubscriptionCardRequest> =
  s.object<SubscriptionCardRequest>({
    name: s.optional(s.string()),
    number: s.optional(s.string()),
    expiry: s.optional(s.string()),
    securityCode: s.optional(s.string()),
    type: s.optional(s.lazy(() => cardTypeSchema)),
    brand: s.optional(s.lazy(() => subscriptionsCardBrandSchema)),
    billingAddress: s.optional(s.lazy(() => addressSchema)),
    attributes: s.optional(s.lazy(() => subscriptionsCardAttributesSchema)),
    _keysMap: {
      securityCode: "security_code",
      billingAddress: "billing_address",
    },
  });
