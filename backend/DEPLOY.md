# SmartVent Backend - Deployment Guide

## Prerequisites

- MongoDB Atlas account (free tier works)
- Railway account (https://railway.app)
- Git repository with this backend code pushed

---

## Step 1: Set Up MongoDB Atlas

1. Go to https://www.mongodb.com/atlas and sign in
2. Create a **free cluster** (M0 Sandbox)
3. Under **Database Access**, create a database user:
   - Username: `smartvent`
   - Password: choose a strong password
   - Role: `Read and Write to any database`
4. Under **Network Access**, add IP address:
   - Click **Allow Access from Anywhere** (`0.0.0.0/0`) for Railway compatibility
5. Go to **Database > Connect > Drivers** and copy the connection string:
   ```
   mongodb+srv://smartvent:<password>@cluster0.xxxxx.mongodb.net/smartvent?retryWrites=true&w=majority
   ```
   Replace `<password>` with your actual database user password.

> The `smartvent` database and all collections will be auto-created on first insert.

---

## Step 2: Deploy on Railway

1. Go to https://railway.app and sign in with GitHub
2. Click **New Project > Deploy from GitHub Repo**
3. Select your repository and the `backend` folder as the root directory
4. Railway auto-detects Node.js and runs `npm start`

### Set Environment Variables

In Railway dashboard, go to your service > **Variables** tab and add:

| Variable     | Value                                              |
| ------------ | -------------------------------------------------- |
| `PORT`       | `5000` (Railway also injects its own PORT)         |
| `MONGO_URI`  | Your MongoDB Atlas connection string from Step 1   |
| `JWT_SECRET` | A strong random string (e.g. generate with `openssl rand -hex 32`) |

> Railway automatically assigns a PORT. The app uses `process.env.PORT || 5000`, so it works either way.

### Set Root Directory (if backend is in a subfolder)

If your repo has both frontend and backend folders:
1. Go to **Settings > Root Directory**
2. Set it to `backend`

---

## Step 3: Verify Deployment

Once deployed, Railway provides a public URL like `https://your-app.up.railway.app`.

Test the following endpoints:

```bash
# Health check
curl https://your-app.up.railway.app/api/health

# Get all products
curl https://your-app.up.railway.app/api/products

# Register a user
curl -X POST https://your-app.up.railway.app/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@test.com","password":"password123"}'

# Login
curl -X POST https://your-app.up.railway.app/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@test.com","password":"password123"}'
```

All endpoints should return JSON responses with `"success": true`.

---

## Step 4: Connect Frontend

In your frontend (deployed on Netlify or elsewhere), update the API base URL to point to your Railway backend URL:

```
https://your-app.up.railway.app
```

No other frontend changes are needed since CORS is configured to allow all origins.

---

## API Endpoints Reference

| Method | Endpoint                       | Auth Required |
| ------ | ------------------------------ | ------------- |
| GET    | `/api/health`                  | No            |
| POST   | `/api/auth/register`           | No            |
| POST   | `/api/auth/login`              | No            |
| GET    | `/api/auth/me`                 | Yes           |
| GET    | `/api/products`                | No            |
| GET    | `/api/products/:id`            | No            |
| GET    | `/api/cart`                    | Yes           |
| POST   | `/api/cart/add`                | Yes           |
| PUT    | `/api/cart/update`             | Yes           |
| DELETE | `/api/cart/remove/:productId`  | Yes           |
| DELETE | `/api/cart/clear`              | Yes           |
| GET    | `/api/orders`                  | Yes           |
| POST   | `/api/orders`                  | Yes           |
| GET    | `/api/device`                  | Yes           |

---

## Troubleshooting

- **503 errors on Railway**: Check the deploy logs. Usually a missing environment variable.
- **MongoDB connection fails**: Verify the Atlas connection string and that `0.0.0.0/0` is in Network Access.
- **CORS errors in browser**: The backend allows all origins (`*`). If issues persist, check that the frontend is using the correct Railway URL.
- **Empty products/data**: The server auto-seeds data on first startup. Check Railway logs for "MongoDB Connected" and seeding messages.
