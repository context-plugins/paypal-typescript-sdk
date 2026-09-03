import * as s from "../core/validation/index.js";
import type { EnumSchema } from "../core/validation/schema.js";

export const DisputeCategory = {
  ItemNotReceived: "ITEM_NOT_RECEIVED",
  UnauthorizedTransaction: "UNAUTHORIZED_TRANSACTION",
} as const;
export type DisputeCategory = (typeof DisputeCategory)[keyof typeof DisputeCategory] | (string & {});

export const disputeCategorySchema: EnumSchema<DisputeCategory> = s.enumOf<DisputeCategory>(DisputeCategory);
