# 🐞 Task Management Frontend

A full-featured task application built with **Next.js** for the frontend and **Node.js with Express** for the backend. This application enables users to create, view, edit, and delete tasks efficiently.

---

## Live Demo

You can view the live version of the application at:

[See Live](https://task-frontend-sand.vercel.app/)

## 📌 Project Overview

This Task app provides users with a robust system to manage tasks. The platform includes:

- **Dashboard** with a list of all issues
- **Detailed View** for each issue
- Full **CRUD** functionality
- **Sorting & Filtering** capabilities
- Responsive and professional **UI**
- RESTful **API** with data persistence

---

## 🛠️ Technologies Used

- **Frontend**: React.js, Tailwind CSS, ShadCn
- **Backend**: Node.js, Express.js
- **Database**: PostgreSQL
- **Others**: Axios, ESLint, Prettier, dotenv

---

## Getting Started

Follow the instructions below to set up the project locally.

### Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/) (v14.x or higher)
- [npm](https://www.npmjs.com/)

### Installation

#### 1. Clone the repository

```bash

git clone https://github.com/whogoodluck/task-frontend

cd task-frontend

npm install

```

#### 2. Configure environment variables

- Create a `.env` file inside the `frontend/` folder

- Add the following:

  ```env

  NEXT_PUBLIC_API_URL = http://localhost:3001

  ```

#### 3. Start the frontend server

```bash

npm run dev

```

The frontend will be available at `http://localhost:3000`

#### 4. backend repository

- [task-backend](https://github.com/whogoodluck/task-backend)
