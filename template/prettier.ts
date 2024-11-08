import path from 'node:path';
import { createFile } from '../src/file-system';

export async function generatePrettierConfig(
  projectDirectory: string
): Promise<void> {
  const prettierConfig = {
    semi: true,
    singleQuote: true,
    trailingComma: 'es5',
    printWidth: 100,
  };

  await createFile(
    path.join(projectDirectory, '.prettierrc'),
    JSON.stringify(prettierConfig, null, 2)
  );
}
