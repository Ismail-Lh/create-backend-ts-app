import path from 'node:path';
import { spinner } from '@clack/prompts';

import type { FormatterType } from '../types';
import { generateReadmeContent } from 'template/readme';
import { createFile } from '../file-system';

type createReadmeFile = {
  projectDirectory: string;
  projectName: string;
  isTypeScript: boolean;
  projectFormatter: FormatterType;
};

export async function createReadmeFile({
  projectDirectory,
  projectName,
  isTypeScript,
  projectFormatter,
}: createReadmeFile): Promise<void> {
  const readmeSpinner = spinner();
  readmeSpinner.start('Generating README.md');
  const readmeContent = generateReadmeContent({
    projectName,
    isTypeScript,
    projectFormatter,
  });
  await createFile(path.join(projectDirectory, 'README.md'), readmeContent);
  readmeSpinner.stop('README.md generated successfully');
}
