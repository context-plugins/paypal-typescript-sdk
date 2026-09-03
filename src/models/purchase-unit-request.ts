import * as s from "../core/validation/index.js";
import type { Schema } from "../core/validation/schema.js";
import { amountWithBreakdownSchema, type AmountWithBreakdown } from "./amount-with-breakdown.js";
import { itemRequestSchema, type ItemRequest } from "./item-request.js";
import { payeeBaseSchema, type PayeeBase } from "./payee-base.js";
import { paymentInstructionSchema, type PaymentInstruction } from "./payment-instruction.js";
import { shippingDetailsSchema, type ShippingDetails } from "./shipping-details.js";
import { supplementaryDataSchema, type SupplementaryData } from "./supplementary-data.js";

export type PurchaseUnitRequest = {
  referenceId?: string;
  amount: AmountWithBreakdown;
  payee?: PayeeBase;
  paymentInstruction?: PaymentInstruction;
  description?: string;
  customId?: string;
  invoiceId?: string;
  softDescriptor?: string;
  items?: ItemRequest[];
  shipping?: ShippingDetails;
  supplementaryData?: SupplementaryData;
};

export const purchaseUnitRequestSchema: Schema<PurchaseUnitRequest> = s.object<PurchaseUnitRequest>({
  referenceId: s.optional(s.string()),
  amount: amountWithBreakdownSchema,
  payee: s.optional(s.lazy(() => payeeBaseSchema)),
  paymentInstruction: s.optional(s.lazy(() => paymentInstructionSchema)),
  description: s.optional(s.string()),
  customId: s.optional(s.string()),
  invoiceId: s.optional(s.string()),
  softDescriptor: s.optional(s.string()),
  items: s.optional(s.array(s.lazy(() => itemRequestSchema))),
  shipping: s.optional(s.lazy(() => shippingDetailsSchema)),
  supplementaryData: s.optional(s.lazy(() => supplementaryDataSchema)),
  _keysMap: {
    referenceId: "reference_id",
    paymentInstruction: "payment_instruction",
    customId: "custom_id",
    invoiceId: "invoice_id",
    softDescriptor: "soft_descriptor",
    supplementaryData: "supplementary_data",
  },
});
