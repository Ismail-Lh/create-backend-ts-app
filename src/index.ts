#!/usr/bin/env node

/**
 * Entry point for the CLI tool.
 *
 * This script sets up a command-line interface (CLI) using the `commander` library.
 * It defines a single command that creates a new project in a specified directory.
 *
 * @packageDocumentation
 */

import { program } from 'commander';
import { createProject } from './project-creator';

/**
 * Sets up the CLI tool with version information and command definitions.
 *
 * - `version`: Specifies the version of the CLI tool.
 * - `argument`: Defines an optional argument `[project-directory]` which specifies the directory to create the project in. Defaults to the current directory (`.`).
 * - `action`: Specifies the action to be taken when the command is executed, which is to call the `createProject` function.
 */
program
  .version('1.0.0')
  .argument('[project-directory]', 'Directory to create the project in', '.')
  .option('--auth', 'Include authentication template')
  .action((projectDirectory, options) => {
    createProject(projectDirectory, options.auth || false);
  });

program.parse(process.argv);

console.log('CLI tool is running and watching for changes...');
