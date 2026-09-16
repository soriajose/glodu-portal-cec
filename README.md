# eschoolmulti-portal

This project is the Portal application for the ESchoolMulti ecosystem. It is built with [Angular](https://angular.io/) and uses [Tailwind CSS](https://tailwindcss.com/) for styling.

## Prerequisites

- Node.js (Recommended version: 20.x or higher)
- npm (Node Package Manager)

## Getting Started

1. **Install dependencies:**

   ```bash
   npm install
   ```

2. **Development server:**

   Run the application in development mode:

   ```bash
   npm run start
   ```

   Alternatively, you can run the dev script which runs on port 3000 and allows external hosts:

   ```bash
   npm run dev
   ```

   Navigate to `http://localhost:4200/` (or `http://localhost:3000/` if you used `npm run dev`). The application will automatically reload if you change any of the source files.

## Build

Run `npm run build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `npm run test` to execute the unit tests via [Vitest](https://vitest.dev/).

## Running linter

Run `npm run lint` to check your code for formatting and linting errors.

## Tech Stack

- **Framework:** Angular 21
- **UI & Styling:** Angular Material, Tailwind CSS
- **AI Integration:** Google Gen AI (`@google/genai`)
- **SSR:** Angular SSR (Server-Side Rendering)
