import { confirm, select } from '@clack/prompts';

/**
 * Prompts the user to select the type of project they want to create.
 *
 * @returns {Promise<'typescript' | 'javascript'>} A promise that resolves to the selected project type.
 */
export async function promptForProjectType(): Promise<
  'typescript' | 'javascript'
> {
  const projectType = await select({
    message: 'Choose the project type:',
    options: [
      { value: 'typescript', label: 'TypeScript' },
      { value: 'javascript', label: 'JavaScript' },
    ],
  });

  return projectType as 'typescript' | 'javascript';
}

/**
 * Prompts the user to confirm if they want to use Prettier for code formatting.
 *
 * @returns {Promise<boolean>} A promise that resolves to a boolean indicating the user's choice.
 */
export async function promptForPrettier(): Promise<boolean> {
  const usePrettier = await confirm({
    message: 'Do you want to use Prettier for code formatting?',
  });

  return usePrettier as boolean;
}
