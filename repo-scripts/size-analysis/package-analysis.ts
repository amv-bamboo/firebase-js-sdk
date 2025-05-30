/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { resolve, basename, dirname } from 'path';
import {
  generateReport,
  generateReportForModules,
  writeReportToFile,
  Report,
  ErrorCode,
  writeReportToDirectory
} from './analysis-helper';
import glob from 'glob';
import * as fs from 'fs';

const projectRoot = dirname(resolve(__dirname, '../../package.json'));
/**
 * Support Command Line Options
 * -- inputModule (optional) : can be left unspecified which results in running analysis on all exp modules.
 *            can specify one to many module names separated by space.
 *            eg: --inputModule "@firebase/functions-exp" "firebase/auth-exp"
 *
 * -- inputDtsFile (optional) : adhoc support. Specify a path to dts file. Must enable -- inputBundleFile if this flag is specified.
 *
 * -- inputBundleFile (optional): adhoc support. Specify a path to bundle file. Must enable -- inputDtsFile if this flag is specified.
 *
 * --output (required): output directory or file where reports will be generated.
 *          specify a directory if module(s) are analyzed
 *          specify a file path if ad hoc analysis is to be performed
 *
 */
interface PackageAnalysisOptions {
  inputModule: string[];
  inputDtsFile: string;
  inputBundleFile: string;
  output: string;
}
/**
 * Entry Point of the Tool.
 * The function first checks if it's an adhoc run (by checking whether --inputDtsFile and --inputBundle are both enabled)
 * The function then checks whether --inputModule flag is specified; Run analysis on all modules if not, run analysis on selected modules if enabled.
 * Throw INVALID_FLAG_COMBINATION error if neither case fulfill.
 */
export async function analyzePackageSize(
  argv: PackageAnalysisOptions
): Promise<void> {
  // check if it's an adhoc run
  // adhoc run report can only be redirected to files
  if (argv.inputDtsFile && argv.inputBundleFile && argv.output) {
    const jsonReport: Report = await generateReport(
      'adhoc',
      argv.inputDtsFile,
      argv.inputBundleFile
    );
    writeReportToFile(jsonReport, resolve(argv.output));
  } else if (!argv.inputDtsFile && !argv.inputBundleFile) {
    // retrieve All Module Names
    let allModulesLocation = await mapWorkspaceToPackages([
      `${projectRoot}/packages/*`
    ]);
    allModulesLocation = allModulesLocation.filter(path => {
      const pkgJsonPath = `${path}/package.json`;
      if (!fs.existsSync(pkgJsonPath)) {
        return false;
      }

      const json = JSON.parse(
        fs.readFileSync(`${path}/package.json`, { encoding: 'utf-8' })
      );
      return (
        json.name.startsWith('@firebase') &&
        !json.name.includes('-compat') &&
        !json.name.includes('-types')
      );
    });
    if (argv.inputModule) {
      allModulesLocation = allModulesLocation.filter(path => {
        const json = JSON.parse(
          fs.readFileSync(`${path}/package.json`, { encoding: 'utf-8' })
        );
        return argv.inputModule.includes(json.name);
      });
    }
    let writeFiles: boolean = false;
    if (argv.output) {
      writeFiles = true;
    }

    const reports: Report[] = await generateReportForModules(
      allModulesLocation
    );
    if (writeFiles) {
      for (const report of reports) {
        writeReportToDirectory(
          report,
          `${basename(report.name)}-dependencies.json`,
          resolve(argv.output)
        );
      }
    }
  } else {
    throw new Error(ErrorCode.INVALID_FLAG_COMBINATION);
  }
}

function mapWorkspaceToPackages(workspaces: string[]): Promise<string[]> {
  return Promise.all<Promise<string[]>>(
    workspaces.map<Promise<string[]>>(
      workspace =>
        new Promise<string[]>(resolve => {
          glob(workspace, (err, paths) => {
            if (err) {
              throw err;
            }
            resolve(paths);
          });
        })
    )
  ).then(paths => paths.reduce((arr, val) => arr.concat(val), []));
}
