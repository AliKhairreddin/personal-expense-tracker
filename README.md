# Personal Expense Tracker

## Project Description

Personal Expense Tracker is a full-stack web application designed to help students and young adults record income and expenses, organize transactions, create budgets, and understand their spending habits through simple financial summaries.

The application is being developed for **CP476B – Internet Computing** and will include a functional front end, a Node.js back end, and a relational database.

## Team Members

- Muhammad Wasay Munawar
- Ali Khairreddin
- Aryan Tyagi
- Jagshan Sangha
- Christian Elyasi
- Hartaj Sangha
- Ashrey Mathews
- Alexander Ristic
- Jazib Zaidi
- Arshia Gole Sorkhi

## Main Features

- User registration, login, logout, and account sessions
- Add, view, edit, delete, and filter transactions
- Organize transactions using default or custom categories
- Create and track budgets
- Compare budgeted amounts with actual spending
- View dashboard summaries for income, expenses, and remaining balance
- Create shared expenses and manage participating members

## Technology Stack

### Current

- **Back end:** Node.js with the `mysql2` database driver
- **API format:** JSON over HTTP
- **Database:** MySQL
- **Front end:** React and Vite
- **Version control and project management:** GitHub and GitHub Projects

## Project Structure

```text
personal-expense-tracker/
├── backend/
│   ├── package.json
│   ├── README.md
│   ├── MILESTONE2_BACKEND_SUMMARY.md
│   └── src/
│       ├── server.js
│       ├── app.js
│       ├── controllers/
│       ├── routes/
│       └── utils/
├── activity-blog.md
├── links.txt
└── README.md
```

Additional front-end and database files will be added as the Milestone 2 work is merged.

## How to Run Locally

### Prerequisites

- Node.js and npm installed
- MySQL installed and running
- A local copy of this GitHub repository

### Back End

Create the database and seed the demo user and categories:

```bash
cd backend
mysql -u root -p < src/data/schema.sql
```

This schema command recreates `expense_tracker`, so do not run it against a
database containing data you need to keep.

Create a local environment file and update it for your MySQL account:

```bash
cp .env.example .env
```

Install dependencies and start the API:

```bash
npm install
npm start
```

The server starts at:

```text
http://localhost:3000
```

Verify that it is running by opening:

```text
http://localhost:3000/api/health
```

A successful response includes:

```json
{
  "status": "ok"
}
```

Open the following endpoint to view the initialized API route groups:

```text
http://localhost:3000/api
```

To run the server on another port, update `PORT` in `backend/.env`.

The seeded demo account has user ID `1`. API routes use this account until the
authentication work is merged.

### Front End

In another terminal, run:

```bash
cd frontend
npm install
npm run dev
```

Open `http://localhost:5173`. The frontend uses `http://localhost:3000` for the
API by default. To use another API URL, define `VITE_API_URL` in
`frontend/.env.local`.

## Back-End API Structure

The Node.js back-end skeleton currently includes route and controller files for:

- Authentication
- Transactions
- Categories
- Budgets and budget comparison
- Dashboard summaries
- Shared expenses
- Shared-expense members

The health-check, API overview, categories CRUD, and dashboard summary endpoints
are functional. Transaction, budget, authentication, and shared-expense
controllers are still being completed by their assigned team members.

## Milestone Progress

- **Milestone 1:** Planning and design completed
- **Milestone 2:** Front-end implementation, database design, and back-end foundation in progress
- **Milestone 3:** Full-stack integration, testing, documentation, and final demonstration

## Contribution Summary

### Milestone 1

- **Muhammad Wasay Munawar and Jagshan Sangha:** Project proposal
- **Arshia Gole Sorkhi and Ashrey Mathews:** Requirements and user stories
- **Christian Elyasi and Aryan Tyagi:** Wireframes and UI planning
- **Hartaj Sangha and Ali Khairreddin:** Data planning
- **Ali Khairreddin:** Team plan and GitHub setup
- **Hartaj Sangha and Jazib Zaidi:** Activity blog

### Milestone 2 — Current Contributions

- **Muhammad Wasay Munawar and Jagshan Sangha:** Database design package, including the ER diagram and SQL `CREATE TABLE` statements
- **Ali Khairreddin:** Node.js back-end project skeleton, runnable server entry point, health-check endpoint, and initial routes/controllers
- **Remaining front-end and Milestone 2 contributions:** To be added after the group finalizes assignments and merges completed work
- **Hartaj Sangha and Aryan Tyagi:** Working front-end implementation, including the core application screens, navigation between pages, and the primary user workflow using mock data.
- **Jazib Zaidi and Ashrey Mathews:** Updated GitHub Projects Kanban board by creating, assigning, organizing, and moving tasks through the required workflow columns (Backlog, Ready, In Progress, In Review, and Done).
- **Christian Elyasi, Arshia Gole Sorkhi, and Alexander Ristic:** Updated the Activity Blog/Wiki with Milestone 2 progress, meeting minutes, task assignments, project decisions, and development updates.

## Links

- **GitHub Repository:** https://github.com/AliKhairreddin/personal-expense-tracker
- **GitHub Project Board:** https://github.com/users/AliKhairreddin/projects/2
- **Activity Blog:** https://github.com/AliKhairreddin/personal-expense-tracker/blob/main/activity-blog.md
