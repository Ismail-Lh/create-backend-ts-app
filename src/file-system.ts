import fs from 'node:fs/promises';
import path from 'node:path';

/**
 * Creates the directory structure for a project.
 *
 * This function takes a project directory path and creates a set of predefined
 * subdirectories within it. The subdirectories include:
 * - `src`
 * - `src/routes`
 * - `src/controllers`
 * - `src/services`
 * - `src/utils`
 * - `src/models`
 * - `src/types`
 * - `src/constants`
 * - `src/middleware`
 * - `src/config`
 * - `src/docs`
 *
 * @param projectDirectory - The root directory of the project where the structure will be created.
 * @returns A promise that resolves when all directories have been created.
 */
export async function createDirectoryStructure(
  projectDirectory: string
): Promise<void> {
  const srcDir = path.join(projectDirectory, 'src');
  const directories = [
    srcDir,
    path.join(srcDir, 'routes'),
    path.join(srcDir, 'controllers'),
    path.join(srcDir, 'services'),
    path.join(srcDir, 'utils'),
    path.join(srcDir, 'models'),
    path.join(srcDir, 'types'),
    path.join(srcDir, 'constants'),
    path.join(srcDir, 'middleware'),
    path.join(srcDir, 'config'),
    path.join(srcDir, 'docs'),
  ];

  for (const dir of directories) {
    await fs.mkdir(dir, { recursive: true });
  }
}

/**
 * Asynchronously creates a file with the specified content at the given file path.
 *
 * @param filePath - The path where the file will be created.
 * @param content - The content to write to the file.
 * @returns A promise that resolves when the file has been created.
 */
export async function createFile(
  filePath: string,
  content: string
): Promise<void> {
  await fs.writeFile(filePath, content);
}
