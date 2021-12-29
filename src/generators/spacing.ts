import _ from "lodash";

import { createSwiftEnum } from "../utils/createSwiftEnum.js";
import { parseUnit } from "../parsers/unit.js";
import { convertUnit } from "../converters/unit.js";

import log from "../utils/log.js";

export const generateSpacing = (spacing?: object, name: string = "Spacing") => {
  const enumeration = createSwiftEnum(spacing, name, (value) => {
    const { value: num, unit } = parseUnit(value);

    if (!num) {
      log.warn(`Could not understand spacing value "${value}". Skipping.`);
    } else if (!unit || unit === "em") {
      log.warn(
        `Could not translate spacing value "${value}" into absolute pixels. Skipping.`
      );
    } else {
      let n = parseFloat(num);

      if (unit === "rem") {
        return (n * 16).toString();
      } else {
        const converted = convertUnit(n, unit, "px");
        console.log(converted);
        if (converted === null) {
          log.warn(`Could not convert value "${n}${unit}". Skipping.`);
        } else {
          return converted.toString();
        }
      }
    }

    return null;
  });

  if (enumeration.length > 0) {
    return enumeration;
  }

  return "";
};
