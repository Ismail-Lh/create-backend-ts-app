import { spinner } from '@clack/prompts';

import { generatePrettierConfig } from 'template/config/prettier';

type CreatePrettierConfig = {
  projectDirectory: string;
};

export async function createPrettierConfig({
  projectDirectory,
}: CreatePrettierConfig): Promise<void> {
  const formatterSpinner = spinner();
  formatterSpinner.start('Creating prettier config files');

  await generatePrettierConfig(projectDirectory);

  formatterSpinner.stop('Config files for prettier created successfully');
}
