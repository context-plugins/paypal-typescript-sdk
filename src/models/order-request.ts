import * as s from "../core/validation/index.js";
import type { Schema } from "../core/validation/schema.js";
import { checkoutPaymentIntentSchema, type CheckoutPaymentIntent } from "./checkout-payment-intent.js";
import { orderApplicationContextSchema, type OrderApplicationContext } from "./order-application-context.js";
import { payerSchema, type Payer } from "./payer.js";
import { paymentSourceSchema, type PaymentSource } from "./payment-source.js";
import { purchaseUnitRequestSchema, type PurchaseUnitRequest } from "./purchase-unit-request.js";

/** The order request details. */
export type OrderRequest = {
  /**
   * The intent to either capture payment immediately or authorize a payment for an order after
   * order creation.
   */
  intent: CheckoutPaymentIntent;
  /**
   * DEPRECATED. The customer is also known as the payer. The Payer object was intended to only be
   * used with the `payment_source.paypal` object. In order to make this design more clear, the
   * details in the `payer` object are now available under `payment_source.paypal`. Please use
   * `payment_source.paypal`.
   *
   * @deprecated
   */
  payer?: Payer;
  /**
   * An array of purchase units. Each purchase unit establishes a contract between a payer and the
   * payee. Each purchase unit represents either a full or partial order that the payer intends to
   * purchase from the payee.
   */
  purchaseUnits: PurchaseUnitRequest[];
  /** The payment source definition. */
  paymentSource?: PaymentSource;
  /**
   * Customizes the payer experience during the approval process for the payment with PayPal. Note:
   * Partners and Marketplaces might configure brand_name and shipping_preference during partner
   * account setup, which overrides the request values.
   */
  applicationContext?: OrderApplicationContext;
};

export const orderRequestSchema: Schema<OrderRequest> = s.object<OrderRequest>({
  intent: checkoutPaymentIntentSchema,
  payer: s.optional(s.lazy(() => payerSchema)),
  purchaseUnits: s.array(s.lazy(() => purchaseUnitRequestSchema)),
  paymentSource: s.optional(s.lazy(() => paymentSourceSchema)),
  applicationContext: s.optional(s.lazy(() => orderApplicationContextSchema)),
  _keysMap: {
    purchaseUnits: "purchase_units",
    paymentSource: "payment_source",
    applicationContext: "application_context",
  },
});
