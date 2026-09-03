import * as s from "../core/validation/index.js";
import type { Schema } from "../core/validation/schema.js";
import { checkoutPaymentIntentSchema, type CheckoutPaymentIntent } from "./checkout-payment-intent.js";
import { linkDescriptionSchema, type LinkDescription } from "./link-description.js";
import { orderStatusSchema, type OrderStatus } from "./order-status.js";
import { payerSchema, type Payer } from "./payer.js";
import { paymentSourceResponseSchema, type PaymentSourceResponse } from "./payment-source-response.js";
import { processingInstructionSchema, type ProcessingInstruction } from "./processing-instruction.js";
import { purchaseUnitSchema, type PurchaseUnit } from "./purchase-unit.js";

export type Order = {
  createTime?: string;
  updateTime?: string;
  id?: string;
  paymentSource?: PaymentSourceResponse;
  intent?: CheckoutPaymentIntent;
  processingInstruction?: ProcessingInstruction;
  payer?: Payer;
  purchaseUnits?: PurchaseUnit[];
  status?: OrderStatus;
  links?: LinkDescription[];
};

export const orderSchema: Schema<Order> = s.object<Order>({
  createTime: s.optional(s.string()),
  updateTime: s.optional(s.string()),
  id: s.optional(s.string()),
  paymentSource: s.optional(s.lazy(() => paymentSourceResponseSchema)),
  intent: s.optional(s.lazy(() => checkoutPaymentIntentSchema)),
  processingInstruction: s.optional(s.lazy(() => processingInstructionSchema)),
  payer: s.optional(s.lazy(() => payerSchema)),
  purchaseUnits: s.optional(s.array(s.lazy(() => purchaseUnitSchema))),
  status: s.optional(s.lazy(() => orderStatusSchema)),
  links: s.optional(s.array(s.lazy(() => linkDescriptionSchema))),
  _keysMap: {
    createTime: "create_time",
    updateTime: "update_time",
    paymentSource: "payment_source",
    processingInstruction: "processing_instruction",
    purchaseUnits: "purchase_units",
  },
});
