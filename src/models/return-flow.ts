import * as s from "../core/validation/index.js";
import type { EnumSchema } from "../core/validation/schema.js";

export const ReturnFlow = {
  Auto: "AUTO",
  Manual: "MANUAL",
} as const;
export type ReturnFlow = (typeof ReturnFlow)[keyof typeof ReturnFlow] | (string & {});

export const returnFlowSchema: EnumSchema<ReturnFlow> = s.enumOf<ReturnFlow>(ReturnFlow);
