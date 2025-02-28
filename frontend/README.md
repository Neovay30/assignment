# Book Management Font End

A React TypeScript front end for managing a library of books with features like sorting, filtering and export capabilities.

## 📚 Features

- **Book Management**
  - View all books with server side searching, sorting and pagination
  - Add new books
  - Edit existing books author
  - Delete books with confirmation
  - Export books in CSV or XML formats

## 🔧 Tech Stack

- **[React](https://react.dev/)** -
- **[TypeScript](https://www.typescriptlang.org/docs/)** -
- **[Vite](https://vitejs.dev/guide/)** -
- **[TanStack Table](https://tanstack.com/table/latest/docs/introduction)** -
- **[React Hook Form](https://react-hook-form.com/get-started)** -
- **[React Hot Toast](https://react-hot-toast.com/docs)** -
- **[React Icons](https://react-icons.github.io/react-icons/)** -
- **[Axios](https://axios-http.com/docs/intro)** -
- **[TailwindCSS](https://tailwindcss.com/docs)** -

## 📁 Project Structure

The project follows a feature-based architecture for better organization:

```
src/
├── components/         # Shared UI components
│   └── ui/             # Base UI components (Button, Modal, etc.)
├── hooks/              # Custom React hooks
├── services/           # API services
│   └── api/            # API clients and endpoints
├── types/              # TypeScript type definitions
├── utils/              # Utility functions
└── views/              # Feature modules
    └── book/           # Book management feature
        ├── components/ # Book-specific components
        ├── hooks/      # Book-specific hooks
        └── constants/  # Book-related constants
```

## Local Development Setup
 
Docker:

1. Navigate to the frontend directory: `cd frontend`
2. Copy `.env.example` to `.env`
3. Run `docker compose up -build -d` 

Without Docker:

1. Navigate to the frontend directory: `cd frontend`
2. Install dependencies: `npm install`
3. Copy `.env.example` to `.env`
4. Configure your backend URL in the `.env` file
5. Start the development server: `npm run dev`