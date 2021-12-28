import { existsSync, writeFileSync } from "node:fs";
import { extname } from "node:path";
import { Command } from "commander";

import resolveConfig from "tailwindcss/resolveConfig";
import feval from "file-eval";

import { generateColors } from "./generators/colors";
import { indent } from "./shared/indent";

const program = new Command();

program.arguments("[tailwind_config_file]").action(async (tailwindConfig) => {
  const configPath = tailwindConfig ?? "./tailwind.config.js";

  if (!existsSync(configPath)) {
    console.error("Path does not exist.");
  } else if (extname(configPath) !== ".js") {
    console.error(
      "This program currently only works with .js Tailwind config files."
    );
  } else {
    const evald = await feval(configPath);
    const config = resolveConfig(evald);

    const { theme } = config;
    const { colors } = theme;

    let baseEnum = `enum Tailwind {\n`;

    if (colors) {
      baseEnum += indent(generateColors(colors as any), 2, " ");
    }

    baseEnum + "\n}";

    writeFileSync("Tailwind.swift", baseEnum, "utf-8");
  }
});

program.parse(process.argv);
