import path from 'node:path';
import { createFile } from '../file-system';

/**
 * Generates the necessary TypeScript files for a new project.
 *
 * This function creates the following files in the specified project directory:
 * - `server.ts`: Sets up an Express server that listens on a specified port.
 * - `app.ts`: Configures the Express application with a basic route.
 * - `tsconfig.json`: TypeScript configuration file with predefined settings.
 *
 * @param projectDirectory - The root directory of the project where the files will be generated.
 * @returns A promise that resolves when all files have been successfully created.
 */
export async function generateTypeScriptFiles(
  projectDirectory: string
): Promise<void> {
  const serverContent = `
import express from 'express';
import app from './app';

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(\`Server is running on port \${PORT}\`);
});
`;

  const appContent = `
import express from 'express';

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello from create-my-app!');
});

export default app;
`;

  await createFile(
    path.join(projectDirectory, 'src', 'server.ts'),
    serverContent
  );
  await createFile(path.join(projectDirectory, 'src', 'app.ts'), appContent);

  const tsConfig = {
    compilerOptions: {
      target: 'es6',
      module: 'commonjs',
      outDir: './dist',
      rootDir: './src',
      strict: true,
      esModuleInterop: true,
      skipLibCheck: true,
      forceConsistentCasingInFileNames: true,
    },
    include: ['src/**/*'],
    exclude: ['node_modules'],
  };

  await createFile(
    path.join(projectDirectory, 'tsconfig.json'),
    JSON.stringify(tsConfig, null, 2)
  );
}
