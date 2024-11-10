import { note, select } from '@clack/prompts';
import type { ProjectType } from './types';
import chalk from 'chalk';

/**
 * Prompts the user to select the type of project they want to create.
 *
 * @returns {Promise<'typescript' | 'javascript'>} A promise that resolves to the selected project type.
 */
export async function promptForProjectType(): Promise<ProjectType> {
  const projectType = await select({
    message: 'Choose the project type:',
    options: [
      { value: 'typescript', label: 'TypeScript' },
      { value: 'javascript', label: 'JavaScript' },
    ],
  });

  return projectType as ProjectType;
}

/**
 * Prompts the user to confirm if they want to use Prettier for code formatting.
 *
 * @returns {Promise<boolean>} A promise that resolves to a boolean indicating the user's choice.
 */
export async function promptForSelectingFormatter(): Promise<boolean> {
  const projectFormatter = await select({
    message: 'Do you want to use Prettier for code formatting?',
    options: [
      { value: true, label: 'Yes' },
      { value: false, label: 'No' },
    ],
    initialValue: true,
  });

  if (!projectFormatter) {
    note(
      chalk.redBright(
        'Wrong choice. Prettier is recommended for maintaining code style.'
      )
    );
  }

  return projectFormatter as boolean;
}

export async function promptForSelectingLinting(): Promise<boolean> {
  const linting = await select({
    message: 'Do you want to use ESLint for linting?',
    options: [
      { value: true, label: 'Yes' },
      { value: false, label: 'No' },
    ],
    initialValue: true,
  });

  if (!linting) {
    note(
      chalk.redBright(
        'Wrong choice. ESLint is recommended for maintaining code quality.'
      )
    );
  }

  return linting as boolean;
}
