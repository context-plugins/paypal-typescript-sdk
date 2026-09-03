import * as s from "../core/validation/index.js";
import type { EnumSchema } from "../core/validation/schema.js";

export const AvsCode = {
  A: "A",
  B: "B",
  C: "C",
  D: "D",
  E: "E",
  F: "F",
  G: "G",
  I: "I",
  M: "M",
  N: "N",
  P: "P",
  R: "R",
  S: "S",
  U: "U",
  W: "W",
  X: "X",
  Y: "Y",
  Z: "Z",
  Null: "Null",
  _0: "0",
  _1: "1",
  _2: "2",
  _3: "3",
  _4: "4",
} as const;
export type AvsCode = (typeof AvsCode)[keyof typeof AvsCode] | (string & {});

export const avsCodeSchema: EnumSchema<AvsCode> = s.enumOf<AvsCode>(AvsCode);
