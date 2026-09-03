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
import { storeInVaultInstructionSchema, type StoreInVaultInstruction } from "./store-in-vault-instruction.js";
import { usagePatternSchema, type UsagePattern } from "./usage-pattern.js";

export type PayPalWalletVaultInstruction = {
  storeInVault?: StoreInVaultInstruction;
  description?: string;
  usagePattern?: UsagePattern;
  usageType: PayPalPaymentTokenUsageType;
  customerType?: PayPalPaymentTokenCustomerType;
  permitMultiplePaymentTokens?: boolean;
};

export const payPalWalletVaultInstructionSchema: Schema<PayPalWalletVaultInstruction> =
  s.object<PayPalWalletVaultInstruction>({
    storeInVault: s.optional(s.lazy(() => storeInVaultInstructionSchema)),
    description: s.optional(s.string()),
    usagePattern: s.optional(s.lazy(() => usagePatternSchema)),
    usageType: payPalPaymentTokenUsageTypeSchema,
    customerType: s.optional(s.lazy(() => payPalPaymentTokenCustomerTypeSchema)),
    permitMultiplePaymentTokens: s.optional(s.boolean()),
    _keysMap: {
      storeInVault: "store_in_vault",
      usagePattern: "usage_pattern",
      usageType: "usage_type",
      customerType: "customer_type",
      permitMultiplePaymentTokens: "permit_multiple_payment_tokens",
    },
  });
