#!/usr/bin/env node

import { program } from 'commander';
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

interface ProjectConfig {
  name: string;
  version: string;
  description: string;
  main: string;
  scripts: {
    [key: string]: string;
  };
  dependencies: {
    [key: string]: string;
  };
  devDependencies: {
    [key: string]: string;
  };
}

async function createDirectoryStructure(
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

async function createFile(filePath: string, content: string): Promise<void> {
  await fs.writeFile(filePath, content);
}

async function createProject(projectDirectory: string): Promise<void> {
  try {
    console.log(`Creating a new project in ${projectDirectory}...`);

    await createDirectoryStructure(projectDirectory);

    const packageJson: ProjectConfig = {
      name: path.basename(projectDirectory),
      version: '1.0.0',
      description: 'A project created with create-backend-ts-app',
      main: 'dist/server.js',
      scripts: {
        start: 'node dist/server.js',
        dev: 'nodemon --watch src --ext ts --exec ts-node src/server.ts',
        build: 'tsc',
      },
      dependencies: {
        express: '^4.17.1',
      },
      devDependencies: {
        '@types/express': '^4.17.13',
        '@types/node': '^16.11.12',
        nodemon: '^2.0.15',
        'ts-node': '^10.4.0',
        typescript: '^4.5.2',
      },
    };

    await createFile(
      path.join(projectDirectory, 'package.json'),
      JSON.stringify(packageJson, null, 2)
    );

    const serverTs = `
import app from './app';

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(\`Server is running on port \${PORT}\`);
});
`;

    const appTs = `
import express from 'express';

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello from create-my-app!');
});

export default app;
`;

    await createFile(path.join(projectDirectory, 'src', 'server.ts'), serverTs);
    await createFile(path.join(projectDirectory, 'src', 'app.ts'), appTs);

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

    console.log('Project created successfully!');
    console.log('To get started, run:');
    console.log(`  cd ${projectDirectory}`);
    console.log('  npm install');
    console.log('  npm run dev');
  } catch (error) {
    console.error('Error creating project:', error);
  }
}

program
  .version('1.0.0')
  .argument('[project-directory]', 'Directory to create the project in', '.')
  .action(createProject);

program.parse(process.argv);

console.log('CLI tool is running and watching for changes...');
