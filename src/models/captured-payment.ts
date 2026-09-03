import * as s from "../core/validation/index.js";
import type { Schema } from "../core/validation/schema.js";
import { captureStatusDetailsSchema, type CaptureStatusDetails } from "./capture-status-details.js";
import { captureStatusSchema, type CaptureStatus } from "./capture-status.js";
import { disbursementModeSchema, type DisbursementMode } from "./disbursement-mode.js";
import { linkDescriptionSchema, type LinkDescription } from "./link-description.js";
import { moneySchema, type Money } from "./money.js";
import { networkTransactionSchema, type NetworkTransaction } from "./network-transaction.js";
import { payeeBaseSchema, type PayeeBase } from "./payee-base.js";
import {
  paymentSupplementaryDataSchema,
  type PaymentSupplementaryData,
} from "./payment-supplementary-data.js";
import { processorResponseSchema, type ProcessorResponse } from "./processor-response.js";
import { sellerProtectionSchema, type SellerProtection } from "./seller-protection.js";
import {
  sellerReceivableBreakdownSchema,
  type SellerReceivableBreakdown,
} from "./seller-receivable-breakdown.js";

export type CapturedPayment = {
  status?: CaptureStatus;
  statusDetails?: CaptureStatusDetails;
  id?: string;
  amount?: Money;
  invoiceId?: string;
  customId?: string;
  networkTransactionReference?: NetworkTransaction;
  sellerProtection?: SellerProtection;
  finalCapture?: boolean;
  sellerReceivableBreakdown?: SellerReceivableBreakdown;
  disbursementMode?: DisbursementMode;
  links?: LinkDescription[];
  processorResponse?: ProcessorResponse;
  createTime?: string;
  updateTime?: string;
  supplementaryData?: PaymentSupplementaryData;
  payee?: PayeeBase;
};

export const capturedPaymentSchema: Schema<CapturedPayment> = s.object<CapturedPayment>({
  status: s.optional(s.lazy(() => captureStatusSchema)),
  statusDetails: s.optional(s.lazy(() => captureStatusDetailsSchema)),
  id: s.optional(s.string()),
  amount: s.optional(s.lazy(() => moneySchema)),
  invoiceId: s.optional(s.string()),
  customId: s.optional(s.string()),
  networkTransactionReference: s.optional(s.lazy(() => networkTransactionSchema)),
  sellerProtection: s.optional(s.lazy(() => sellerProtectionSchema)),
  finalCapture: s.optional(s.boolean()),
  sellerReceivableBreakdown: s.optional(s.lazy(() => sellerReceivableBreakdownSchema)),
  disbursementMode: s.optional(s.lazy(() => disbursementModeSchema)),
  links: s.optional(s.array(s.lazy(() => linkDescriptionSchema))),
  processorResponse: s.optional(s.lazy(() => processorResponseSchema)),
  createTime: s.optional(s.string()),
  updateTime: s.optional(s.string()),
  supplementaryData: s.optional(s.lazy(() => paymentSupplementaryDataSchema)),
  payee: s.optional(s.lazy(() => payeeBaseSchema)),
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
    supplementaryData: "supplementary_data",
  },
});
