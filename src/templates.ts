import { compile } from "eta";

export const swiftUIColor = compile(
  "Color(.sRGB, red: <%= it.r %>, green: <%= it.g %>, blue: <%= it.b %>, opacity: <%= it.a %>)"
);

export const swiftLetMember = compile(
  "public let <%= it.name %>: <%= it.type %>;\n"
);

export const swiftLet = compile(
  "public let <%= it.variable %> = <%= it.value %>;\n"
);

export const swiftStaticLet = compile(
  "public static let <%= it.variable %> = <%= it.value %>;\n"
);

export const swiftEnum = compile(
  `public enum <%= it.name %> {\n\n<%= it.children.join('\\n').replace(/^(?=.)/gm, '  ') %>\n\n}\n`
);

export const swiftStruct = compile(
  `public struct <%= it.name %> {\n\n<%= it.children.join('\\n').replace(/^(?=.)/gm, '  ') %>\n\n}\n`
);
