import * as s from "../core/validation/index.js";
import type { Schema } from "../core/validation/schema.js";
import {
  capturePaymentInstructionSchema,
  type CapturePaymentInstruction,
} from "./capture-payment-instruction.js";
import { moneySchema, type Money } from "./money.js";

export type CaptureRequest = {
  amount?: Money;
  invoiceId?: string;
  finalCapture?: boolean;
  paymentInstruction?: CapturePaymentInstruction;
  noteToPayer?: string;
  softDescriptor?: string;
};

export const captureRequestSchema: Schema<CaptureRequest> = s.object<CaptureRequest>({
  amount: s.optional(s.lazy(() => moneySchema)),
  invoiceId: s.optional(s.string()),
  finalCapture: s.optional(s.boolean()),
  paymentInstruction: s.optional(s.lazy(() => capturePaymentInstructionSchema)),
  noteToPayer: s.optional(s.string()),
  softDescriptor: s.optional(s.string()),
  _keysMap: {
    invoiceId: "invoice_id",
    finalCapture: "final_capture",
    paymentInstruction: "payment_instruction",
    noteToPayer: "note_to_payer",
    softDescriptor: "soft_descriptor",
  },
});
