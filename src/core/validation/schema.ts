import * as zod from "zod/v4-mini";
import type { ZodMiniType } from "zod/v4-mini";
import { decodeWith, encodeWith } from "./schema-error.js";

export type Encoded<T> = T extends Date
  ? string | number
  : T extends Uint8Array
    ? string
    : T extends string | number | boolean | null | undefined
      ? T
      : T extends readonly (infer E)[]
        ? Encoded<E>[]
        : T extends object
          ? { [K in keyof T]: Encoded<T[K]> }
          : T;

export type KeysMap<T> = { readonly [K in keyof T]?: string };

export type Entry<V, W = unknown> = ZodMiniType<V, W> | Schema<V, W>;

export type Shape<T> = { [K in keyof T]-?: Entry<T[K]> } & { readonly _keysMap?: KeysMap<T> };

export type Schema<T, W = Encoded<T>> = {
  readonly decode: (value: unknown) => T;
  readonly encode: (value: unknown) => W;
};

export type EnumSchema<T> = Schema<T, T> & {
  readonly values: readonly T[];
};

type Built<T, W> = Schema<T, W> & {
  readonly zod: () => ZodMiniType<T, W>;
  readonly tagged: (discriminator: string, value: string) => ZodMiniType<T, W>;
};

export function object<T>(shape: Shape<T>): Schema<T, Encoded<T>> {
  let memo: ZodMiniType<T, Encoded<T>> | undefined;
  const zodType = (): ZodMiniType<T, Encoded<T>> => (memo ??= buildObject(shape));
  return {
    zod: zodType,
    tagged: (discriminator, value) => buildObject(shape, [discriminator, value]),
    decode: (value) => decodeWith(zodType(), value),
    encode: (value) => encodeWith(zodType(), value),
  } as Built<T, Encoded<T>>;
}

export function discriminatedUnion<T>(
  discriminator: string,
  variants: Readonly<Record<string, Schema<unknown, unknown>>>,
): Schema<T, Encoded<T>> {
  let memo: ZodMiniType<T, Encoded<T>> | undefined;
  const build = (): ZodMiniType<T, Encoded<T>> => {
    const members = Object.entries(variants).map(([value, variant]) =>
      built(variant).tagged(discriminator, value),
    );
    return zod.discriminatedUnion(discriminator, members as never);
  };
  const zodType = (): ZodMiniType<T, Encoded<T>> => (memo ??= build());
  return {
    zod: zodType,
    tagged: () => zodType(),
    decode: (value) => decodeWith(zodType(), value),
    encode: (value) => encodeWith(zodType(), value),
  } as Built<T, Encoded<T>>;
}

export function enumOf<T extends string | number>(members: Readonly<Record<string, T>>): EnumSchema<T> {
  const values = Object.values(members);
  const base: ZodMiniType<unknown, unknown> = values.every((value) => typeof value === "number")
    ? zod.number()
    : zod.string();
  return {
    ...of(base as ZodMiniType<T, T>),
    values,
  };
}

export function of<T, W = Encoded<T>>(zodType: ZodMiniType<T, W>): Schema<T, W> {
  return {
    zod: () => zodType,
    tagged: () => zodType,
    decode: (value) => decodeWith(zodType, value),
    encode: (value) => encodeWith(zodType, value),
  } as Built<T, W>;
}

function buildObject<T>(shape: Shape<T>, tag?: readonly [string, string]): ZodMiniType<T, Encoded<T>> {
  const keysMap = (shape as { _keysMap?: Record<string, string> })._keysMap ?? {};
  const wire: Record<string, ZodMiniType<unknown, unknown>> = {};
  const renames: [string, string][] = [];

  for (const [key, entry] of Object.entries(shape)) {
    if (key === "_keysMap") continue;
    const wireKey = keysMap[key] ?? key;
    wire[wireKey] = resolve(entry as Entry<unknown>);
    if (wireKey !== key) renames.push([wireKey, key]);
  }
  if (tag) wire[tag[0]] = zod.literal(tag[1]);

  const object: ZodMiniType<Record<string, unknown>, Record<string, unknown>> = zod.looseObject(wire);
  const renaming: ZodMiniType<unknown, unknown> =
    renames.length === 0
      ? object
      : zod.codec(object, zod.custom<Record<string, unknown>>(), {
          decode: (value) => renameKeys(value, renames, "decode"),
          encode: (value) => renameKeys(value, renames, "encode"),
        });
  return renaming as ZodMiniType<T, Encoded<T>>;
}

function renameKeys(
  value: Record<string, unknown>,
  renames: readonly [string, string][],
  direction: "decode" | "encode",
): Record<string, unknown> {
  const out = { ...value };
  for (const [wireKey, key] of renames) {
    const [from, to] = direction === "decode" ? [wireKey, key] : [key, wireKey];
    if (!(from in out)) continue;
    out[to] = out[from];
    delete out[from];
  }
  return out;
}

export function resolve<T>(entry: Entry<T, Encoded<T>>): ZodMiniType<T, Encoded<T>> {
  return isSchema(entry) ? built(entry).zod() : entry;
}

function built<T>(schema: Schema<T, Encoded<T>>): Built<T, Encoded<T>> {
  return schema as Built<T, Encoded<T>>;
}

function isSchema<V, W>(entry: Entry<V, W>): entry is Schema<V, W> {
  return typeof (entry as { decode?: unknown }).decode === "function";
}
