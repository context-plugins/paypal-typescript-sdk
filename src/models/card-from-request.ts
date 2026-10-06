import * as s from "../core/validation/index.js";
import type { Schema } from "../core/validation/schema.js";

/** Representation of card details as received in the request. */
export type CardFromRequest = {
  /**
   * The year and month, in ISO-8601 `YYYY-MM` date format. See [Internet date and time
   * format](https://tools.ietf.org/html/rfc3339#section-5.6).
   */
  expiry?: string;
  /** The last digits of the payment card. */
  lastDigits?: string;
};

export const cardFromRequestSchema: Schema<CardFromRequest> = s.object<CardFromRequest>({
  expiry: s.optional(s.string()),
  lastDigits: s.optional(s.string()),
  _keysMap: {
    lastDigits: "last_digits",
  },
});
