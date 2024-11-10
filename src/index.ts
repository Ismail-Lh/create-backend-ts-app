#!/usr/bin/env node

import { program } from 'commander';
import { createProject } from './project-creator';
import { intro, outro } from '@clack/prompts';

/**
 * Entry point for the create-node-nest CLI.
 *
 * This script uses the Commander library to handle command-line arguments and options.
 * It allows users to create a new project in a specified directory with optional authentication templates.
 *
 * @packageDocumentation
 */
program
  .version('1.0.0')
  .argument('<project-directory>', 'Directory to create the project in')
  .option('--auth', 'Include authentication template')
  .action(async (projectDirectory, options) => {
    intro('Welcome to create-node-nest!');
    await createProject(projectDirectory, options.auth || false);
    outro('Thank you for using create-node-nest!');
  });

program.parse(process.argv);
