import * as s from "../core/validation/index.js";
import type { Schema } from "../core/validation/schema.js";
import { tokenTypeSchema, type TokenType } from "./token-type.js";

/** The tokenized payment source to fund a payment. */
export type Token = {
  /** The PayPal-generated ID for the token. */
  id: string;
  /** The tokenization method that generated the ID. */
  type: TokenType;
};

export const tokenSchema: Schema<Token> = s.object<Token>({
  id: s.string(),
  type: tokenTypeSchema,
});
