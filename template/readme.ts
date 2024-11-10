import type { FormatterType } from '../src/types';

interface ReadmeConfig {
  projectName: string;
  isTypeScript: boolean;
  projectFormatter: FormatterType;
}

export function generateReadmeContent({
  projectName,
  isTypeScript,
  projectFormatter,
}: ReadmeConfig): string {
  return `# ${projectName}

## Description

A modern ${
    isTypeScript ? 'TypeScript' : 'JavaScript'
  } Express.js application created with create-my-app. This project provides a robust starting point for building scalable and maintainable web applications.

## Project Structure

\`\`\`
${projectName}/
├── src/
│   ├── routes/
│   ├── controllers/
│   ├── services/
│   ├── utils/
│   ├── models/
│   ├── types/
│   ├── constants/
│   ├── middlewares/
│   ├── config/
│   ├── docs/
│   ├── server.${isTypeScript ? 'ts' : 'js'}
│   └── app.${isTypeScript ? 'ts' : 'js'}
${isTypeScript ? '├── tsconfig.json\n' : ''}├── package.json
└── README.md
\`\`\`

## Prerequisites

- Node.js (version 14 or higher)
- npm (Node Package Manager)

## Getting Started

1. Clone the repository:
    \`\`\`bash
    git clone <repository-url>
    \`\`\`

2. Navigate into the project directory:
    \`\`\`bash
    cd ${projectName}
    \`\`\`

3. Install dependencies:
    \`\`\`bash
    npm install
    \`\`\`

4. Start the development server:
    \`\`\`bash
    npm run dev
    \`\`\`

5. Open your browser and visit \`http://localhost:3000\` to see the application running.

## Available Scripts

${
  isTypeScript
    ? `- \`npm run dev\`: Starts the development server with hot-reload using nodemon and ts-node.
- \`npm run build\`: Compiles TypeScript code to JavaScript.
- \`npm start\`: Runs the compiled JavaScript code from the dist folder.
- \`npm test\`: Runs the test suite using Jest.
- \`npm run lint\`: Lints the code using ESLint.${
        projectFormatter === 'eslint && prettier'
          ? '\n- `npm run format`: Formats the code using Prettier.'
          : ''
      }`
    : `- \`npm run dev\`: Starts the development server with hot-reload using nodemon.
- \`npm start\`: Runs the JavaScript code directly.
- \`npm test\`: Runs the test suite using Jest.
- \`npm run lint\`: Lints the code using ESLint.${
        projectFormatter === 'eslint && prettier'
          ? '\n- `npm run format`: Formats the code using Prettier.'
          : ''
      }`
}

## Project Components

### Server (\`src/server.${isTypeScript ? 'ts' : 'js'}\`)
The main entry point of the application. It sets up the Express server and listens for incoming requests.

### App (\`src/app.${isTypeScript ? 'ts' : 'js'}\`)
Contains the Express application setup, middleware configuration, and route definitions.

### Routes (\`src/routes/\`)
Directory for organizing route handlers. Add your API endpoints here.

### Controllers (\`src/controllers/\`)
Directory for controller logic. Controllers handle the request/response cycle for your routes.

### Services (\`src/services/\`)
Directory for business logic. Services handle complex operations and data processing.

### Utils (\`src/utils/\`)
Utility functions and helper modules used across the application.

### Models (\`src/models/\`)
Data models and database schema definitions (if using an ORM).

### Types (\`src/types/\`)
TypeScript type definitions and interfaces (only applicable for TypeScript projects).

### Constants (\`src/constants/\`)
Constant values and configuration settings used throughout the application.

### Middlewares (\`src/middlewares/\`)
Custom middleware functions for request processing, authentication, error handling, etc.

### Config (\`src/config/\`)
Configuration files for different environments (development, production, testing).

### Docs (\`src/docs/\`)
Documentation files, API specifications, and other relevant project documentation.

## Development

1. Start the development server:
    \`\`\`bash
    npm run dev
    \`\`\`

2. The server will start on \`http://localhost:3000\`

3. Make changes to your code, and the server will automatically restart.

${
  isTypeScript
    ? `## TypeScript Configuration

This project includes a pre-configured \`tsconfig.json\` with recommended settings for Node.js applications. You can modify these settings based on your needs.

Key configurations:
- Target: ES6
- Module: CommonJS
- Strict mode enabled
- ESM module interop enabled
- Source maps enabled for debugging

To customize the TypeScript configuration, edit the \`tsconfig.json\` file in the project root.`
    : ''
}

## Adding New Routes

1. Create a new route file in \`src/routes/\`. For example, \`src/routes/users.${
    isTypeScript ? 'ts' : 'js'
  }\`.
2. Create corresponding controllers in \`src/controllers/\`. For example, \`src/controllers/users.${
    isTypeScript ? 'ts' : 'js'
  }\`.
3. Add business logic in \`src/services/\`. For example, \`src/services/users.${
    isTypeScript ? 'ts' : 'js'
  }\`.
4. Import and use the route in \`src/app.${isTypeScript ? 'ts' : 'js'}\`:

    \`\`\`${isTypeScript ? 'typescript' : 'javascript'}
    import userRoutes from './routes/users';
    
    // ... other imports and setup

    app.use('/api/users', userRoutes);
    \`\`\`

## Testing

This project uses Jest for testing. To run the tests:

\`\`\`bash
npm test
\`\`\`

Add your test files in the \`src/__tests__/\` directory with the naming convention \`*.test.${
    isTypeScript ? 'ts' : 'js'
  }\`.

## Code Style and Linting

This project uses ESLint for linting and Prettier for code formatting. To lint your code:

\`\`\`bash
npm run lint
\`\`\`

To format your code:

\`\`\`bash
npm run format
\`\`\`

## Contributing

1. Fork the repository
2. Create a new branch (\`git checkout -b feature/your-feature-name\`)
3. Make your changes
4. Commit your changes (\`git commit -am 'Add some feature'\`)
5. Push to the branch (\`git push origin feature/your-feature-name\`)
6. Create a new Pull Request

Please make sure to update tests as appropriate and adhere to the code style guidelines.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Express.js - Fast, un-opinionated, minimalist web framework for Node.js
- create-my-app - CLI tool used to generate this project structure

## Support

If you encounter any issues or have questions, please file an issue on the GitHub repository.
`;
}
