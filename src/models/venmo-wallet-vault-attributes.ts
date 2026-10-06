import * as s from "../core/validation/index.js";
import type { Schema } from "../core/validation/schema.js";
import { storeInVaultInstructionSchema, type StoreInVaultInstruction } from "./store-in-vault-instruction.js";
import {
  VenmoPaymentTokenCustomerType,
  venmoPaymentTokenCustomerTypeSchema,
} from "./venmo-payment-token-customer-type.js";
import {
  venmoPaymentTokenUsagePatternSchema,
  type VenmoPaymentTokenUsagePattern,
} from "./venmo-payment-token-usage-pattern.js";
import {
  venmoPaymentTokenUsageTypeSchema,
  type VenmoPaymentTokenUsageType,
} from "./venmo-payment-token-usage-type.js";

/** Resource consolidating common request and response attirbutes for vaulting Venmo Wallet. */
export type VenmoWalletVaultAttributes = {
  /** Defines how and when the payment source gets vaulted. */
  storeInVault: StoreInVaultInstruction;
  /**
   * The description displayed to Venmo consumer on the approval flow for Venmo, as well as on the
   * Venmo payment token management experience on Venmo.com.
   */
  description?: string;
  /** Expected business/pricing model for the billing agreement. */
  usagePattern?: VenmoPaymentTokenUsagePattern;
  /** The usage type associated with the Venmo payment token. */
  usageType: VenmoPaymentTokenUsageType;
  /**
   * The customer type associated with the Venmo payment token. This is to indicate whether the
   * customer acting on the merchant / platform is either a business or a consumer.
   *
   * @default VenmoPaymentTokenCustomerType.Consumer
   */
  customerType?: VenmoPaymentTokenCustomerType;
  /**
   * Create multiple payment tokens for the same payer, merchant/platform combination. Use this when
   * the customer has not logged in at merchant/platform. The payment token thus generated, can then
   * also be used to create the customer account at merchant/platform. Use this also when multiple
   * payment tokens are required for the same payer, different customer at merchant/platform. This
   * helps to identify customers distinctly even though they may share the same Venmo account.
   *
   * @default false
   */
  permitMultiplePaymentTokens?: boolean;
};

export const venmoWalletVaultAttributesSchema: Schema<VenmoWalletVaultAttributes> =
  s.object<VenmoWalletVaultAttributes>({
    storeInVault: storeInVaultInstructionSchema,
    description: s.optional(s.string()),
    usagePattern: s.optional(s.lazy(() => venmoPaymentTokenUsagePatternSchema)),
    usageType: venmoPaymentTokenUsageTypeSchema,
    customerType: s.defaulted(venmoPaymentTokenCustomerTypeSchema, VenmoPaymentTokenCustomerType.Consumer),
    permitMultiplePaymentTokens: s.defaulted(s.boolean(), false),
    _keysMap: {
      storeInVault: "store_in_vault",
      usagePattern: "usage_pattern",
      usageType: "usage_type",
      customerType: "customer_type",
      permitMultiplePaymentTokens: "permit_multiple_payment_tokens",
    },
  });
