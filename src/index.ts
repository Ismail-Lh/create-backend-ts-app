#!/usr/bin/env node

import { program } from 'commander';
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

program
  .version('1.0.0')
  .argument('[project-directory]', 'Directory to create the project in', '.')
  .action(async (projectDirectory) => {
    try {
      console.log(`Creating a new project in ${projectDirectory}...`);

      // Create project directory if it doesn't exist
      await fs.mkdir(projectDirectory, { recursive: true });

      // Create a simple package.json
      const packageJson = {
        name: path.basename(projectDirectory),
        version: '1.0.0',
        description: 'A project created with create-my-app',
        main: 'index.js',
        scripts: {
          start: 'node index.js',
        },
      };

      await fs.writeFile(
        path.join(projectDirectory, 'package.json'),
        JSON.stringify(packageJson, null, 2)
      );

      // Create a simple index.js
      const indexJs = `console.log('Hello from create-my-app!');`;
      await fs.writeFile(path.join(projectDirectory, 'index.js'), indexJs);

      console.log('Project created successfully!');
      console.log('To get started, run:');
      console.log(`  cd ${projectDirectory}`);
      console.log('  npm install');
      console.log('  npm start');
    } catch (error) {
      console.error('Error creating project:', error);
    }
  });

program.parse(process.argv);
