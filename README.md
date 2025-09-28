# Newton's Lunar Chickens

Welcome to Newton's Lunar Chickens, a whimsical but powerful web application for tracking Sir Isaac Newton's scientific observations of chickens on the moon. Built entirely with React and a Manifest backend.

## Features

- **Scientist Authentication**: Secure sign-up and login for all scientists.
- **Chicken Management**: Register and manage your flock of lunar chickens.
- **Observation Logging**: Record detailed scientific observations for each chicken.
- **Ownership-Based Security**: Scientists can only view and manage their own research data.
- **Auto-Generated Admin Panel**: A complete admin interface for managing users, chickens, and observations.

## Tech Stack

- **Frontend**: React (Vite)
- **Backend**: Manifest (Node.js, SQLite)
- **Styling**: Tailwind CSS
- **API Communication**: Manifest SDK

## Getting Started

### Prerequisites

- Node.js (v18+)
- A Manifest account and the Manifest CLI

### Setup

1.  **Clone the repository**

    ```bash
    git clone <repository-url>
    cd newtons-lunar-chickens
    ```

2.  **Install frontend dependencies**

    ```bash
    npm install
    ```

3.  **Start the Manifest backend**

    From the root directory, run:
    ```bash
    mnfst dev
    ```
    This will start the backend server, typically on `http://localhost:3000`.

4.  **Run the React frontend**

    In a new terminal, run:
    ```bash
    npm run dev
    ```
    The application will be available at `http://localhost:5173`.

### Accessing the Admin Panel

-   **URL**: `http://localhost:3000/admin`
-   **Default Credentials**:
    -   **Email**: `admin@manifest.build`
    -   **Password**: `admin`
