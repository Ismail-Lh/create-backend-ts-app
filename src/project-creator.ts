import path from 'node:path';

import { createDirectoryStructure, createFile } from './file-system';
import { promptForProjectType } from './prompts';
import { generateTypeScriptFiles } from './templates/typescript';
import { generateJavaScriptFiles } from './templates/javascript';
import type { ProjectConfig } from './types';
import { generateReadmeContent } from './templates/readme';

/**
 * Creates a new project in the specified directory.
 *
 * This function prompts the user for the type of project (TypeScript or JavaScript),
 * creates the necessary directory structure, generates the `package.json` file,
 * and creates the appropriate project files based on the selected project type.
 *
 * @param {string} projectDirectory - The directory where the new project will be created.
 * @returns {Promise<void>} A promise that resolves when the project has been created successfully.
 *
 * @throws Will throw an error if there is an issue creating the project.
 */
export async function createProject(projectDirectory: string): Promise<void> {
  try {
    console.log(`Creating a new project in ${projectDirectory}...`);

    const projectType = await promptForProjectType();
    const isTypeScript = projectType === 'typescript';
    const projectName = path.basename(projectDirectory);

    await createDirectoryStructure(projectDirectory);

    const packageJson = generatePackageJson(projectDirectory, isTypeScript);
    await createFile(
      path.join(projectDirectory, 'package.json'),
      JSON.stringify(packageJson, null, 2)
    );

    // Generate README.md
    const readmeContent = generateReadmeContent({
      projectName,
      isTypeScript,
    });
    await createFile(path.join(projectDirectory, 'README.md'), readmeContent);

    if (isTypeScript) {
      await generateTypeScriptFiles(projectDirectory);
    } else {
      await generateJavaScriptFiles(projectDirectory);
    }

    console.log('Project created successfully!');
    console.log('To get started, run:');
    console.log(`  cd ${projectDirectory}`);
    console.log('  npm install');
    console.log('  npm run dev');
  } catch (error) {
    console.error('Error creating project:', error);
  }
}

/**
 * Generates a package.json configuration object for a new project.
 *
 * @param projectDirectory - The directory of the project.
 * @param isTypeScript - A boolean indicating if the project uses TypeScript.
 * @returns A ProjectConfig object containing the package.json configuration.
 */
function generatePackageJson(
  projectDirectory: string,
  isTypeScript: boolean
): ProjectConfig {
  return {
    name: path.basename(projectDirectory),
    version: '1.0.0',
    description: 'A project created with create-my-app',
    main: isTypeScript ? 'dist/server.js' : 'src/server.js',
    scripts: {
      start: isTypeScript ? 'node dist/server.js' : 'node src/server.js',
      dev: isTypeScript
        ? 'nodemon --watch src --ext ts --exec ts-node src/server.ts'
        : 'nodemon src/server.js',
      ...(isTypeScript ? { build: 'tsc' } : {}),
    },
    dependencies: {
      express: '^4.17.1',
    },
    devDependencies: {
      nodemon: '^2.0.15',
      ...(isTypeScript
        ? {
            '@types/express': '^4.17.13',
            '@types/node': '^16.11.12',
            'ts-node': '^10.4.0',
            typescript: '^4.5.2',
          }
        : {}),
    },
  };
}
