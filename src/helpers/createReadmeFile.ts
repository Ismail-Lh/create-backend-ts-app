import path from 'node:path';
import { spinner } from '@clack/prompts';

import { generateReadmeContent } from 'template/readme';
import { createFile } from '../file-system';

type createReadmeFile = {
  projectDirectory: string;
  projectName: string;
  isTypeScript: boolean;
  formatterEnabled: boolean;
  linterEnabled: boolean;
};

export async function createReadmeFile({
  projectDirectory,
  projectName,
  isTypeScript,
  formatterEnabled,
  linterEnabled,
}: createReadmeFile): Promise<void> {
  const readmeSpinner = spinner();
  readmeSpinner.start('Generating README.md');
  const readmeContent = generateReadmeContent({
    projectName,
    isTypeScript,
    formatterEnabled,
    linterEnabled,
  });
  await createFile(path.join(projectDirectory, 'README.md'), readmeContent);
  readmeSpinner.stop('README.md generated successfully');
}
