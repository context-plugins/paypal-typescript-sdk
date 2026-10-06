import * as s from "../core/validation/index.js";
import type { Schema } from "../core/validation/schema.js";
import { linkDescriptionSchema, type LinkDescription } from "./link-description.js";
import { moneySchema, type Money } from "./money.js";
import { payeeBaseSchema, type PayeeBase } from "./payee-base.js";
import { refundStatusDetailsSchema, type RefundStatusDetails } from "./refund-status-details.js";
import { refundStatusSchema, type RefundStatus } from "./refund-status.js";
import { sellerPayableBreakdownSchema, type SellerPayableBreakdown } from "./seller-payable-breakdown.js";

/** The refund information. */
export type Refund = {
  /** The status of the refund. */
  status?: RefundStatus;
  /** The details of the refund status. */
  statusDetails?: RefundStatusDetails;
  /** The PayPal-generated ID for the refund. */
  id?: string;
  /** The currency and amount for a financial transaction, such as a balance or payment due. */
  amount?: Money;
  /**
   * The API caller-provided external invoice number for this order. Appears in both the payer's
   * transaction history and the emails that the payer receives.
   */
  invoiceId?: string;
  /**
   * The API caller-provided external ID. Used to reconcile API caller-initiated transactions with
   * PayPal transactions. Appears in transaction and settlement reports.
   */
  customId?: string;
  /**
   * Reference ID issued for the card transaction. This ID can be used to track the transaction
   * across processors, card brands and issuing banks.
   */
  acquirerReferenceNumber?: string;
  /**
   * The reason for the refund. Appears in both the payer's transaction history and the emails that
   * the payer receives.
   */
  noteToPayer?: string;
  /** The breakdown of the refund. */
  sellerPayableBreakdown?: SellerPayableBreakdown;
  /**
   * The details for the merchant who receives the funds and fulfills the order. The merchant is
   * also known as the payee.
   */
  payer?: PayeeBase;
  /** An array of related [HATEOAS links](/docs/api/reference/api-responses/#hateoas-links). */
  links?: LinkDescription[];
  /**
   * The date and time, in [Internet date and time
   * format](https://tools.ietf.org/html/rfc3339#section-5.6). Seconds are required while fractional
   * seconds are optional. Note: The regular expression provides guidance but does not reject all
   * invalid dates.
   */
  createTime?: string;
  /**
   * The date and time, in [Internet date and time
   * format](https://tools.ietf.org/html/rfc3339#section-5.6). Seconds are required while fractional
   * seconds are optional. Note: The regular expression provides guidance but does not reject all
   * invalid dates.
   */
  updateTime?: string;
};

export const refundSchema: Schema<Refund> = s.object<Refund>({
  status: s.optional(s.lazy(() => refundStatusSchema)),
  statusDetails: s.optional(s.lazy(() => refundStatusDetailsSchema)),
  id: s.optional(s.string()),
  amount: s.optional(s.lazy(() => moneySchema)),
  invoiceId: s.optional(s.string()),
  customId: s.optional(s.string()),
  acquirerReferenceNumber: s.optional(s.string()),
  noteToPayer: s.optional(s.string()),
  sellerPayableBreakdown: s.optional(s.lazy(() => sellerPayableBreakdownSchema)),
  payer: s.optional(s.lazy(() => payeeBaseSchema)),
  links: s.optional(s.array(s.lazy(() => linkDescriptionSchema))),
  createTime: s.optional(s.string()),
  updateTime: s.optional(s.string()),
  _keysMap: {
    statusDetails: "status_details",
    invoiceId: "invoice_id",
    customId: "custom_id",
    acquirerReferenceNumber: "acquirer_reference_number",
    noteToPayer: "note_to_payer",
    sellerPayableBreakdown: "seller_payable_breakdown",
    createTime: "create_time",
    updateTime: "update_time",
  },
});
