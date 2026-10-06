import * as s from "../core/validation/index.js";
import type { Schema } from "../core/validation/schema.js";
import { linkHttpMethodSchema, type LinkHttpMethod } from "./link-http-method.js";

/** The request-related [HATEOAS link](/api/rest/responses/#hateoas-links) information. */
export type LinkDescription = {
  /**
   * The complete target URL. To make the related call, combine the method with this [URI
   * Template-formatted](https://tools.ietf.org/html/rfc6570) link. For pre-processing, include the
   * `$`, `(`, and `)` characters. The `href` is the key HATEOAS component that links a completed
   * call with a subsequent call.
   */
  href: string;
  /**
   * The [link relation type](https://tools.ietf.org/html/rfc5988#section-4), which serves as an ID
   * for a link that unambiguously describes the semantics of the link. See [Link
   * Relations](https://www.iana.org/assignments/link-relations/link-relations.xhtml).
   */
  rel: string;
  /** The HTTP method required to make the related call. */
  method?: LinkHttpMethod;
};

export const linkDescriptionSchema: Schema<LinkDescription> = s.object<LinkDescription>({
  href: s.string(),
  rel: s.string(),
  method: s.optional(s.lazy(() => linkHttpMethodSchema)),
});
