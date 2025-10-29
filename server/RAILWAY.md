# Railway Deployment Guide

## 1. Add the MySQL Plugin in Railway

- Go to your Railway project dashboard.
- Click "Plugins" → "Add Plugin" → "MySQL".
- Railway will provision a database and inject these env vars:
  - `MYSQLHOST`
  - `MYSQLUSER`
  - `MYSQLPASSWORD`
  - `MYSQLDATABASE`
  - `MYSQLPORT`

## 2. Code Changes

- Your code now reads both Railway’s and legacy `.env` variables for DB connection.
- You do NOT need to run Docker or PowerShell scripts on Railway.

## 3. Import Existing Data

- To import your local data, connect with a MySQL client using the credentials from Railway's dashboard, and run your `schema.sql` or export.

## 4. Push to Railway

- Connect your GitHub repo in Railway.
- Deploy! Builds run `npm install` and `npm start` by default.

## 5. Troubleshooting

- Use Railway’s logs tab to debug startup or DB connection issues.
- Confirm the environment variables are set correctly in the Railway dashboard.
