import fs from 'fs-extra';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { createFile } from './file-system';
import { promptForProjectType, promptForPrettier } from './prompts';
import { generateReadmeContent } from '../template/readme';
import { generatePrettierConfig } from '../template/prettier';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export async function createProject(
  projectDirectory: string,
  includeAuth: boolean
): Promise<void> {
  try {
    console.log(`Creating a new project in ${projectDirectory}...`);

    const projectType = await promptForProjectType();
    const usePrettier = await promptForPrettier();

    const isTypeScript = projectType === 'typescript';
    const projectName = path.basename(projectDirectory);

    // Determine the template directory
    const templateDir = path.join(
      __dirname,
      '..',
      'template',
      isTypeScript ? 'typescript' : 'javascript',
      includeAuth ? 'auth' : 'base'
    );

    console.log(`Copying template from ${templateDir} to ${projectDirectory}`);
    await fs.copy(templateDir, projectDirectory);

    // Update package.json
    const packageJsonPath = path.join(projectDirectory, 'package.json');
    console.log(`Updating ${packageJsonPath}`);

    const packageJson = await fs.readJson(packageJsonPath);
    packageJson.name = projectName;

    if (usePrettier) {
      packageJson.scripts.format = 'prettier --write "src/**/*.{js,ts}"';
      packageJson.devDependencies.prettier = '^2.5.1';
    }
    await fs.writeJson(packageJsonPath, packageJson, { spaces: 2 });

    // Generate README.md
    console.log('Generating README.md');
    const readmeContent = generateReadmeContent({
      projectName,
      isTypeScript,
      usePrettier,
    });
    await createFile(path.join(projectDirectory, 'README.md'), readmeContent);

    if (usePrettier) {
      await generatePrettierConfig(projectDirectory);
    }

    console.log('Project created successfully!');
    console.log('To get started, run:');
    console.log(`  cd ${projectDirectory}`);
    console.log('  npm install');
    console.log('  npm run dev');
  } catch (error) {
    console.error('Error creating project:', error);
    if (error instanceof Error) {
      console.error('Error message:', error.message);
      console.error('Stack trace:', error.stack);
    }
  }
}
