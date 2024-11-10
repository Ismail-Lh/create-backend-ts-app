import fs from 'fs-extra';
import { spinner } from '@clack/prompts';

type CreateProjectStructureProps = {
  templateDir: string;
  projectDirectory: string;
};

export async function createProjectStructure({
  templateDir,
  projectDirectory,
}: CreateProjectStructureProps): Promise<void> {
  const copySpinner = spinner();
  copySpinner.start('Copying template files');
  await fs.copy(templateDir, projectDirectory);
  copySpinner.stop('Template files copied successfully');
}
