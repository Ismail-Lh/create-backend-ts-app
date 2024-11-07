import path from 'node:path';
import { createFile } from '../file-system';

/**
 * Generates JavaScript files for a backend project.
 *
 * This function creates two files: `server.js` and `app.js` in the specified project directory.
 *
 * - `server.js` sets up an Express server that listens on a specified port.
 * - `app.js` sets up an Express application with a single route.
 *
 * @param projectDirectory - The directory where the JavaScript files will be created.
 * @returns A promise that resolves when the files have been successfully created.
 */
export async function generateJavaScriptFiles(
  projectDirectory: string
): Promise<void> {
  const serverContent = `
const express = require('express');
const app = require('./app');

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(\`Server is running on port \${PORT}\`);
});
`;

  const appContent = `
const express = require('express');

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello from create-my-app!');
});

module.exports = app;
`;

  await createFile(
    path.join(projectDirectory, 'src', 'server.js'),
    serverContent
  );
  await createFile(path.join(projectDirectory, 'src', 'app.js'), appContent);
}
