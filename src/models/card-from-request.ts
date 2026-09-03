import * as s from "../core/validation/index.js";
import type { Schema } from "../core/validation/schema.js";

export type CardFromRequest = {
  expiry?: string;
  lastDigits?: string;
};

export const cardFromRequestSchema: Schema<CardFromRequest> = s.object<CardFromRequest>({
  expiry: s.optional(s.string()),
  lastDigits: s.optional(s.string()),
  _keysMap: {
    lastDigits: "last_digits",
  },
});
