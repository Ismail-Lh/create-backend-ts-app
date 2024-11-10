import { spinner } from '@clack/prompts';

import { generateEslintConfig } from 'template/config/eslint';

type CreateEslintConfig = {
  projectDirectory: string;
};

export async function createEslintConfig({
  projectDirectory,
}: CreateEslintConfig): Promise<void> {
  const formatterSpinner = spinner();
  formatterSpinner.start('Creating eslint config files');

  await generateEslintConfig(projectDirectory);

  formatterSpinner.stop('Config files for eslint created successfully');
}
