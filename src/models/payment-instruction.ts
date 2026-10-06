import * as s from "../core/validation/index.js";
import type { Schema } from "../core/validation/schema.js";
import { DisbursementMode, disbursementModeSchema } from "./disbursement-mode.js";
import { platformFeeSchema, type PlatformFee } from "./platform-fee.js";

/**
 * Any additional payment instructions to be consider during payment processing. This processing
 * instruction is applicable for Capturing an order or Authorizing an Order.
 */
export type PaymentInstruction = {
  /**
   * An array of various fees, commissions, tips, or donations. This field is only applicable to
   * merchants that been enabled for PayPal Complete Payments Platform for Marketplaces and
   * Platforms capability.
   */
  platformFees?: PlatformFee[];
  /** The funds that are held on behalf of the merchant. @default DisbursementMode.Instant */
  disbursementMode?: DisbursementMode;
  /**
   * This field is only enabled for selected merchants/partners to use and provides the ability to
   * trigger a specific pricing rate/plan for a payment transaction. The list of eligible
   * 'payee_pricing_tier_id' would be provided to you by your Account Manager. Specifying values
   * other than the one provided to you by your account manager would result in an error.
   */
  payeePricingTierId?: string;
  /**
   * FX identifier generated returned by PayPal to be used for payment processing in order to honor
   * FX rate (for eligible integrations) to be used when amount is settled/received into the payee
   * account.
   */
  payeeReceivableFxRateId?: string;
};

export const paymentInstructionSchema: Schema<PaymentInstruction> = s.object<PaymentInstruction>({
  platformFees: s.optional(s.array(s.lazy(() => platformFeeSchema))),
  disbursementMode: s.defaulted(disbursementModeSchema, DisbursementMode.Instant),
  payeePricingTierId: s.optional(s.string()),
  payeeReceivableFxRateId: s.optional(s.string()),
  _keysMap: {
    platformFees: "platform_fees",
    disbursementMode: "disbursement_mode",
    payeePricingTierId: "payee_pricing_tier_id",
    payeeReceivableFxRateId: "payee_receivable_fx_rate_id",
  },
});
