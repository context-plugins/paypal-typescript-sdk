import * as s from "../core/validation/index.js";
import type { Schema } from "../core/validation/schema.js";
import {
  payPalPaymentTokenCustomerTypeSchema,
  type PayPalPaymentTokenCustomerType,
} from "./pay-pal-payment-token-customer-type.js";
import {
  payPalPaymentTokenUsageTypeSchema,
  type PayPalPaymentTokenUsageType,
} from "./pay-pal-payment-token-usage-type.js";
import { usagePatternSchema, type UsagePattern } from "./usage-pattern.js";
import {
  vaultedDigitalWalletShippingDetailsSchema,
  type VaultedDigitalWalletShippingDetails,
} from "./vaulted-digital-wallet-shipping-details.js";

export type VaultedDigitalWallet = {
  description?: string;
  usagePattern?: UsagePattern;
  shipping?: VaultedDigitalWalletShippingDetails;
  permitMultiplePaymentTokens?: boolean;
  usageType?: PayPalPaymentTokenUsageType;
  customerType?: PayPalPaymentTokenCustomerType;
};

export const vaultedDigitalWalletSchema: Schema<VaultedDigitalWallet> = s.object<VaultedDigitalWallet>({
  description: s.optional(s.string()),
  usagePattern: s.optional(s.lazy(() => usagePatternSchema)),
  shipping: s.optional(s.lazy(() => vaultedDigitalWalletShippingDetailsSchema)),
  permitMultiplePaymentTokens: s.optional(s.boolean()),
  usageType: s.optional(s.lazy(() => payPalPaymentTokenUsageTypeSchema)),
  customerType: s.optional(s.lazy(() => payPalPaymentTokenCustomerTypeSchema)),
  _keysMap: {
    usagePattern: "usage_pattern",
    permitMultiplePaymentTokens: "permit_multiple_payment_tokens",
    usageType: "usage_type",
    customerType: "customer_type",
  },
});
