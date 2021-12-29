import { compile } from "eta";

export default {
  color: compile(
    "Color(.sRGB, red: <%= it.r %>, green: <%= it.g %>, blue: <%= it.b %>, opacity: <%= it.a %>)"
  ),

  let: {
    declaration: compile("public let <%= it.name %>: <%= it.type %>\n\n"),
    assignment: {
      nonStatic: compile("public let <%= it.variable %> = <%= it.value %>\n"),
      static: compile(
        "public static let <%= it.variable %> = <%= it.value %>\n\n"
      ),
    },
  },

  enum: compile(
    `public enum <%= it.name %> {\n\n<%= it.children.join('\\n').replace(/^(?=.)/gm, '  ') %>\n\n}\n`
  ),

  struct: compile(
    `public struct <%= it.name %> {\n\n<%= it.children.join('\\n').replace(/^(?=.)/gm, '  ') %>\n\n}\n`
  ),
};
