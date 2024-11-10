import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { intro, outro } from '@clack/prompts';

import {
  promptForProjectType,
  promptForSelectingFormatter,
  promptForSelectingLinting,
} from './prompts';
import { renderTitle } from './utils/render-title';
import { createReadmeFile } from './helpers/createReadmeFile';
import { createPrettierConfig } from './helpers/createPrettierConfig';
import { createEslintConfig } from './helpers/createEslintConfig';
import { createProjectStructure } from './helpers/createProjectStructure';
import { createPackageJson } from './helpers/createPackageJson';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export async function createProject(
  projectDirectory: string,
  includeAuth: boolean
): Promise<void> {
  try {
    renderTitle();
    intro(`Creating a new project in ${projectDirectory}...`);

    const projectType = await promptForProjectType();
    if (!projectType) {
      throw new Error('Project type selection was cancelled.');
    }

    const formatterEnabled = await promptForSelectingFormatter();
    const linterEnabled = await promptForSelectingLinting();

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

    await createProjectStructure({ templateDir, projectDirectory });

    if (formatterEnabled) await createPrettierConfig({ projectDirectory });

    if (linterEnabled) await createEslintConfig({ projectDirectory });

    await createPackageJson({
      projectDirectory,
      projectName,
      isTypeScript,
      formatterEnabled,
      linterEnabled,
    });

    await createReadmeFile({
      projectDirectory,
      projectName,
      isTypeScript,
      formatterEnabled,
      linterEnabled,
    });

    // const packageJsonPath = path.join(projectDirectory, 'package.json');
    // const updatePackageSpinner = spinner();
    // updatePackageSpinner.start('Updating package.json');
    // const packageJson = await fs.readJson(packageJsonPath);
    // packageJson.name = projectName;
    // if (usePrettierFormatter) {
    //   packageJson.scripts.format = 'prettier --write "src/**/*.{js,ts}"';
    //   packageJson.devDependencies.prettier = '^2.5.1';
    // }
    // await fs.writeJson(packageJsonPath, packageJson, { spaces: 2 });
    // updatePackageSpinner.stop('package.json updated successfully');

    // if (usePrettierFormatter) {
    //   const prettierSpinner = spinner();
    //   prettierSpinner.start('Generating Prettier configuration');
    //   await generatePrettierConfig(projectDirectory);
    //   prettierSpinner.stop('Prettier configuration generated successfully');
    // }

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
