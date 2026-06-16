# Preproute Test Management System

A modern Test Management Application built using **React.js, TypeScript, Vite, React Router, and Axios**. The application enables administrators to create, manage, preview, and publish online tests through a structured workflow.

## Demo Credentials

Use the following credentials to access the application:

```txt
User ID: admin
Password: admin123
```

## Features

### Authentication

* Secure login using User ID and Password
* JWT-based authentication flow
* Token storage using Local Storage or Session Storage
* Protected routes for authenticated users

### Dashboard

* View all created tests
* Search and filter tests
* Edit, View, and Delete test functionality
* Quick access to create new tests

### Test Management

* Create and update tests
* Select subjects, topics, and sub-topics
* Configure difficulty levels
* Define marking schemes
* Set total marks and duration
* Save tests as drafts

### Question Management

* Add multiple MCQ questions
* Define correct answers
* Add explanations and media URLs
* Edit and delete questions
* Bulk question creation workflow

### Preview & Publish

* Review complete test details
* Verify questions before publishing
* Publish tests with a single click
* Manage draft and live test states

## Technology Stack

* React.js
* TypeScript
* Vite
* React Router DOM
* Axios
* Local Storage
* CSS

## Project Setup

Install dependencies:

```bash
npm install
```

Create environment file:

```bash
cp .env.example .env
```

Configure API URL:

```env
VITE_API_BASE_URL=https://your-api-url.com
```

Start development server:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

## Application Routes

| Route                | Description            |
| -------------------- | ---------------------- |
| /login               | User Authentication    |
| /dashboard           | Test Dashboard         |
| /tests/create        | Create New Test        |
| /tests/:id/edit      | Edit Existing Test     |
| /tests/:id/questions | Add Questions          |
| /tests/:id/preview   | Preview & Publish Test |

## Project Workflow

Login → Dashboard → Create Test → Add Questions → Preview → Publish

## Notes

This project currently uses local storage for demonstration purposes. In a production environment, the application can be integrated with backend APIs and a database to provide persistent, real-time, and cross-device data synchronization.

## Author

**Almas Ansari**

Frontend Developer | React.js Developer
