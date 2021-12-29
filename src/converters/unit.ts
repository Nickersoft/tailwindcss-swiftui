/**
 * The MIT License (MIT)
 * Copyright 2015 Andy Jansson <andyjansson@users.noreply.github.com>
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of
 * this software and associated documentation files (the "Software"), to deal in
 * the Software without restriction, including without limitation the rights to
 * use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
 * the Software, and to permit persons to whom the Software is furnished to do so,
 * subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
 * FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
 * COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
 * IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
 * CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 *
 * Source: https://raw.githubusercontent.com/andyjansson/css-unit-converter/master/index.js
 *
 */
var conversions = {
  // length
  px: {
    px: 1,
    cm: 96.0 / 2.54,
    mm: 96.0 / 25.4,
    in: 96,
    pt: 96.0 / 72.0,
    pc: 16,
  },
  cm: {
    px: 2.54 / 96.0,
    cm: 1,
    mm: 0.1,
    in: 2.54,
    pt: 2.54 / 72.0,
    pc: 2.54 / 6.0,
  },
  mm: {
    px: 25.4 / 96.0,
    cm: 10,
    mm: 1,
    in: 25.4,
    pt: 25.4 / 72.0,
    pc: 25.4 / 6.0,
  },
  in: {
    px: 1.0 / 96.0,
    cm: 1.0 / 2.54,
    mm: 1.0 / 25.4,
    in: 1,
    pt: 1.0 / 72.0,
    pc: 1.0 / 6.0,
  },
  pt: {
    px: 0.75,
    cm: 72.0 / 2.54,
    mm: 72.0 / 25.4,
    in: 72,
    pt: 1,
    pc: 12,
  },
  pc: {
    px: 6.0 / 96.0,
    cm: 6.0 / 2.54,
    mm: 6.0 / 25.4,
    in: 6,
    pt: 6.0 / 72.0,
    pc: 1,
  },
  // angle
  deg: {
    deg: 1,
    grad: 0.9,
    rad: 180 / Math.PI,
    turn: 360,
  },
  grad: {
    deg: 400 / 360,
    grad: 1,
    rad: 200 / Math.PI,
    turn: 400,
  },
  rad: {
    deg: Math.PI / 180,
    grad: Math.PI / 200,
    rad: 1,
    turn: Math.PI * 2,
  },
  turn: {
    deg: 1 / 360,
    grad: 1 / 400,
    rad: 0.5 / Math.PI,
    turn: 1,
  },
  // time
  s: {
    s: 1,
    ms: 1 / 1000,
  },
  ms: {
    s: 1000,
    ms: 1,
  },
  // frequency
  Hz: {
    Hz: 1,
    kHz: 1000,
  },
  kHz: {
    Hz: 1 / 1000,
    kHz: 1,
  },
  // resolution
  dpi: {
    dpi: 1,
    dpcm: 1.0 / 2.54,
    dppx: 1 / 96,
  },
  dpcm: {
    dpi: 2.54,
    dpcm: 1,
    dppx: 2.54 / 96.0,
  },
  dppx: {
    dpi: 96,
    dpcm: 96.0 / 2.54,
    dppx: 1,
  },
};

export function convertUnit(
  value: number,
  sourceUnit: string,
  targetUnit: string,
  precision?: number
) {
  if (!conversions.hasOwnProperty(targetUnit)) return null;
  if (!conversions[targetUnit].hasOwnProperty(sourceUnit)) return null;

  var converted = conversions[targetUnit][sourceUnit] * value;

  if (precision !== undefined) {
    precision = Math.pow(10, precision || 5);
    return Math.round(converted * precision) / precision;
  }

  return converted;
}
