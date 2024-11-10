import fs from 'fs-extra';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { intro, outro, spinner } from '@clack/prompts';

// import { createFile } from './file-system';
import {
  promptForProjectType,
  promptForSelectingFormatter,
  promptForSelectingLinting,
} from './prompts';
// import { generateReadmeContent } from '../template/readme';
// import { generatePrettierConfig } from '../template/prettier';
import { renderTitle } from './utils/render-title';
import { createReadmeFile } from './helpers/createReadmeFile';
import { createPrettierConfig } from './helpers/createPrettierConfig';
import { createEslintConfig } from './helpers/createEslintConfig';

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

    const copySpinner = spinner();
    copySpinner.start('Copying template files');
    await fs.copy(templateDir, projectDirectory);
    copySpinner.stop('Template files copied successfully');

    if (formatterEnabled) await createPrettierConfig({ projectDirectory });

    if (linterEnabled) await createEslintConfig({ projectDirectory });

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
