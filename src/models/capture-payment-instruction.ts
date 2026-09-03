import * as s from "../core/validation/index.js";
import type { Schema } from "../core/validation/schema.js";
import { disbursementModeSchema, type DisbursementMode } from "./disbursement-mode.js";
import { platformFeeSchema, type PlatformFee } from "./platform-fee.js";

export type CapturePaymentInstruction = {
  platformFees?: PlatformFee[];
  disbursementMode?: DisbursementMode;
  payeeReceivableFxRateId?: string;
};

export const capturePaymentInstructionSchema: Schema<CapturePaymentInstruction> =
  s.object<CapturePaymentInstruction>({
    platformFees: s.optional(s.array(s.lazy(() => platformFeeSchema))),
    disbursementMode: s.optional(s.lazy(() => disbursementModeSchema)),
    payeeReceivableFxRateId: s.optional(s.string()),
    _keysMap: {
      platformFees: "platform_fees",
      disbursementMode: "disbursement_mode",
      payeeReceivableFxRateId: "payee_receivable_fx_rate_id",
    },
  });
