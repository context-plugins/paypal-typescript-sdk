import * as s from "../core/validation/index.js";
import type { Schema } from "../core/validation/schema.js";
import { linkDescriptionSchema, type LinkDescription } from "./link-description.js";
import { moneySchema, type Money } from "./money.js";
import { payeeBaseSchema, type PayeeBase } from "./payee-base.js";
import { refundStatusDetailsSchema, type RefundStatusDetails } from "./refund-status-details.js";
import { refundStatusSchema, type RefundStatus } from "./refund-status.js";
import { sellerPayableBreakdownSchema, type SellerPayableBreakdown } from "./seller-payable-breakdown.js";

export type Refund = {
  status?: RefundStatus;
  statusDetails?: RefundStatusDetails;
  id?: string;
  amount?: Money;
  invoiceId?: string;
  customId?: string;
  acquirerReferenceNumber?: string;
  noteToPayer?: string;
  sellerPayableBreakdown?: SellerPayableBreakdown;
  payer?: PayeeBase;
  links?: LinkDescription[];
  createTime?: string;
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
