"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildProject = buildProject;
var esbuild = require("esbuild");
var path = require("path");
var fs = require("fs");
var native_federation_esbuild_1 = require("@softarc/native-federation-esbuild");
var build_1 = require("@softarc/native-federation/build");
function buildProject(projectName) {
    return __awaiter(this, void 0, void 0, function () {
        var tsConfig, outputPath;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    tsConfig = "tsconfig.json";
                    outputPath = "dist/".concat(projectName);
                    /*
                     *  Step 1: Initialize Native Federation
                     */
                    return [4 /*yield*/, build_1.federationBuilder.init({
                            options: {
                                workspaceRoot: path.join(__dirname, ".."),
                                outputPath: outputPath,
                                tsConfig: tsConfig,
                                federationConfig: "/federation.config.js",
                                verbose: false,
                            },
                            /*
                             * As this core lib is tooling-agnostic, you
                             * need a simple adapter for your bundler.
                             * It's just a matter of one function.
                             */
                            adapter: native_federation_esbuild_1.esBuildAdapter,
                        })];
                case 1:
                    /*
                     *  Step 1: Initialize Native Federation
                     */
                    _a.sent();
                    /*
                     *  Step 2: Trigger your build process
                     *
                     *      You can use any tool for this. Here, we go with a very
                     *      simple esbuild-based build.
                     *
                     *      Just respect the externals in `federationBuilder.externals`.
                     */
                    fs.rmSync(outputPath, { force: true, recursive: true });
                    return [4 /*yield*/, esbuild.build({
                            entryPoints: [path.join(__dirname, "../src/index.js")],
                            external: build_1.federationBuilder.externals,
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
                        })];
                case 2:
                    _a.sent();
                    fs.copyFileSync(path.join(__dirname, "../public/index.html"), "dist/".concat(projectName, "/index.html"));
                    fs.copyFileSync(path.join(__dirname, "../public/favicon.ico"), "dist/".concat(projectName, "/favicon.ico"));
                    //fs.copyFileSync(`${projectName}/styles.css`, `dist/${projectName}/styles.css`);
                    /*
                     *  Step 3: Let the build method do the additional tasks
                     *       for supporting Native Federation
                     */
                    return [4 /*yield*/, build_1.federationBuilder.build()];
                case 3:
                    //fs.copyFileSync(`${projectName}/styles.css`, `dist/${projectName}/styles.css`);
                    /*
                     *  Step 3: Let the build method do the additional tasks
                     *       for supporting Native Federation
                     */
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
