import { select } from '@clack/prompts';
import type { FormatterType, ProjectType } from './types';

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
export async function promptForSelectingFormatter(): Promise<FormatterType> {
  const projectFormatter = await select({
    message: 'Do you want to use Prettier for code formatting?',
    options: [
      { value: 'eslint && prettier', label: 'ESLint and Prettier' },
      { value: 'biomejs', label: 'BiomeJS' },
      { value: 'none', label: 'None' },
    ],
  });

  return projectFormatter as FormatterType;
}
