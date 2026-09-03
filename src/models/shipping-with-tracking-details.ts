import * as s from "../core/validation/index.js";
import type { Schema } from "../core/validation/schema.js";
import { addressSchema, type Address } from "./address.js";
import { fulfillmentTypeSchema, type FulfillmentType } from "./fulfillment-type.js";
import { orderTrackerResponseSchema, type OrderTrackerResponse } from "./order-tracker-response.js";
import {
  phoneNumberWithOptionalCountryCodeSchema,
  type PhoneNumberWithOptionalCountryCode,
} from "./phone-number-with-optional-country-code.js";
import { shippingNameSchema, type ShippingName } from "./shipping-name.js";
import { shippingOptionSchema, type ShippingOption } from "./shipping-option.js";

export type ShippingWithTrackingDetails = {
  trackers?: OrderTrackerResponse[];
  name?: ShippingName;
  emailAddress?: string;
  phoneNumber?: PhoneNumberWithOptionalCountryCode;
  type?: FulfillmentType;
  options?: ShippingOption[];
  address?: Address;
};

export const shippingWithTrackingDetailsSchema: Schema<ShippingWithTrackingDetails> =
  s.object<ShippingWithTrackingDetails>({
    trackers: s.optional(s.array(s.lazy(() => orderTrackerResponseSchema))),
    name: s.optional(s.lazy(() => shippingNameSchema)),
    emailAddress: s.optional(s.string()),
    phoneNumber: s.optional(s.lazy(() => phoneNumberWithOptionalCountryCodeSchema)),
    type: s.optional(s.lazy(() => fulfillmentTypeSchema)),
    options: s.optional(s.array(s.lazy(() => shippingOptionSchema))),
    address: s.optional(s.lazy(() => addressSchema)),
    _keysMap: {
      emailAddress: "email_address",
      phoneNumber: "phone_number",
    },
  });
