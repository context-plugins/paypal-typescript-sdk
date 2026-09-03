import * as s from "../core/validation/index.js";
import type { Schema } from "../core/validation/schema.js";
import {
  payPalPaymentTokenCustomerTypeSchema,
  type PayPalPaymentTokenCustomerType,
} from "./pay-pal-payment-token-customer-type.js";
import { storeInVaultInstructionSchema, type StoreInVaultInstruction } from "./store-in-vault-instruction.js";
import { usagePatternSchema, type UsagePattern } from "./usage-pattern.js";
import { usageTypeSchema, type UsageType } from "./usage-type.js";

export type PayPalWalletVaultBase = {
  storeInVault?: StoreInVaultInstruction;
  description?: string;
  usagePattern?: UsagePattern;
  usageType?: UsageType;
  customerType?: PayPalPaymentTokenCustomerType;
  permitMultiplePaymentTokens?: boolean;
};

export const payPalWalletVaultBaseSchema: Schema<PayPalWalletVaultBase> = s.object<PayPalWalletVaultBase>({
  storeInVault: s.optional(s.lazy(() => storeInVaultInstructionSchema)),
  description: s.optional(s.string()),
  usagePattern: s.optional(s.lazy(() => usagePatternSchema)),
  usageType: s.optional(s.lazy(() => usageTypeSchema)),
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
