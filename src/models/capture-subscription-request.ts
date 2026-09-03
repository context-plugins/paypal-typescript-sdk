import * as s from "../core/validation/index.js";
import type { Schema } from "../core/validation/schema.js";
import { captureTypeSchema, type CaptureType } from "./capture-type.js";
import { moneySchema, type Money } from "./money.js";

export type CaptureSubscriptionRequest = {
  note: string;
  captureType: CaptureType;
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
