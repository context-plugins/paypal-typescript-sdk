import * as s from "../core/validation/index.js";
import type { EnumSchema } from "../core/validation/schema.js";

/** The condition that is covered for the transaction. */
export const DisputeCategory = {
  /** The payer paid for an item that they did not receive. */
  ItemNotReceived: "ITEM_NOT_RECEIVED",
  /** The payer did not authorize the payment. */
  UnauthorizedTransaction: "UNAUTHORIZED_TRANSACTION",
} as const;
export type DisputeCategory = (typeof DisputeCategory)[keyof typeof DisputeCategory] | (string & {});

export const disputeCategorySchema: EnumSchema<DisputeCategory> = s.enumOf<DisputeCategory>(DisputeCategory);
