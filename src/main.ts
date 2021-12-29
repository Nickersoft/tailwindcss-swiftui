import { existsSync, writeFileSync } from "node:fs";
import { extname } from "node:path";
import { Command } from "commander";
import { config as etaConfig } from "eta";

import resolveConfig from "tailwindcss/resolveConfig.js";
import feval from "file-eval";

import { generateColors } from "./generators/colors.js";
import { swiftEnum } from "./templates.js";
import { generateShadows } from "./generators/shadows.js";

const program = new Command();

program
  .arguments("[tailwind_config_file] [outfile]")
  .action(async (tailwindConfig, outfile) => {
    const configPath = tailwindConfig ?? "./tailwind.config.js";
    const output = outfile ?? "Tailwind.swift";

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
      const { boxShadow, colors } = theme;

      const children = [generateColors(colors), generateShadows(boxShadow)];

      const baseEnum = swiftEnum(
        {
          name: "Tailwind",
          children,
        },
        etaConfig
      );

      const shadowExtension = `public extension View {
  func shadow(_ s: Tailwind.Shadow) {
    return self.shadow(color: s.color, x: s.x, y: s.y, blur: s.blur)
  }
}`;

      writeFileSync(
        output,
        ["import SwiftUI\n", baseEnum, shadowExtension].join("\n"),
        "utf-8"
      );
    }
  });

program.parse(process.argv);
