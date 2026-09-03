import * as s from "../core/validation/index.js";
import type { EnumSchema } from "../core/validation/schema.js";

export const TaxIdType = {
  BrCpf: "BR_CPF",
  BrCnpj: "BR_CNPJ",
} as const;
export type TaxIdType = (typeof TaxIdType)[keyof typeof TaxIdType] | (string & {});

export const taxIdTypeSchema: EnumSchema<TaxIdType> = s.enumOf<TaxIdType>(TaxIdType);
