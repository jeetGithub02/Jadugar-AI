
# Jadugar - AI Image Wizard

Jadugar is a powerful, ready-to-use web application that leverages the Gemini Nano Banana model to perform magical image editing tasks. Users can remove and replace backgrounds, upscale image quality, and perform advanced object manipulation with simple text prompts.

## Features

-   **Background Wizard**: Remove an image's background and replace it with a solid color, a gradient, or a selection of beautiful stock images with adjustable blur.
-   **Image Upscaler**: Enhance the quality and detail of your images to give them a high-resolution, 4K appearance.
-   **Object Magic**: Remove unwanted objects or replace them with something entirely new using simple text descriptions.
-   **One-Click Download**: Instantly download your edited masterpieces.
-   **Sleek UI**: A modern, responsive, and user-friendly interface built with React and Tailwind CSS.

## Tech Stack

-   **React 18** with TypeScript
-   **Tailwind CSS** for styling
-   **@google/genai** for Gemini API integration
-   **Vite** for local development (recommended)

## Getting Started

### Prerequisites

-   Node.js (v18 or later)
-   npm, yarn, or pnpm
-   A Google Gemini API Key

### Setup

1.  **Clone the repository or extract the files:**
    ```bash
    # If you have the files, just navigate into the project directory
    cd jadugar-app
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Set up your Environment Variables:**
    Create a file named `.env.local` in the root of your project and add your Gemini API key:
    ```
    VITE_GEMINI_API_KEY=YOUR_API_KEY_HERE
    ```
    *Note: Because this is a client-side application, the API key will be exposed in the browser. For production applications, it's highly recommended to route API calls through a secure backend server to protect your key.*

    **To make `process.env.API_KEY` work as expected in the code, you need to configure your build tool (like Vite or Create React App) to expose it.**

    For **Vite**, you can do this by updating `index.html` to inject the variable:
    ```html
    <!-- index.html -->
    <script>
      // This makes the environment variable available on the window object
      window.process = {
        env: {
          API_KEY: '__VITE_GEMINI_API_KEY__'
        }
      };
    </script>
    ```
    And in your `vite.config.js`, you would use `define` to replace it at build time:
    ```javascript
    // vite.config.js
    import { defineConfig } from 'vite'
    import react from '@vitejs/plugin-react'

    export default defineConfig({
      plugins: [react()],
      define: {
        '__VITE_GEMINI_API_KEY__': JSON.stringify(process.env.VITE_GEMINI_API_KEY)
      }
    })
    ```
    This setup ensures `process.env.API_KEY` can be read by the Gemini SDK in a browser environment.

### Running Locally

```bash
npm run dev
```

Open your browser and navigate to `http://localhost:5173` (or the URL provided by Vite).

## Free Deployment with Vercel

Deploying your Jadugar app to Vercel is a simple, free process.

1.  **Sign up/Log in to Vercel:**
    Go to [vercel.com](https://vercel.com) and sign up for a free account, preferably using your GitHub, GitLab, or Bitbucket account.

2.  **Push your code to a Git repository:**
    If you haven't already, push your project to a repository on a platform like GitHub.

3.  **Create a New Project on Vercel:**
    -   From your Vercel dashboard, click "Add New..." and select "Project".
    -   Import the Git repository you just created. Vercel will automatically detect that it's a React/Vite project.

4.  **Configure the Project:**
    -   Vercel should automatically select the correct "Framework Preset" (e.g., Vite).
    -   The build command (`npm run build`) and output directory (`dist`) should also be configured automatically.
    -   **Crucially, you must add your environment variable:**
        -   Go to the "Environment Variables" section.
        -   Add a new variable with the name `VITE_GEMINI_API_KEY`.
        -   Paste your Gemini API key into the value field.
        -   Click "Add".

5.  **Deploy:**
    -   Click the "Deploy" button.
    -   Vercel will build your application and deploy it. Once finished, you'll be given a public URL where you can access your live Jadugar app.

That's it! Your AI Image Wizard is now live on the web for free.
