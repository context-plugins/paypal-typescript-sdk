import * as s from "../core/validation/index.js";
import type { Schema } from "../core/validation/schema.js";
import { moneySchema, type Money } from "./money.js";
import {
  refundPaymentInstructionSchema,
  type RefundPaymentInstruction,
} from "./refund-payment-instruction.js";

/**
 * Refunds a captured payment, by ID. For a full refund, include an empty request body. For a
 * partial refund, include an amount object in the request body.
 */
export type RefundRequest = {
  /** The currency and amount for a financial transaction, such as a balance or payment due. */
  amount?: Money;
  /**
   * The API caller-provided external ID. Used to reconcile API caller-initiated transactions with
   * PayPal transactions. Appears in transaction and settlement reports. The pattern is defined by
   * an external party and supports Unicode.
   */
  customId?: string;
  /**
   * The API caller-provided external invoice ID for this order. The pattern is defined by an
   * external party and supports Unicode.
   */
  invoiceId?: string;
  /**
   * The reason for the refund. Appears in both the payer's transaction history and the emails that
   * the payer receives. The pattern is defined by an external party and supports Unicode.
   */
  noteToPayer?: string;
  /**
   * Any additional payments instructions during refund payment processing. This object is only
   * applicable to merchants that have been enabled for PayPal Commerce Platform for Marketplaces
   * and Platforms capability. Please speak to your account manager if you want to use this
   * capability.
   */
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
