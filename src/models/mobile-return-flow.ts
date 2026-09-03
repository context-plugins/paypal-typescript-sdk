import * as s from "../core/validation/index.js";
import type { EnumSchema } from "../core/validation/schema.js";

export const MobileReturnFlow = {
  Auto: "AUTO",
  Manual: "MANUAL",
} as const;
export type MobileReturnFlow = (typeof MobileReturnFlow)[keyof typeof MobileReturnFlow] | (string & {});

export const mobileReturnFlowSchema: EnumSchema<MobileReturnFlow> =
  s.enumOf<MobileReturnFlow>(MobileReturnFlow);
