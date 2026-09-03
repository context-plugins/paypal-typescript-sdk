import * as s from "../core/validation/index.js";
import type { EnumSchema } from "../core/validation/schema.js";

export const CvvCode = {
  E: "E",
  I: "I",
  M: "M",
  N: "N",
  P: "P",
  S: "S",
  U: "U",
  X: "X",
  AllOthers: "All others",
  _0: "0",
  _1: "1",
  _2: "2",
  _3: "3",
  _4: "4",
} as const;
export type CvvCode = (typeof CvvCode)[keyof typeof CvvCode] | (string & {});

export const cvvCodeSchema: EnumSchema<CvvCode> = s.enumOf<CvvCode>(CvvCode);
