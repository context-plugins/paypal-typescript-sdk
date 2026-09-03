import * as s from "../core/validation/index.js";
import type { Schema } from "../core/validation/schema.js";
import { tokenTypeSchema, type TokenType } from "./token-type.js";

export type Token = {
  id: string;
  type: TokenType;
};

export const tokenSchema: Schema<Token> = s.object<Token>({
  id: s.string(),
  type: tokenTypeSchema,
});
