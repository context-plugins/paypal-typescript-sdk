import * as s from "../core/validation/index.js";
import type { EnumSchema } from "../core/validation/schema.js";

export const PatchOp = {
  Add: "add",
  Remove: "remove",
  Replace: "replace",
  Move: "move",
  Copy: "copy",
  Test: "test",
} as const;
export type PatchOp = (typeof PatchOp)[keyof typeof PatchOp] | (string & {});

export const patchOpSchema: EnumSchema<PatchOp> = s.enumOf<PatchOp>(PatchOp);
