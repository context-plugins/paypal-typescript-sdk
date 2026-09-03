import * as s from "../core/validation/index.js";
import type { Schema } from "../core/validation/schema.js";
import { avsCodeSchema, type AvsCode } from "./avs-code.js";
import { cvvCodeSchema, type CvvCode } from "./cvv-code.js";

export type CardVerificationProcessorResponse = {
  avsCode?: AvsCode;
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
