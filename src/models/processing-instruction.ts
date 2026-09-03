import * as s from "../core/validation/index.js";
import type { EnumSchema } from "../core/validation/schema.js";

export const ProcessingInstruction = {
  OrderCompleteOnPaymentApproval: "ORDER_COMPLETE_ON_PAYMENT_APPROVAL",
} as const;
export type ProcessingInstruction =
  | (typeof ProcessingInstruction)[keyof typeof ProcessingInstruction]
  | (string & {});

export const processingInstructionSchema: EnumSchema<ProcessingInstruction> =
  s.enumOf<ProcessingInstruction>(ProcessingInstruction);
