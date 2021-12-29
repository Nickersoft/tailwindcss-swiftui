const PARTS_REG = /\s(?![^(]*\))/;
const LENGTH_REG = /^[0-9]+[a-zA-Z%]+?$/;

const isLength = (v) => v === "0" || LENGTH_REG.test(v);

const toNum = (v) => {
  if (!/px$/.test(v) && v !== "0") return v;
  const n = parseFloat(v);
  return !isNaN(n) ? n : v;
};

interface Shadow {
  inset?: boolean;
  offsetX?: number | string;
  offsetY?: number | string;
  blurRadius?: string | string;
  spreadRadius?: number | string;
  color?: string;
}

// Taken from
// https://github.com/jxnblk/css-box-shadow/blob/master/index.js
export function parseShadow(str): Shadow {
  const parts = str.split(PARTS_REG);
  const inset = parts.includes("inset");
  const last = parts.slice(-1)[0];
  const color = !isLength(last) ? last : undefined;

  const nums = parts
    .filter((n) => n !== "inset")
    .filter((n) => n !== color)
    .map(toNum);

  const [offsetX, offsetY, blurRadius, spreadRadius] = nums;

  return {
    inset,
    offsetX,
    offsetY,
    blurRadius,
    spreadRadius,
    color,
  };
}
