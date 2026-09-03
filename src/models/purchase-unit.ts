import * as s from "../core/validation/index.js";
import type { Schema } from "../core/validation/schema.js";
import { amountWithBreakdownSchema, type AmountWithBreakdown } from "./amount-with-breakdown.js";
import { itemSchema, type Item } from "./item.js";
import { payeeBaseSchema, type PayeeBase } from "./payee-base.js";
import { paymentCollectionSchema, type PaymentCollection } from "./payment-collection.js";
import { paymentInstructionSchema, type PaymentInstruction } from "./payment-instruction.js";
import {
  shippingWithTrackingDetailsSchema,
  type ShippingWithTrackingDetails,
} from "./shipping-with-tracking-details.js";
import { supplementaryDataSchema, type SupplementaryData } from "./supplementary-data.js";

export type PurchaseUnit = {
  referenceId?: string;
  amount?: AmountWithBreakdown;
  payee?: PayeeBase;
  paymentInstruction?: PaymentInstruction;
  description?: string;
  customId?: string;
  invoiceId?: string;
  id?: string;
  softDescriptor?: string;
  items?: Item[];
  shipping?: ShippingWithTrackingDetails;
  supplementaryData?: SupplementaryData;
  payments?: PaymentCollection;
  mostRecentErrors?: Record<string, unknown>[];
};

export const purchaseUnitSchema: Schema<PurchaseUnit> = s.object<PurchaseUnit>({
  referenceId: s.optional(s.string()),
  amount: s.optional(s.lazy(() => amountWithBreakdownSchema)),
  payee: s.optional(s.lazy(() => payeeBaseSchema)),
  paymentInstruction: s.optional(s.lazy(() => paymentInstructionSchema)),
  description: s.optional(s.string()),
  customId: s.optional(s.string()),
  invoiceId: s.optional(s.string()),
  id: s.optional(s.string()),
  softDescriptor: s.optional(s.string()),
  items: s.optional(s.array(s.lazy(() => itemSchema))),
  shipping: s.optional(s.lazy(() => shippingWithTrackingDetailsSchema)),
  supplementaryData: s.optional(s.lazy(() => supplementaryDataSchema)),
  payments: s.optional(s.lazy(() => paymentCollectionSchema)),
  mostRecentErrors: s.optional(s.array(s.record(s.string(), s.unknown()))),
  _keysMap: {
    referenceId: "reference_id",
    paymentInstruction: "payment_instruction",
    customId: "custom_id",
    invoiceId: "invoice_id",
    softDescriptor: "soft_descriptor",
    supplementaryData: "supplementary_data",
    mostRecentErrors: "most_recent_errors",
  },
});
