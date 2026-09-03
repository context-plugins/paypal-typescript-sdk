import * as s from "../core/validation/index.js";
import type { Schema } from "../core/validation/schema.js";
import { avsCodeSchema, type AvsCode } from "./avs-code.js";
import { cvvCodeSchema, type CvvCode } from "./cvv-code.js";
import { paymentAdviceCodeSchema, type PaymentAdviceCode } from "./payment-advice-code.js";
import { processorResponseCodeSchema, type ProcessorResponseCode } from "./processor-response-code.js";

export type ProcessorResponse = {
  avsCode?: AvsCode;
  cvvCode?: CvvCode;
  responseCode?: ProcessorResponseCode;
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
