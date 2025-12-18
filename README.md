# AirOps Frontend Technical Assessment 🚀

## Project Overview

This repository contains the solution for the AirOps Frontend Technical Assessment. It's a React-based application built with Vite and TypeScript that replicates a provided Figma design. The application demonstrates the implementation of a workflow management interface, including features for viewing, creating, sorting, and filtering workflows.

### Key Features 🌟

*   **Pixel-Perfect Design**: Faithfully reproduced UI based on the Figma specification using Tailwind CSS.
*   **Workflow Management**:
    *   **View**: Display a list of workflows in a responsive table.
    *   **Create**: Add new workflows with custom names, descriptions, and types.
    *   **Edit**: Modify existing workflows (tags, names, types).
    *   **Delete**: Remove workflows with a confirmation modal.
*   **Dynamic Functionality**:
    *   **Real-time Updates**: Changing tags updates the "Last Updated" timestamp instantly to "Just now".
    *   **Filtering & Sorting**: Filter workflows by name and sort by various criteria (Name, Type, Last Updated).
    *   **Tag Management**: Support for multiple tags with specific color coding (e.g., Marketing tag).
*   **Data Integration**:
    *   **Mock Data Mode**: Built-in mock data generator for seamless development and testing without API dependencies.
    *   **AirOps SDK Integration**: Configured to fetch data from AirOps workflows (requires API setup).
*   **Developer Experience**:
    *   **Type Safety**: Comprehensive TypeScript definitions, including Enums for Workflow Types.
    *   **Clean Architecture**: Separation of concerns with Container/Presentation pattern.
    *   **Aliases**: Path aliases (e.g., `@components`, `@hooks`) for clean imports.

---

## 🛠 Tech Stack

*   **Core**: [React](https://reactjs.org/) (v18)
*   **Build Tool**: [Vite](https://vitejs.dev/)
*   **Language**: [TypeScript](https://www.typescriptlang.org/)
*   **Styling**: [Tailwind CSS](https://tailwindcss.com/)
*   **State Management**: [Zustand](https://github.com/pmndrs/zustand)
*   **Icons**: Custom SVG components
*   **API Client**: [AirOps JS SDK](https://github.com/airopshq/airops-js)

---

## 🚀 Getting Started

### Prerequisites

*   **Node.js**: Version 18 or higher is recommended.
*   **npm**: Version 9 or higher.

### Installation

1.  **Clone the repository**:
    ```bash
    git clone [your-repo-link]
    cd fe-technical-assessment
    ```

2.  **Install dependencies**:
    ```bash
    npm install
    ```

3.  **Run the development server**:
    ```bash
    npm run dev
    ```
    The app will be available at `http://localhost:5173`.

### 📦 Building for Production

To create a production-ready build:

```bash
npm run build
```

---

## 📊 Data Integration

The application relies on data to populate the workflow table. It supports two modes:

### 1. Mock Data (Default)

For ease of review and development, the application is set up to use local mock data by default. This ensures the app works immediately after cloning without needing API keys.

*   **How it works**: The `useFakeWorkflowGenerator` hook serves data from `src/mocks/workflows.ts`.
*   **Simulation**: It simulates a network delay (e.g., 2000ms) to demonstrate loading states.
*   **Configuration**: You can toggle this behavior in `src/hooks/useFakeWorkflowGenerator.ts` or via environment variables (if configured).

### 2. AirOps API Integration

To pull live data from an AirOps workflow:

1.  **Create an AirOps Workflow**:
    *   Follow the [Building Your First Workflow](https://docs.airops.com/getting-started/readme/building-your-first-workflow) guide.
    *   Ensure the workflow returns a JSON object matching the `Workflow` interface defined in `src/types/index.ts`.

2.  **Configure Environment Variables**:
    Create a `.env` file in the root directory:
    ```env
    VITE_AIROPS_API_KEY=your_api_key
    VITE_AIROPS_WORKFLOW_ID=your_workflow_id
    VITE_USE_MOCK_DATA=false
    ```

3.  **Update Data Fetching**:
    The application uses `@airops/airops-js`. Ensure the `fetchWorkflows` function in `useFakeWorkflowGenerator.ts` (or your dedicated API hook) is uncommented to use the SDK `airops.apps.execute`.

---

## 📁 Project Structure

The project follows a feature-based and component-driven structure, utilizing path aliases for cleaner code.

```
src/
├── assets/         # Static assets and Icon components
├── components/     # Reusable UI components (Modal, Table, etc.)
│   ├── Table/      # WorkflowTable component
│   ├── WorkflowForm/ # Form for creating/editing workflows
│   └── ...
├── constants/      # App constants (e.g., form options, tag colors)
├── hooks/          # Custom React hooks (useDebounce, useFakeWorkflowGenerator)
├── mocks/          # Mock data definitions
├── pages/          # Page components (MainPage) & Containers
├── store/          # Zustand state store
├── types/          # TypeScript interfaces and types
└── utils/          # Utility functions (date formatting, etc.)
```

## 🧪 Import Aliases

We use the following aliases to keep imports clean:

*   `@components/*` -> `src/components/*`
*   `@hooks/*` -> `src/hooks/*`
*   `@pages/*` -> `src/pages/*`
*   `@store/*` -> `src/store/*`
*   `@types/*` -> `src/types/*`
*   `@utils/*` -> `src/utils/*`
*   `@assets/*` -> `src/assets/*`
*   `@constants/*` -> `src/constants/*`
