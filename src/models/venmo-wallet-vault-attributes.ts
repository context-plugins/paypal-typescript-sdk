import * as s from "../core/validation/index.js";
import type { Schema } from "../core/validation/schema.js";
import { storeInVaultInstructionSchema, type StoreInVaultInstruction } from "./store-in-vault-instruction.js";
import {
  venmoPaymentTokenCustomerTypeSchema,
  type VenmoPaymentTokenCustomerType,
} from "./venmo-payment-token-customer-type.js";
import {
  venmoPaymentTokenUsagePatternSchema,
  type VenmoPaymentTokenUsagePattern,
} from "./venmo-payment-token-usage-pattern.js";
import {
  venmoPaymentTokenUsageTypeSchema,
  type VenmoPaymentTokenUsageType,
} from "./venmo-payment-token-usage-type.js";

export type VenmoWalletVaultAttributes = {
  storeInVault: StoreInVaultInstruction;
  description?: string;
  usagePattern?: VenmoPaymentTokenUsagePattern;
  usageType: VenmoPaymentTokenUsageType;
  customerType?: VenmoPaymentTokenCustomerType;
  permitMultiplePaymentTokens?: boolean;
};

export const venmoWalletVaultAttributesSchema: Schema<VenmoWalletVaultAttributes> =
  s.object<VenmoWalletVaultAttributes>({
    storeInVault: storeInVaultInstructionSchema,
    description: s.optional(s.string()),
    usagePattern: s.optional(s.lazy(() => venmoPaymentTokenUsagePatternSchema)),
    usageType: venmoPaymentTokenUsageTypeSchema,
    customerType: s.optional(s.lazy(() => venmoPaymentTokenCustomerTypeSchema)),
    permitMultiplePaymentTokens: s.optional(s.boolean()),
    _keysMap: {
      storeInVault: "store_in_vault",
      usagePattern: "usage_pattern",
      usageType: "usage_type",
      customerType: "customer_type",
      permitMultiplePaymentTokens: "permit_multiple_payment_tokens",
    },
  });
