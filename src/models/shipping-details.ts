import * as s from "../core/validation/index.js";
import type { Schema } from "../core/validation/schema.js";
import { addressSchema, type Address } from "./address.js";
import { fulfillmentTypeSchema, type FulfillmentType } from "./fulfillment-type.js";
import {
  phoneNumberWithCountryCodeSchema,
  type PhoneNumberWithCountryCode,
} from "./phone-number-with-country-code.js";
import { shippingNameSchema, type ShippingName } from "./shipping-name.js";
import { shippingOptionSchema, type ShippingOption } from "./shipping-option.js";

export type ShippingDetails = {
  name?: ShippingName;
  emailAddress?: string;
  phoneNumber?: PhoneNumberWithCountryCode;
  type?: FulfillmentType;
  options?: ShippingOption[];
  address?: Address;
};

export const shippingDetailsSchema: Schema<ShippingDetails> = s.object<ShippingDetails>({
  name: s.optional(s.lazy(() => shippingNameSchema)),
  emailAddress: s.optional(s.string()),
  phoneNumber: s.optional(s.lazy(() => phoneNumberWithCountryCodeSchema)),
  type: s.optional(s.lazy(() => fulfillmentTypeSchema)),
  options: s.optional(s.array(s.lazy(() => shippingOptionSchema))),
  address: s.optional(s.lazy(() => addressSchema)),
  _keysMap: {
    emailAddress: "email_address",
    phoneNumber: "phone_number",
  },
});
