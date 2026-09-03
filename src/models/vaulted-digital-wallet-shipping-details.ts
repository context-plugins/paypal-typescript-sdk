import * as s from "../core/validation/index.js";
import type { Schema } from "../core/validation/schema.js";
import { addressSchema, type Address } from "./address.js";
import { fulfillmentTypeSchema, type FulfillmentType } from "./fulfillment-type.js";
import {
  phoneNumberWithCountryCodeSchema,
  type PhoneNumberWithCountryCode,
} from "./phone-number-with-country-code.js";
import { shippingNameSchema, type ShippingName } from "./shipping-name.js";

export type VaultedDigitalWalletShippingDetails = {
  name?: ShippingName;
  emailAddress?: string;
  phoneNumber?: PhoneNumberWithCountryCode;
  type?: FulfillmentType;
  address?: Address;
};

export const vaultedDigitalWalletShippingDetailsSchema: Schema<VaultedDigitalWalletShippingDetails> =
  s.object<VaultedDigitalWalletShippingDetails>({
    name: s.optional(s.lazy(() => shippingNameSchema)),
    emailAddress: s.optional(s.string()),
    phoneNumber: s.optional(s.lazy(() => phoneNumberWithCountryCodeSchema)),
    type: s.optional(s.lazy(() => fulfillmentTypeSchema)),
    address: s.optional(s.lazy(() => addressSchema)),
    _keysMap: {
      emailAddress: "email_address",
      phoneNumber: "phone_number",
    },
  });
