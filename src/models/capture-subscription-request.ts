import * as s from "../core/validation/index.js";
import type { Schema } from "../core/validation/schema.js";
import { captureTypeSchema, type CaptureType } from "./capture-type.js";
import { moneySchema, type Money } from "./money.js";

/** The charge amount from the subscriber. */
export type CaptureSubscriptionRequest = {
  /** The reason or note for the subscription charge. */
  note: string;
  /** The type of capture. */
  captureType: CaptureType;
  /** The currency and amount for a financial transaction, such as a balance or payment due. */
  amount: Money;
};

export const captureSubscriptionRequestSchema: Schema<CaptureSubscriptionRequest> =
  s.object<CaptureSubscriptionRequest>({
    note: s.string(),
    captureType: captureTypeSchema,
    amount: moneySchema,
    _keysMap: {
      captureType: "capture_type",
    },
  });
