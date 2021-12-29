import { createSwiftEnum } from "../utils/createSwiftEnum.js";
import { colorToSwiftUI } from "../utils/colorToSwiftUI.js";

const unsupportedColors = ["currentColor"];

export const generateColors = (colors?: object, name: string = "Colors") =>
  createSwiftEnum(colors, name, (value) => {
    if (!unsupportedColors.includes(value)) {
      return colorToSwiftUI(value);
    }

    return null;
  });
