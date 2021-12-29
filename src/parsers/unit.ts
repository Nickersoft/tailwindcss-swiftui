export function parseUnit(unitStr: string) {
  const matches = /(\d*\.?\d+)\s?(rem|px|em|ex|%|in|cn|mm|pt|pc+)/gim.exec(
    unitStr
  );

  const num = matches?.[1];
  const unit = matches?.[2];

  return { value: num, unit };
}
