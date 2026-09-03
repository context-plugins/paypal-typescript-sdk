import * as s from "../core/validation/index.js";
import type { Schema } from "../core/validation/schema.js";
import { linkHttpMethodSchema, type LinkHttpMethod } from "./link-http-method.js";

export type LinkDescription = {
  href: string;
  rel: string;
  method?: LinkHttpMethod;
};

export const linkDescriptionSchema: Schema<LinkDescription> = s.object<LinkDescription>({
  href: s.string(),
  rel: s.string(),
  method: s.optional(s.lazy(() => linkHttpMethodSchema)),
});
