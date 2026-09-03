import * as s from "../core/validation/index.js";
import type { EnumSchema } from "../core/validation/schema.js";

export const PaResStatus = {
  Y: "Y",
  N: "N",
  U: "U",
  A: "A",
  C: "C",
  R: "R",
  D: "D",
  I: "I",
} as const;
export type PaResStatus = (typeof PaResStatus)[keyof typeof PaResStatus] | (string & {});

export const paResStatusSchema: EnumSchema<PaResStatus> = s.enumOf<PaResStatus>(PaResStatus);
