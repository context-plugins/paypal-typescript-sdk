import * as s from "../core/validation/index.js";
import type { Schema } from "../core/validation/schema.js";
import { avsCodeSchema, type AvsCode } from "./avs-code.js";
import { cvvCodeSchema, type CvvCode } from "./cvv-code.js";

/**
 * The processor response information for payment requests, such as direct credit card transactions.
 */
export type CardVerificationProcessorResponse = {
  /**
   * The address verification code for Visa, Discover, Mastercard, or American Express transactions.
   */
  avsCode?: AvsCode;
  /** The card verification value code for for Visa, Discover, Mastercard, or American Express. */
  cvvCode?: CvvCode;
};

export const cardVerificationProcessorResponseSchema: Schema<CardVerificationProcessorResponse> =
  s.object<CardVerificationProcessorResponse>({
    avsCode: s.optional(s.lazy(() => avsCodeSchema)),
    cvvCode: s.optional(s.lazy(() => cvvCodeSchema)),
    _keysMap: {
      avsCode: "avs_code",
      cvvCode: "cvv_code",
    },
  });
