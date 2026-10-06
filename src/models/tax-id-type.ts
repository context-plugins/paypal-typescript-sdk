import * as s from "../core/validation/index.js";
import type { EnumSchema } from "../core/validation/schema.js";

/** The customer's tax ID type. */
export const TaxIdType = {
  /** The individual tax ID type, typically is 11 characters long. */
  BrCpf: "BR_CPF",
  /** The business tax ID type, typically is 14 characters long. */
  BrCnpj: "BR_CNPJ",
} as const;
export type TaxIdType = (typeof TaxIdType)[keyof typeof TaxIdType] | (string & {});

export const taxIdTypeSchema: EnumSchema<TaxIdType> = s.enumOf<TaxIdType>(TaxIdType);
