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

- **Back end:** Node.js using built-in Node.js modules
- **API format:** JSON over HTTP
- **Database:** Relational SQL database; schema and SQL statements are being completed for Milestone 2
- **Version control and project management:** GitHub and GitHub Projects

### Front End

The exact front-end technologies and run command will be added when the front-end implementation is merged into the main repository. Only course-approved technologies will be used.

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
- A local copy of this GitHub repository

### Back End

From the repository root, run:

```bash
cd backend
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

To run the server on another port:

```bash
PORT=4000 npm start
```

The current back-end setup uses only built-in Node.js modules, so no third-party package installation is required.

### Front End

The front end is currently being implemented by the team. Its exact folder name and start command must be added here after the front-end code is merged into the main branch and verified on a clean machine.

## Back-End API Structure

The Node.js back-end skeleton currently includes route and controller files for:

- Authentication
- Transactions
- Categories
- Budgets and budget comparison
- Dashboard summaries
- Shared expenses
- Shared-expense members

The health-check and API overview endpoints are functional. Database-dependent operations are currently represented by explicit controller stubs and will be connected to the relational database after the schema is finalized.

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

## Links

- **GitHub Repository:** https://github.com/AliKhairreddin/personal-expense-tracker
- **GitHub Project Board:** https://github.com/users/AliKhairreddin/projects/2
- **Activity Blog:** https://github.com/AliKhairreddin/personal-expense-tracker/blob/main/activity-blog.md
