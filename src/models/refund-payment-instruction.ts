import * as s from "../core/validation/index.js";
import type { Schema } from "../core/validation/schema.js";
import { refundPlatformFeeSchema, type RefundPlatformFee } from "./refund-platform-fee.js";

export type RefundPaymentInstruction = {
  platformFees?: RefundPlatformFee[];
};

export const refundPaymentInstructionSchema: Schema<RefundPaymentInstruction> =
  s.object<RefundPaymentInstruction>({
    platformFees: s.optional(s.array(s.lazy(() => refundPlatformFeeSchema))),
    _keysMap: {
      platformFees: "platform_fees",
    },
  });
