import _ from "lodash";

import { config } from "eta";

import templates from "../templates.js";

const { camelCase, isObject, isString, startCase } = _;

function _createEnumName(str: string) {
  return startCase(str).replace(/\s+/g, "");
}

function _safeVariableName(str: string, prefix: string) {
  let variableName = str;

  // Numbers can't be variable names, so if the key
  // is a number string, prefix the enum name to avoid errors
  if (/^\d+$/.test(variableName)) {
    variableName = camelCase(prefix) + str;
  }

  return variableName;
}

function _createSwiftEnum(
  obj: object,
  name: string,
  level: number,
  processValue: (value: string | number) => string | null
) {
  const children = Object.entries(obj).reduce((code, [key, value]) => {
    if (isObject(value)) {
      const generatedEnum = _createSwiftEnum(
        value,
        _createEnumName(key),
        level + 1,
        processValue
      );

      if (generatedEnum.length > 0) {
        return [...code, generatedEnum];
      }
    }

    if (isString(value)) {
      const processed = processValue(value);

      if (processed !== null) {
        const line = templates.let.assignment.static(
          {
            variable: _safeVariableName(key, name),
            value: processed,
          },
          config
        );

        return [...code, line];
      }
    }

    return code;
  }, [] as string[]);

  if (children.length > 0) {
    return templates.enum({ name, children }, config);
  }

  return "";
}

export function createSwiftEnum(
  obj: object | undefined,
  name: string,
  processValue: (value) => string | null
) {
  if (!obj) return "";
  return _createSwiftEnum(obj, name, 1, processValue);
}
