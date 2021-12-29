import { pnpPlugin } from "@yarnpkg/esbuild-plugin-pnp";
import { build } from "esbuild";

build({
  outfile: "./dist/cli.cjs",
  bundle: true,
  platform: "node",
  target: "node16",
  entryPoints: ["./src/main.ts"],
  plugins: [pnpPlugin()],
});
