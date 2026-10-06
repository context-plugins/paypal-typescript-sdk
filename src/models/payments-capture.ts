import * as s from "../core/validation/index.js";
import type { Schema } from "../core/validation/schema.js";
import { captureStatusDetailsSchema, type CaptureStatusDetails } from "./capture-status-details.js";
import { captureStatusSchema, type CaptureStatus } from "./capture-status.js";
import { DisbursementMode, disbursementModeSchema } from "./disbursement-mode.js";
import { linkDescriptionSchema, type LinkDescription } from "./link-description.js";
import { moneySchema, type Money } from "./money.js";
import { networkTransactionSchema, type NetworkTransaction } from "./network-transaction.js";
import { processorResponseSchema, type ProcessorResponse } from "./processor-response.js";
import { sellerProtectionSchema, type SellerProtection } from "./seller-protection.js";
import {
  sellerReceivableBreakdownSchema,
  type SellerReceivableBreakdown,
} from "./seller-receivable-breakdown.js";

/** A captured payment. */
export type PaymentsCapture = {
  /** The status of the captured payment. */
  status?: CaptureStatus;
  /** The details of the captured payment status. */
  statusDetails?: CaptureStatusDetails;
  /** The PayPal-generated ID for the captured payment. */
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
  /** Reference values used by the card network to identify a transaction. */
  networkTransactionReference?: NetworkTransaction;
  /**
   * The level of protection offered as defined by [PayPal Seller Protection for
   * Merchants](https://www.paypal.com/us/webapps/mpp/security/seller-protection).
   */
  sellerProtection?: SellerProtection;
  /**
   * Indicates whether you can make additional captures against the authorized payment. Set to
   * `true` if you do not intend to capture additional payments against the authorization. Set to
   * `false` if you intend to capture additional payments against the authorization.
   *
   * @default false
   */
  finalCapture?: boolean;
  /**
   * The detailed breakdown of the capture activity. This is not available for transactions that are
   * in pending state.
   */
  sellerReceivableBreakdown?: SellerReceivableBreakdown;
  /** The funds that are held on behalf of the merchant. @default DisbursementMode.Instant */
  disbursementMode?: DisbursementMode;
  /** An array of related [HATEOAS links](/docs/api/reference/api-responses/#hateoas-links). */
  links?: LinkDescription[];
  /**
   * The processor response information for payment requests, such as direct credit card
   * transactions.
   */
  processorResponse?: ProcessorResponse;
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

export const paymentsCaptureSchema: Schema<PaymentsCapture> = s.object<PaymentsCapture>({
  status: s.optional(s.lazy(() => captureStatusSchema)),
  statusDetails: s.optional(s.lazy(() => captureStatusDetailsSchema)),
  id: s.optional(s.string()),
  amount: s.optional(s.lazy(() => moneySchema)),
  invoiceId: s.optional(s.string()),
  customId: s.optional(s.string()),
  networkTransactionReference: s.optional(s.lazy(() => networkTransactionSchema)),
  sellerProtection: s.optional(s.lazy(() => sellerProtectionSchema)),
  finalCapture: s.defaulted(s.boolean(), false),
  sellerReceivableBreakdown: s.optional(s.lazy(() => sellerReceivableBreakdownSchema)),
  disbursementMode: s.defaulted(disbursementModeSchema, DisbursementMode.Instant),
  links: s.optional(s.array(s.lazy(() => linkDescriptionSchema))),
  processorResponse: s.optional(s.lazy(() => processorResponseSchema)),
  createTime: s.optional(s.string()),
  updateTime: s.optional(s.string()),
  _keysMap: {
    statusDetails: "status_details",
    invoiceId: "invoice_id",
    customId: "custom_id",
    networkTransactionReference: "network_transaction_reference",
    sellerProtection: "seller_protection",
    finalCapture: "final_capture",
    sellerReceivableBreakdown: "seller_receivable_breakdown",
    disbursementMode: "disbursement_mode",
    processorResponse: "processor_response",
    createTime: "create_time",
    updateTime: "update_time",
  },
});
