import path from 'node:path';
import { createFile } from '../../src/file-system';

export async function generateEslintConfig(
  projectDirectory: string
): Promise<void> {
  const eslintConfig = {
    extends: [
      'eslint:recommended',
      'plugin:@typescript-eslint/recommended',
      'prettier',
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
      ecmaVersion: 2020,
      sourceType: 'module',
    },
    plugins: ['@typescript-eslint'],
    rules: {
      'no-console': 'off',
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': 'error',
    },
  };

  await createFile(
    path.join(projectDirectory, '.eslintrc.json'),
    JSON.stringify(eslintConfig, null, 2)
  );
}
