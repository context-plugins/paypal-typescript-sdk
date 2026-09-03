import * as s from "../core/validation/index.js";
import type { EnumSchema } from "../core/validation/schema.js";

export const LinkHttpMethod = {
  Get: "GET",
  Post: "POST",
  Put: "PUT",
  Delete: "DELETE",
  Head: "HEAD",
  Connect: "CONNECT",
  Options: "OPTIONS",
  Patch: "PATCH",
} as const;
export type LinkHttpMethod = (typeof LinkHttpMethod)[keyof typeof LinkHttpMethod] | (string & {});

export const linkHttpMethodSchema: EnumSchema<LinkHttpMethod> = s.enumOf<LinkHttpMethod>(LinkHttpMethod);
