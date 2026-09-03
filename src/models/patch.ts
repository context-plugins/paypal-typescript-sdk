import * as s from "../core/validation/index.js";
import type { Schema } from "../core/validation/schema.js";
import { patchOpSchema, type PatchOp } from "./patch-op.js";

export type Patch = {
  op: PatchOp;
  path?: string;
  value?: Record<string, unknown>;
  from?: string;
};

export const patchSchema: Schema<Patch> = s.object<Patch>({
  op: patchOpSchema,
  path: s.optional(s.string()),
  value: s.optional(s.record(s.string(), s.unknown())),
  from: s.optional(s.string()),
});
