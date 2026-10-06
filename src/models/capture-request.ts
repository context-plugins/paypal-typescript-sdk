import * as s from "../core/validation/index.js";
import type { Schema } from "../core/validation/schema.js";
import {
  capturePaymentInstructionSchema,
  type CapturePaymentInstruction,
} from "./capture-payment-instruction.js";
import { moneySchema, type Money } from "./money.js";

/** Captures either a portion or the full authorized amount of an authorized payment. */
export type CaptureRequest = {
  /** The currency and amount for a financial transaction, such as a balance or payment due. */
  amount?: Money;
  /**
   * The API caller-provided external invoice number for this order. Appears in both the payer's
   * transaction history and the emails that the payer receives.
   */
  invoiceId?: string;
  /**
   * Indicates whether you can make additional captures against the authorized payment. Set to
   * `true` if you do not intend to capture additional payments against the authorization. Set to
   * `false` if you intend to capture additional payments against the authorization.
   *
   * @default false
   */
  finalCapture?: boolean;
  /**
   * Any additional payment instructions to be consider during payment processing. This processing
   * instruction is applicable for Capturing an order or Authorizing an Order.
   */
  paymentInstruction?: CapturePaymentInstruction;
  /**
   * An informational note about this settlement. Appears in both the payer's transaction history
   * and the emails that the payer receives.
   */
  noteToPayer?: string;
  /** The payment descriptor on the payer's account statement. */
  softDescriptor?: string;
};

export const captureRequestSchema: Schema<CaptureRequest> = s.object<CaptureRequest>({
  amount: s.optional(s.lazy(() => moneySchema)),
  invoiceId: s.optional(s.string()),
  finalCapture: s.defaulted(s.boolean(), false),
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
