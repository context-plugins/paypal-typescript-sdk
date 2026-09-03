import * as s from "../core/validation/index.js";
import type { Schema } from "../core/validation/schema.js";
import { blikExperienceContextSchema, type BlikExperienceContext } from "./blik-experience-context.js";
import { blikLevel0PaymentObjectSchema, type BlikLevel0PaymentObject } from "./blik-level0-payment-object.js";
import {
  blikOneClickPaymentRequestSchema,
  type BlikOneClickPaymentRequest,
} from "./blik-one-click-payment-request.js";

export type BlikPaymentRequest = {
  name: string;
  countryCode: string;
  email?: string;
  experienceContext?: BlikExperienceContext;
  level0?: BlikLevel0PaymentObject;
  oneClick?: BlikOneClickPaymentRequest;
};

export const blikPaymentRequestSchema: Schema<BlikPaymentRequest> = s.object<BlikPaymentRequest>({
  name: s.string(),
  countryCode: s.string(),
  email: s.optional(s.string()),
  experienceContext: s.optional(s.lazy(() => blikExperienceContextSchema)),
  level0: s.optional(s.lazy(() => blikLevel0PaymentObjectSchema)),
  oneClick: s.optional(s.lazy(() => blikOneClickPaymentRequestSchema)),
  _keysMap: {
    countryCode: "country_code",
    experienceContext: "experience_context",
    level0: "level_0",
    oneClick: "one_click",
  },
});
