import * as s from "../core/validation/index.js";
import type { Schema } from "../core/validation/schema.js";
import { DisbursementMode, disbursementModeSchema } from "./disbursement-mode.js";
import { platformFeeSchema, type PlatformFee } from "./platform-fee.js";

/**
 * Any additional payment instructions to be consider during payment processing. This processing
 * instruction is applicable for Capturing an order or Authorizing an Order.
 */
export type CapturePaymentInstruction = {
  /**
   * An array of platform or partner fees, commissions, or brokerage fees that associated with the
   * captured payment.
   */
  platformFees?: PlatformFee[];
  /** The funds that are held on behalf of the merchant. @default DisbursementMode.Instant */
  disbursementMode?: DisbursementMode;
  /**
   * FX identifier generated returned by PayPal to be used for payment processing in order to honor
   * FX rate (for eligible integrations) to be used when amount is settled/received into the payee
   * account.
   */
  payeeReceivableFxRateId?: string;
};

export const capturePaymentInstructionSchema: Schema<CapturePaymentInstruction> =
  s.object<CapturePaymentInstruction>({
    platformFees: s.optional(s.array(s.lazy(() => platformFeeSchema))),
    disbursementMode: s.defaulted(disbursementModeSchema, DisbursementMode.Instant),
    payeeReceivableFxRateId: s.optional(s.string()),
    _keysMap: {
      platformFees: "platform_fees",
      disbursementMode: "disbursement_mode",
      payeeReceivableFxRateId: "payee_receivable_fx_rate_id",
    },
  });
