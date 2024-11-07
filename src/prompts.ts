import inquirer from 'inquirer';

/**
 * Prompts the user to choose the type of project they want to create.
 *
 * @returns {Promise<'typescript' | 'javascript'>} A promise that resolves to the selected project type.
 *
 */
export async function promptForProjectType(): Promise<
  'typescript' | 'javascript'
> {
  const answer = await inquirer.prompt([
    {
      type: 'list',
      name: 'projectType',
      message: 'Choose the project type:',
      choices: ['TypeScript', 'JavaScript'],
      default: 'TypeScript',
    },
  ]);

  return answer.projectType.toLowerCase() as 'typescript' | 'javascript';
}

export async function promptForPrettier(): Promise<boolean> {
  const answer = await inquirer.prompt([
    {
      type: 'confirm',
      name: 'usePrettier',
      message: 'Do you want to use Prettier for code formatting?',
      default: true,
    },
  ]);

  return answer.usePrettier;
}
