import * as s from "../core/validation/index.js";
import type { Schema } from "../core/validation/schema.js";
import { addressSchema, type Address } from "./address.js";
import { nameSchema, type Name } from "./name.js";
import {
  payPalPaymentTokenCustomerTypeSchema,
  type PayPalPaymentTokenCustomerType,
} from "./pay-pal-payment-token-customer-type.js";
import {
  payPalPaymentTokenUsageTypeSchema,
  type PayPalPaymentTokenUsageType,
} from "./pay-pal-payment-token-usage-type.js";
import { phoneWithTypeSchema, type PhoneWithType } from "./phone-with-type.js";
import { usagePatternSchema, type UsagePattern } from "./usage-pattern.js";
import {
  vaultedDigitalWalletShippingDetailsSchema,
  type VaultedDigitalWalletShippingDetails,
} from "./vaulted-digital-wallet-shipping-details.js";

export type VenmoPaymentToken = {
  description?: string;
  usagePattern?: UsagePattern;
  shipping?: VaultedDigitalWalletShippingDetails;
  permitMultiplePaymentTokens?: boolean;
  usageType?: PayPalPaymentTokenUsageType;
  customerType?: PayPalPaymentTokenCustomerType;
  emailAddress?: string;
  payerId?: string;
  name?: Name;
  phone?: PhoneWithType;
  address?: Address;
  userName?: string;
};

export const venmoPaymentTokenSchema: Schema<VenmoPaymentToken> = s.object<VenmoPaymentToken>({
  description: s.optional(s.string()),
  usagePattern: s.optional(s.lazy(() => usagePatternSchema)),
  shipping: s.optional(s.lazy(() => vaultedDigitalWalletShippingDetailsSchema)),
  permitMultiplePaymentTokens: s.optional(s.boolean()),
  usageType: s.optional(s.lazy(() => payPalPaymentTokenUsageTypeSchema)),
  customerType: s.optional(s.lazy(() => payPalPaymentTokenCustomerTypeSchema)),
  emailAddress: s.optional(s.string()),
  payerId: s.optional(s.string()),
  name: s.optional(s.lazy(() => nameSchema)),
  phone: s.optional(s.lazy(() => phoneWithTypeSchema)),
  address: s.optional(s.lazy(() => addressSchema)),
  userName: s.optional(s.string()),
  _keysMap: {
    usagePattern: "usage_pattern",
    permitMultiplePaymentTokens: "permit_multiple_payment_tokens",
    usageType: "usage_type",
    customerType: "customer_type",
    emailAddress: "email_address",
    payerId: "payer_id",
    userName: "user_name",
  },
});
