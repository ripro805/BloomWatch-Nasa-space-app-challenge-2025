# 🌱 BloomWatch Deployment Guide

This document explains how to deploy the BloomWatch project frontend and backend using Netlify and Render.

---

## 🚀 Backend Deployment (Render)

1. **Go to [Render.com](https://render.com/)** and sign up or log in.
2. Click **"New +"** → **"Web Service"**.
3. Connect your GitHub and select your repo: `BloomWatch-Nasa-space-app-challenge-2025`.
4. **Root Directory:** Set to `backend`.
5. **Build Command:** `npm install`
6. **Start Command:** `npm start`
7. **Environment Variables:**
   - Add all variables from your `backend/.env` file (e.g., `DATABASE_URL`, `JWT_SECRET`, etc.).
8. **Plan:** Choose Free or Paid as needed.
9. Click **"Create Web Service"**.
10. Wait for deployment. Your backend API will be live at the provided Render URL.

---

## 🌸 Frontend Deployment (Netlify)

1. **Go to [Netlify.com](https://netlify.com/)** and sign up or log in.
2. Click **"Add new site"** → **"Import an existing project"**.
3. Connect your GitHub and select your repo.
4. **Base Directory:** Set to `frontend` (in Netlify UI, this is called 'Base directory').
5. **Build Command:** `npm run build`
6. **Publish Directory:** `dist`
7. **Environment Variables:** Add if needed (usually not required for this project).
8. Click **"Deploy Site"**.
9. After deployment, your frontend will be live at the provided Netlify URL.

---

## ⚠️ Common Mistakes
- **Do NOT deploy frontend on Render.** Use Netlify for frontend, Render for backend.
- **If you see 'm' or a blank page on Render,** you are deploying the frontend incorrectly.
- **Always check your environment variables** for typos or missing values.

---

## 📝 Quick Reference Table

| Part      | Platform | Config File      | Build Command   | Publish/Root Dir |
|-----------|----------|------------------|-----------------|------------------|
| Frontend  | Netlify  | netlify.toml     | npm run build   | dist             |
| Backend   | Render   | render.yaml      | npm install     | backend/         |

---

## 💡 Need Help?
If you get any deployment errors, copy the error and ask for help!

---

*Happy deploying!*
