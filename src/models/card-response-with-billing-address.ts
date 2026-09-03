import * as s from "../core/validation/index.js";
import type { Schema } from "../core/validation/schema.js";
import { addressSchema, type Address } from "./address.js";

export type CardResponseWithBillingAddress = {
  name?: string;
  billingAddress?: Address;
  expiry?: string;
  currencyCode?: string;
};

export const cardResponseWithBillingAddressSchema: Schema<CardResponseWithBillingAddress> =
  s.object<CardResponseWithBillingAddress>({
    name: s.optional(s.string()),
    billingAddress: s.optional(s.lazy(() => addressSchema)),
    expiry: s.optional(s.string()),
    currencyCode: s.optional(s.string()),
    _keysMap: {
      billingAddress: "billing_address",
      currencyCode: "currency_code",
    },
  });
