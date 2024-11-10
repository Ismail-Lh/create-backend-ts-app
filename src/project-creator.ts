import fs from 'fs-extra';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { intro, outro, spinner } from '@clack/prompts';

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
    intro(`Creating a new project in ${projectDirectory}...`);

    const projectType = await promptForProjectType();
    if (!projectType) {
      throw new Error('Project type selection was cancelled.');
    }

    const usePrettier = await promptForPrettier();
    if (usePrettier === null) {
      throw new Error('Prettier selection was cancelled.');
    }

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

    const copySpinner = spinner();
    copySpinner.start('Copying template files');
    await fs.copy(templateDir, projectDirectory);
    copySpinner.stop('Template files copied successfully');

    const packageJsonPath = path.join(projectDirectory, 'package.json');
    const updatePackageSpinner = spinner();
    updatePackageSpinner.start('Updating package.json');
    const packageJson = await fs.readJson(packageJsonPath);
    packageJson.name = projectName;
    if (usePrettier) {
      packageJson.scripts.format = 'prettier --write "src/**/*.{js,ts}"';
      packageJson.devDependencies.prettier = '^2.5.1';
    }
    await fs.writeJson(packageJsonPath, packageJson, { spaces: 2 });
    updatePackageSpinner.stop('package.json updated successfully');

    const readmeSpinner = spinner();
    readmeSpinner.start('Generating README.md');
    const readmeContent = generateReadmeContent({
      projectName,
      isTypeScript,
      usePrettier,
    });
    await createFile(path.join(projectDirectory, 'README.md'), readmeContent);
    readmeSpinner.stop('README.md generated successfully');

    if (usePrettier) {
      const prettierSpinner = spinner();
      prettierSpinner.start('Generating Prettier configuration');
      await generatePrettierConfig(projectDirectory);
      prettierSpinner.stop('Prettier configuration generated successfully');
    }

    outro('Project created successfully!');
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
