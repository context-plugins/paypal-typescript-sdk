import * as s from "../core/validation/index.js";
import type { Schema } from "../core/validation/schema.js";
import {
  PayPalPaymentTokenCustomerType,
  payPalPaymentTokenCustomerTypeSchema,
} from "./pay-pal-payment-token-customer-type.js";
import { storeInVaultInstructionSchema, type StoreInVaultInstruction } from "./store-in-vault-instruction.js";
import { usagePatternSchema, type UsagePattern } from "./usage-pattern.js";
import { usageTypeSchema, type UsageType } from "./usage-type.js";

/** Resource consolidating common request and response attributes for vaulting PayPal Wallet. */
export type PayPalWalletVaultBase = {
  /** Defines how and when the payment source gets vaulted. */
  storeInVault?: StoreInVaultInstruction;
  /**
   * The description displayed to PayPal consumer on the approval flow for PayPal, as well as on the
   * PayPal payment token management experience on PayPal.com.
   */
  description?: string;
  /** Expected business/pricing model for the billing agreement. */
  usagePattern?: UsagePattern;
  /** The usage type associated with the PayPal payment token. */
  usageType?: UsageType;
  /**
   * The customer type associated with the PayPal payment token. This is to indicate whether the
   * customer acting on the merchant / platform is either a business or a consumer.
   *
   * @default PayPalPaymentTokenCustomerType.Consumer
   */
  customerType?: PayPalPaymentTokenCustomerType;
  /**
   * Create multiple payment tokens for the same payer, merchant/platform combination. Use this when
   * the customer has not logged in at merchant/platform. The payment token thus generated, can then
   * also be used to create the customer account at merchant/platform. Use this also when multiple
   * payment tokens are required for the same payer, different customer at merchant/platform. This
   * helps to identify customers distinctly even though they may share the same PayPal account. This
   * only applies to PayPal payment source.
   *
   * @default false
   */
  permitMultiplePaymentTokens?: boolean;
};

export const payPalWalletVaultBaseSchema: Schema<PayPalWalletVaultBase> = s.object<PayPalWalletVaultBase>({
  storeInVault: s.optional(s.lazy(() => storeInVaultInstructionSchema)),
  description: s.optional(s.string()),
  usagePattern: s.optional(s.lazy(() => usagePatternSchema)),
  usageType: s.optional(s.lazy(() => usageTypeSchema)),
  customerType: s.defaulted(payPalPaymentTokenCustomerTypeSchema, PayPalPaymentTokenCustomerType.Consumer),
  permitMultiplePaymentTokens: s.defaulted(s.boolean(), false),
  _keysMap: {
    storeInVault: "store_in_vault",
    usagePattern: "usage_pattern",
    usageType: "usage_type",
    customerType: "customer_type",
    permitMultiplePaymentTokens: "permit_multiple_payment_tokens",
  },
});
