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
import { planSchema, type Plan } from "./plan.js";
import { usagePatternSchema, type UsagePattern } from "./usage-pattern.js";
import { vaultExperienceContextSchema, type VaultExperienceContext } from "./vault-experience-context.js";
import {
  vaultedDigitalWalletShippingDetailsSchema,
  type VaultedDigitalWalletShippingDetails,
} from "./vaulted-digital-wallet-shipping-details.js";

/** A resource representing a request to vault PayPal Wallet. */
export type VaultPayPalWalletRequest = {
  /**
   * The description displayed to the consumer on the approval flow for a digital wallet, as well as
   * on the merchant view of the payment token management experience. exp: PayPal.com.
   */
  description?: string;
  /** Expected business/charge model for the billing agreement. */
  usagePattern?: UsagePattern;
  /** The shipping details. */
  shipping?: VaultedDigitalWalletShippingDetails;
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
  /** The usage type associated with a digital wallet payment token. */
  usageType?: PayPalPaymentTokenUsageType;
  /**
   * The customer type associated with a digital wallet payment token. This is to indicate whether
   * the customer acting on the merchant / platform is either a business or a consumer.
   */
  customerType?: PayPalPaymentTokenCustomerType;
  /** The merchant level Recurring Billing plan metadata for the Billing Agreement. */
  billingPlan?: Plan;
  /** A resource representing an experience context of vault PayPal Wallet. */
  experienceContext?: VaultExperienceContext;
};

export const vaultPayPalWalletRequestSchema: Schema<VaultPayPalWalletRequest> =
  s.object<VaultPayPalWalletRequest>({
    description: s.optional(s.string()),
    usagePattern: s.optional(s.lazy(() => usagePatternSchema)),
    shipping: s.optional(s.lazy(() => vaultedDigitalWalletShippingDetailsSchema)),
    permitMultiplePaymentTokens: s.defaulted(s.boolean(), false),
    usageType: s.optional(s.lazy(() => payPalPaymentTokenUsageTypeSchema)),
    customerType: s.optional(s.lazy(() => payPalPaymentTokenCustomerTypeSchema)),
    billingPlan: s.optional(s.lazy(() => planSchema)),
    experienceContext: s.optional(s.lazy(() => vaultExperienceContextSchema)),
    _keysMap: {
      usagePattern: "usage_pattern",
      permitMultiplePaymentTokens: "permit_multiple_payment_tokens",
      usageType: "usage_type",
      customerType: "customer_type",
      billingPlan: "billing_plan",
      experienceContext: "experience_context",
    },
  });
