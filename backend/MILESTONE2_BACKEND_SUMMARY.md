# Milestone 2 Back-End Contribution Summary

A Node.js back-end skeleton was added for the Personal Expense Tracker. The server has a runnable entry point and a health-check endpoint. Route and controller files were initialized for authentication, transactions, categories, budgets, dashboard summaries, shared expenses, and shared-expense members. The current controller methods are either basic placeholder responses or explicit stubs, ready to be connected to the relational database once the schema is finalized.

## Verification

1. Run `npm start` inside the backend folder.
2. Open `http://localhost:3000/api/health`.
3. Confirm that the response contains `"status": "ok"`.
4. Open `http://localhost:3000/api` to view the initialized routes.
