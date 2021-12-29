import Color from "color";

import { config } from "eta";

import { swiftUIColor } from "../templates.js";

export function colorToSwiftUI(color: string) {
  try {
    const converted =
      color === "transparent" ? Color.rgb(0, 0, 0, 0) : Color(color);

    return swiftUIColor(
      {
        r: converted.red(),
        g: converted.green(),
        b: converted.blue(),
        a: converted.alpha(),
      },
      config
    );
  } catch {
    return "";
  }
}
