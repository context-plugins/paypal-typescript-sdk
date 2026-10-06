import * as s from "../core/validation/index.js";
import type { Schema } from "../core/validation/schema.js";
import { patchOpSchema, type PatchOp } from "./patch-op.js";

/** The JSON patch object to apply partial updates to resources. */
export type Patch = {
  /** The operation. */
  op: PatchOp;
  /** The JSON Pointer to the target document location at which to complete the operation. */
  path?: string;
  /**
   * The value to apply. The remove, copy, and move operations do not require a value. Since JSON
   * Patch allows any type for value, the type property is not specified.
   */
  value?: Record<string, unknown>;
  /**
   * The JSON Pointer to the target document location from which to move the value. Required for the
   * move operation.
   */
  from?: string;
};

export const patchSchema: Schema<Patch> = s.object<Patch>({
  op: patchOpSchema,
  path: s.optional(s.string()),
  value: s.optional(s.record(s.string(), s.unknown())),
  from: s.optional(s.string()),
});
