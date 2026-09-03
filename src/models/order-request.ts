import * as s from "../core/validation/index.js";
import type { Schema } from "../core/validation/schema.js";
import { checkoutPaymentIntentSchema, type CheckoutPaymentIntent } from "./checkout-payment-intent.js";
import { orderApplicationContextSchema, type OrderApplicationContext } from "./order-application-context.js";
import { payerSchema, type Payer } from "./payer.js";
import { paymentSourceSchema, type PaymentSource } from "./payment-source.js";
import { processingInstructionSchema, type ProcessingInstruction } from "./processing-instruction.js";
import { purchaseUnitRequestSchema, type PurchaseUnitRequest } from "./purchase-unit-request.js";

export type OrderRequest = {
  intent: CheckoutPaymentIntent;
  processingInstruction?: ProcessingInstruction;
  payer?: Payer;
  purchaseUnits: PurchaseUnitRequest[];
  paymentSource?: PaymentSource;
  applicationContext?: OrderApplicationContext;
};

export const orderRequestSchema: Schema<OrderRequest> = s.object<OrderRequest>({
  intent: checkoutPaymentIntentSchema,
  processingInstruction: s.optional(s.lazy(() => processingInstructionSchema)),
  payer: s.optional(s.lazy(() => payerSchema)),
  purchaseUnits: s.array(s.lazy(() => purchaseUnitRequestSchema)),
  paymentSource: s.optional(s.lazy(() => paymentSourceSchema)),
  applicationContext: s.optional(s.lazy(() => orderApplicationContextSchema)),
  _keysMap: {
    processingInstruction: "processing_instruction",
    purchaseUnits: "purchase_units",
    paymentSource: "payment_source",
    applicationContext: "application_context",
  },
});
