const { pnpPlugin } = require("@yarnpkg/esbuild-plugin-pnp");
const { build } = require("esbuild");

build({
  outfile: "./dist/cli.js",
  bundle: true,
  platform: "node",
  entryPoints: ["./src/main.ts"],
  plugins: [pnpPlugin()],
});
