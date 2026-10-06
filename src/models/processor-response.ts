import * as s from "../core/validation/index.js";
import type { Schema } from "../core/validation/schema.js";
import { avsCodeSchema, type AvsCode } from "./avs-code.js";
import { cvvCodeSchema, type CvvCode } from "./cvv-code.js";
import { paymentAdviceCodeSchema, type PaymentAdviceCode } from "./payment-advice-code.js";
import { processorResponseCodeSchema, type ProcessorResponseCode } from "./processor-response-code.js";

/**
 * The processor response information for payment requests, such as direct credit card transactions.
 */
export type ProcessorResponse = {
  /**
   * The address verification code for Visa, Discover, Mastercard, or American Express transactions.
   */
  avsCode?: AvsCode;
  /** The card verification value code for for Visa, Discover, Mastercard, or American Express. */
  cvvCode?: CvvCode;
  /** Processor response code for the non-PayPal payment processor errors. */
  responseCode?: ProcessorResponseCode;
  /**
   * The declined payment transactions might have payment advice codes. The card networks, like Visa
   * and Mastercard, return payment advice codes.
   */
  paymentAdviceCode?: PaymentAdviceCode;
};

export const processorResponseSchema: Schema<ProcessorResponse> = s.object<ProcessorResponse>({
  avsCode: s.optional(s.lazy(() => avsCodeSchema)),
  cvvCode: s.optional(s.lazy(() => cvvCodeSchema)),
  responseCode: s.optional(s.lazy(() => processorResponseCodeSchema)),
  paymentAdviceCode: s.optional(s.lazy(() => paymentAdviceCodeSchema)),
  _keysMap: {
    avsCode: "avs_code",
    cvvCode: "cvv_code",
    responseCode: "response_code",
    paymentAdviceCode: "payment_advice_code",
  },
});
