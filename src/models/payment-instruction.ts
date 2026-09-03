import * as s from "../core/validation/index.js";
import type { Schema } from "../core/validation/schema.js";
import { disbursementModeSchema, type DisbursementMode } from "./disbursement-mode.js";
import { platformFeeSchema, type PlatformFee } from "./platform-fee.js";

export type PaymentInstruction = {
  platformFees?: PlatformFee[];
  disbursementMode?: DisbursementMode;
  payeePricingTierId?: string;
  payeeReceivableFxRateId?: string;
};

export const paymentInstructionSchema: Schema<PaymentInstruction> = s.object<PaymentInstruction>({
  platformFees: s.optional(s.array(s.lazy(() => platformFeeSchema))),
  disbursementMode: s.optional(s.lazy(() => disbursementModeSchema)),
  payeePricingTierId: s.optional(s.string()),
  payeeReceivableFxRateId: s.optional(s.string()),
  _keysMap: {
    platformFees: "platform_fees",
    disbursementMode: "disbursement_mode",
    payeePricingTierId: "payee_pricing_tier_id",
    payeeReceivableFxRateId: "payee_receivable_fx_rate_id",
  },
});
