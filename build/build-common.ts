import * as esbuild from "esbuild";
import * as path from "path";
import * as fs from "fs";
import { esBuildAdapter } from "@softarc/native-federation-esbuild";
import { federationBuilder } from "@softarc/native-federation/build";

export async function buildProject(projectName) {
  const tsConfig = "tsconfig.json";
  const outputPath = `dist/${projectName}`;
  /*
   *  Step 1: Initialize Native Federation
   */

  await federationBuilder.init({
    options: {
      workspaceRoot: path.join(__dirname, ".."),
      outputPath,
      tsConfig,
      federationConfig: `/federation.config.js`,
      verbose: false,
    },

    /*
     * As this core lib is tooling-agnostic, you
     * need a simple adapter for your bundler.
     * It's just a matter of one function.
     */
    adapter: esBuildAdapter,
  });

  /*
   *  Step 2: Trigger your build process
   *
   *      You can use any tool for this. Here, we go with a very
   *      simple esbuild-based build.
   *
   *      Just respect the externals in `federationBuilder.externals`.
   */

  fs.rmSync(outputPath, { force: true, recursive: true });

  await esbuild.build({
    entryPoints: [path.join(__dirname, "../src/index.js")],
    external: federationBuilder.externals,
    outdir: outputPath,
    bundle: true,
    platform: "browser",
    loader: { ".js": "jsx" },
    format: "esm",
    mainFields: ["es2020", "browser", "module", "main"],
    conditions: ["es2020", "es2015", "module"],
    resolveExtensions: [".ts", ".tsx", ".mjs", ".js", ".jsx"],
    tsconfig: tsConfig,
    splitting: true,
  });

  fs.copyFileSync(
    path.join(__dirname, "../public/index.html"),
    `dist/${projectName}/index.html`
  );
  fs.copyFileSync(
    path.join(__dirname, "../public/favicon.ico"),
    `dist/${projectName}/favicon.ico`
  );

  //fs.copyFileSync(`${projectName}/styles.css`, `dist/${projectName}/styles.css`);

  /*
   *  Step 3: Let the build method do the additional tasks
   *       for supporting Native Federation
   */

  await federationBuilder.build();
}
