import * as s from "../core/validation/index.js";
import type { Schema } from "../core/validation/schema.js";
import { cardBrandSchema, type CardBrand } from "./card-brand.js";
import {
  cardVerificationProcessorResponseSchema,
  type CardVerificationProcessorResponse,
} from "./card-verification-processor-response.js";
import { moneySchema, type Money } from "./money.js";

export type CardVerificationDetails = {
  networkTransactionId?: string;
  date?: string;
  network?: CardBrand;
  time?: string;
  amount?: Money;
  processorResponse?: CardVerificationProcessorResponse;
  threeDSecure?: Record<string, unknown>;
};

export const cardVerificationDetailsSchema: Schema<CardVerificationDetails> =
  s.object<CardVerificationDetails>({
    networkTransactionId: s.optional(s.string()),
    date: s.optional(s.string()),
    network: s.optional(s.lazy(() => cardBrandSchema)),
    time: s.optional(s.string()),
    amount: s.optional(s.lazy(() => moneySchema)),
    processorResponse: s.optional(s.lazy(() => cardVerificationProcessorResponseSchema)),
    threeDSecure: s.optional(s.record(s.string(), s.unknown())),
    _keysMap: {
      networkTransactionId: "network_transaction_id",
      processorResponse: "processor_response",
      threeDSecure: "three_d_secure",
    },
  });
