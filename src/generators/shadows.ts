import _ from "lodash";

import { compile, config } from "eta";

import { createSwiftEnum } from "../utils/createSwiftEnum.js";
import { parseShadow } from "../utils/parseShadow.js";
import { swiftLetMember, swiftStruct } from "../templates.js";
import { colorToSwiftUI } from "../utils/colorToSwiftUI.js";

import log from "../utils/log.js";

export const tailwindShadowValue = compile(
  `Shadow(color: <%= it.color %>, x: <%= it.x %>, y: <%= it.y %>, blur: <%= it.blur %>)`
);

const { isNil, isString } = _;

const shadowStruct = swiftStruct(
  {
    name: "Shadow",
    children: [
      swiftLetMember({ name: "color", type: "Color" }, config),
      swiftLetMember({ name: "x", type: "CGFloat" }, config),
      swiftLetMember({ name: "y", type: "CGFloat" }, config),
      swiftLetMember({ name: "blur", type: "CGFloat" }, config),
    ],
  },
  config
);

export const generateShadows = (shadows?: object, name: string = "Shadows") => {
  const enumeration = createSwiftEnum(shadows, name, (value) => {
    const { color, inset, offsetX, spreadRadius, offsetY, blurRadius } =
      parseShadow(value);

    if (isNil(offsetX) || isNil(offsetY) || isNil(blurRadius)) {
      log.warn(
        `Numeric values for x, y, and blurRadius are required to generate shadows. Skipping shadow with value "${value}".`
      );
    } else if (isString(offsetX) || isString(offsetY) || isString(blurRadius)) {
      log.warn(
        `Non-integer shadow values (rem, em, etc.) are not supported. Skipping shadow with value "${value}".`
      );
    } else if (inset) {
      log.warn(
        `Inset shadows are not supported out-of-the-box by SwiftUI. Skipping shadow with value "${value}".`
      );
    } else {
      if (spreadRadius) {
        log.warn(
          "Spread radius is not supported by SwiftUI. This value will be ignored."
        );
      }

      return tailwindShadowValue(
        {
          color: colorToSwiftUI(color ?? "rgba(0, 0, 0, 1)"),
          x: offsetX,
          y: offsetY,
          blur: blurRadius,
        },
        config
      );
    }

    return null;
  });

  if (enumeration.length > 0) {
    return [shadowStruct, enumeration].join("\n");
  }

  return "";
};
