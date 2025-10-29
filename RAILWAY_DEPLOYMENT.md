# Railway.app Deployment Guide

This guide provides complete instructions for deploying the Alumni Portal to Railway.app.

## Prerequisites

1. A [Railway.app](https://railway.app) account
2. This GitHub repository connected to your account

## Deployment Steps

### 1. Create a New Project on Railway

1. Log in to [Railway.app](https://railway.app)
2. Click "New Project"
3. Select "Deploy from GitHub repo"
4. Choose this repository: `sh10kpatel/Alumni-Portal-IT-Workshop`
5. Railway will automatically detect the Node.js project

### 2. Add MySQL Database

1. In your Railway project dashboard, click "New" → "Database" → "Add MySQL"
2. Railway will automatically provision a MySQL database and inject these environment variables:
   - `MYSQLHOST`
   - `MYSQLUSER`
   - `MYSQLPASSWORD`
   - `MYSQLDATABASE`
   - `MYSQLPORT`

The application is already configured to use these variables (see `server/db.js`).

### 3. Initialize Database Schema

After the first deployment, you need to initialize the database with the schema and sample data:

**Option A: Using Railway's MySQL Shell**
1. Go to your MySQL database service in Railway
2. Click "Data" tab
3. Click "Query" or connect using the provided credentials
4. Copy and paste the contents of `server/schema.sql`
5. Execute the query

**Option B: Using a MySQL Client**
1. Get database credentials from Railway dashboard (MYSQLHOST, MYSQLUSER, etc.)
2. Connect using a MySQL client (MySQL Workbench, DBeaver, etc.)
3. Run the `server/schema.sql` script

### 4. Configure Environment Variables (Optional)

The following environment variables are automatically set by Railway:
- `PORT` - Railway automatically assigns this
- `MYSQLHOST`, `MYSQLUSER`, `MYSQLPASSWORD`, `MYSQLDATABASE`, `MYSQLPORT` - Set by MySQL plugin

Additional optional variables you can set in Railway's Variables tab:
- `NO_INMEM_FALLBACK=1` - Force MySQL requirement (fail if DB unavailable)

### 5. Deploy

Railway automatically deploys when you push to your repository's main branch.

To redeploy manually:
1. Go to your service in Railway
2. Click "Deployments" tab
3. Click "Deploy" on the latest deployment or trigger a new deployment

### 6. Access Your Application

Once deployed:
1. Railway provides a public URL (e.g., `https://your-app.up.railway.app`)
2. Visit the URL to access the login page
3. Use the default credentials from `server/schema.sql`:
   - **Alumni**: `aarav` / `pass1234`
   - **Student**: `ananya` / `pass1234`
   - **Admin**: `rohan` / `pass1234`

## Architecture

### Application Structure

```
├── server/              # Backend Express.js API
│   ├── index.js        # Main server file (serves API + static files)
│   ├── db.js           # MySQL connection pool
│   ├── package.json    # Dependencies
│   └── schema.sql      # Database schema
├── *.html              # Frontend static files (served by Express)
└── package.json        # Root package (runs server)
```

### How It Works

1. **Start Command**: Railway runs `npm start` which executes `cd server && npm install && npm start`
2. **Server**: Express.js server starts on Railway's assigned `PORT`
3. **Static Files**: Server serves HTML files from the root directory
4. **API**: All `/api/*` endpoints are handled by Express
5. **Database**: Connects to Railway's MySQL database using environment variables

### Fallback Mechanisms

The application includes multiple fallback mechanisms for development:

1. **MySQL** (Production) - Used on Railway
2. **SQLite** (Fallback) - Used if MySQL unavailable locally
3. **In-Memory** (Dev) - Used if no database available

On Railway with MySQL plugin, the app will always use MySQL.

## Troubleshooting

### Check Logs

1. Go to your Railway project
2. Click on your service
3. Click "Logs" tab to see real-time logs

### Common Issues

**Database Connection Failed**
- Verify MySQL plugin is added to your project
- Check that environment variables are set (MYSQLHOST, etc.)
- Ensure database schema is initialized

**Port Issues**
- Railway automatically sets PORT - no configuration needed
- Server uses `process.env.PORT || 4000`

**Static Files Not Loading**
- Verify all HTML files are in the root directory (not inside /server)
- Check Railway logs for any file serving errors

**API Not Responding**
- Check `/health` endpoint: `https://your-app.up.railway.app/health`
- Should return: `{"ok":true,"ts":...}`

### Environment Variable Check

To verify environment variables are set correctly:
1. Railway Dashboard → Your Service → Variables tab
2. Ensure these are present:
   - `MYSQLHOST`
   - `MYSQLUSER`
   - `MYSQLPASSWORD`
   - `MYSQLDATABASE`
   - `MYSQLPORT`
   - `PORT` (auto-set by Railway)

## Development vs Production

### Local Development
- Open HTML files directly in browser (file:// protocol)
- API runs on localhost:4000
- Uses SQLite or in-memory fallback if MySQL not available

### Railway Production
- Access via HTTPS URL provided by Railway
- API and frontend served from same origin (no CORS issues)
- Uses Railway's MySQL database
- Auto-detects API base URL (same origin)

## Security Notes

1. **Environment Variables**: Never commit `.env` files with production credentials
2. **Database**: Railway's MySQL is password-protected by default
3. **HTTPS**: Railway provides HTTPS automatically
4. **Passwords**: All passwords are bcrypt-hashed in the database

## Monitoring

Railway provides:
- **Metrics**: CPU, Memory, Network usage
- **Logs**: Real-time application logs
- **Deployments**: History of all deployments
- **Database**: Query interface and metrics

## Scaling

Railway automatically handles:
- **Vertical Scaling**: Increase resources as needed
- **HTTPS**: SSL certificates
- **CDN**: Static file caching
- **Zero-downtime**: Deployments

## Cost

- Railway offers a free tier with limited hours
- MySQL database usage is included
- Check [Railway Pricing](https://railway.app/pricing) for details

## Support

For issues:
1. Check Railway's [documentation](https://docs.railway.app)
2. Review application logs in Railway dashboard
3. Check this repository's issues page
