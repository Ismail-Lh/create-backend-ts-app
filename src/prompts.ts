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
