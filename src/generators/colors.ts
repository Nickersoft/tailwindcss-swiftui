import Color from "color";

import { camelCase, isObject, isString, startCase } from "lodash";
import { indent } from "../shared/indent";

const unsupportedColors = ["currentColor"];

/**
 * Generates a Swift color enum for TailwindCSS colors
 *
 * @param colors The colors map from the Tailwind config
 * @param name The name of the generated enum
 * @param level Indentation level
 * @returns
 */
function _generateColors<T extends Record<string, string | T>>(
  colors: T,
  name: string,
  level: number = 1
): string {
  let initial = `enum ${name} {\n`;

  let code = Object.entries(colors).reduce((code, [key, value]) => {
    if (isObject(value)) {
      const enunName = startCase(key).replace(/\s+/g, "");
      const generatedEnum = _generateColors(value, enunName, level + 1);

      if (generatedEnum.length > 0) {
        return `${code}\n  ${generatedEnum}`;
      }
    }

    if (isString(value) && !unsupportedColors.includes(value)) {
      let color: Color;

      // Color.js can't parse "transparent", so we'll handle it manually
      if (value === "transparent") {
        color = Color.rgb(0, 0, 0, 0);
      } else {
        color = Color(value);
      }

      const swiftColor = [
        "Color(.sRGB, red: ",
        color.red(),
        ", green: ",
        color.green(),
        ", blue: ",
        color.blue(),
        ", opacity: ",
        color.alpha(),
        ")",
      ].join("");

      let variableName = key;

      // Numbers can't be variable names, so if the key
      // is a number string, prefix the enum name to avoid errors
      if (/^\d+$/.test(variableName)) {
        variableName = camelCase(name) + key;
      }

      const line = ["static let ", variableName, " = ", swiftColor, ";\n"];

      return code + indent(line.join(""), level, "  ");
    }

    return code;
  }, initial);

  if (code !== initial) {
    code += level > 1 ? indent("}\n\n", level, " ") : "}\n\n";
    return code.replace(/\n{2,}/g, "\n\n");
  }

  return "";
}

export const generateColors = <T extends Record<string, string | T>>(
  colors: T,
  name: string = "Colors"
) => _generateColors(colors, name, 1);
