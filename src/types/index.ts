/**
 * Represents the configuration of a project.
 */
export interface ProjectConfig {
  /**
   * The name of the project.
   */
  name: string;

  /**
   * The version of the project.
   */
  version: string;

  /**
   * A brief description of the project.
   */
  description: string;

  /**
   * The entry point of the project.
   */
  main: string;

  /**
   * The scripts associated with the project.
   * Each key is the name of the script, and the value is the command to run.
   */
  scripts: {
    [key: string]: string;
  };

  /**
   * The dependencies required by the project.
   * Each key is the name of the dependency, and the value is the version.
   */
  dependencies: {
    [key: string]: string;
  };

  /**
   * The development dependencies required by the project.
   * Each key is the name of the dependency, and the value is the version.
   */
  devDependencies: {
    [key: string]: string;
  };
}
