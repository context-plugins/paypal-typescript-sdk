import * as s from "../core/validation/index.js";
import type { Schema } from "../core/validation/schema.js";
import { moneySchema, type Money } from "./money.js";
import {
  refundPaymentInstructionSchema,
  type RefundPaymentInstruction,
} from "./refund-payment-instruction.js";

export type RefundRequest = {
  amount?: Money;
  customId?: string;
  invoiceId?: string;
  noteToPayer?: string;
  paymentInstruction?: RefundPaymentInstruction;
};

export const refundRequestSchema: Schema<RefundRequest> = s.object<RefundRequest>({
  amount: s.optional(s.lazy(() => moneySchema)),
  customId: s.optional(s.string()),
  invoiceId: s.optional(s.string()),
  noteToPayer: s.optional(s.string()),
  paymentInstruction: s.optional(s.lazy(() => refundPaymentInstructionSchema)),
  _keysMap: {
    customId: "custom_id",
    invoiceId: "invoice_id",
    noteToPayer: "note_to_payer",
    paymentInstruction: "payment_instruction",
  },
});
