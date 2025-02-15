# Node.js TypeScript Captcha Service

This repository provides a Captcha service built with Node.js, TypeScript, and Fastify. It follows clean architecture principles.

## Features

*   **Fastify:** A fast and low-overhead web framework for Node.js.
*   **TypeScript:** Static typing for enhanced code quality, maintainability, and developer experience.
*   **Clean Architecture:**  Separation of concerns into layers (Core, Infrastructure, Routes, Controllers) for a highly organized and testable codebase.
    *   **Core:**  Contains the application's business logic and interfaces (ports). This layer is independent of any framework or external dependencies.
    *   **Infrastructure:**  Implements the interfaces defined in the `core` layer (adapters).  This includes the repository, service, and controllers.
    *   **Routes:** Defines the API endpoints using Fastify.
*   **Dependency Injection:**  Uses manual dependency injection for loose coupling and easy testing.
*   **SVG Captcha Generation:** Uses the `svg-captcha` library to generate secure and customizable captchas.
*   **PostgreSQL Database:** Uses PostgreSQL for persistent captcha storage via Knex.js.
*   **Vitest:**  A fast and easy-to-use unit testing framework. Includes comprehensive unit tests for the service and controller layers.
*   **Biome.js:** A fast and opinionated linter and formatter for consistent code style.
*   **Pre-commit Hooks (Lefthook):**  Automates code checks (linting, formatting, testing) before each commit to ensure code quality.
*   **Docker:** Containerization for easy deployment and consistent environments (using Docker Compose).
*   **GitHub Actions CI:** Automated testing and linting on every push and pull request.
*   **HTML Test Page:** Includes a simple HTML page for easy testing of the API endpoints.

## Getting Started

### Prerequisites

*   [Node.js](https://nodejs.org/) (>=22, LTS version recommended)
*   [pnpm](https://pnpm.io/) (>=10, Recommended package manager)
*   [Docker](https://www.docker.com/) (Optional, for containerized deployment)
*   [Docker Compose](https://docs.docker.com/compose/install/) (Optional, for containerized deployment)

### Installation

1.  Clone the repository:

    ```bash
    git clone https://github.com/Pater999/captcha-fastify.git
    cd captcha-fastify
    ```

2.  Install dependencies:

    ```bash
    pnpm install
    ```

3. **Create a `.env` file:**

   Copy the `.env.example` file to a new file named `.env` in the project root:

    ```bash
    cp .env.example .env
    ```

    Then, edit the `.env` file and set the appropriate values for your environment (especially database credentials if you are not using the default values).

### Development

*   Start the Database (in a separate terminal):

    This command starts *only* the PostgreSQL database container in detached mode.  This is necessary *before* running the application in development mode.

    ```bash
    docker-compose up -d db
    ```

*   Running the app in development mode:

    ```bash
    pnpm run dev
    ```

*   Running tests:

    ```bash
    pnpm run test
    ```

*   Running the linter and formatter:

    ```bash
    pnpm run lint # To check lint errors
    pnpm run format # To fix lint errors
    ```

*   Building the Docker image:

    ```bash
    docker build -t <your-image-name> .
    ```

*   Running the Docker container with Docker Compose:

    ```bash
    docker-compose up -d
    ```

### API Endpoints

*   **`GET /captcha`:** Creates a new captcha and returns its ID and SVG bas64 image.
*   **`GET /captcha/:id`:** Retrieves a captcha by its ID. Returns a 404 if the captcha is not found.
*   **`POST /captcha/validate`:** Validates a captcha.  Expects a JSON body with `id` and `value` properties. Returns `{ valid: true }` or `{ valid: false }`. Returns a 404 if the captcha is not found.

### Testing the API

An HTML page (`basic-frontend.html`) is included for easy testing of the API endpoints directly in your browser.  Simply open `basic-frontend.html` in your browser after starting the server.  The page provides a user interface to generate, display, and validate captchas.

### Docker Compose

The `docker-compose.yml` defines two services:

*   **`app`:** Your Fastify application.
*   **`db`:** A PostgreSQL database.

`app` depends on `db`. Database data is persisted via a Docker volume. Environment variables configure the database connection. The `init.sql` script initializes the database.