import { repeat } from "lodash";

export function indent(str: string, length: number, character: string = " ") {
  return str
    .split("\n")
    .map((s) => (s.length > 0 ? repeat(character, length) + s : s))
    .join("\n");
}
