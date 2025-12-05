# 🚀 Quick Start Guide - DecideAI

## ✅ Step 1: Environment Variables Created

I've created `.env.local` with all necessary variables. Now you need to fill in the actual values:

## 📝 Step 2: Get Your API Keys

### 1. AI Gateway (REQUIRED)

**Get your AI Gateway API key:**

1. Go to **https://vercel.com/ai-gateway**
2. Sign in with your Vercel account
3. Click **"Create Gateway"**
4. Give it a name (e.g., "DecideAI")
5. Click **"Create API Key"**
6. Copy the **API Key**

**Update `.env.local`:**
```bash
AI_GATEWAY_API_KEY=vg_xxxxxxxxxxxxx
```

That's it! Vercel handles the routing automatically - no base URL needed.

### 2. NeonDB Database (REQUIRED)

**Get your database connection string:**

1. Go to **https://neon.tech**
2. Sign up or log in
3. Click **"Create Project"**
4. Give it a name (e.g., "DecideAI")
5. Click **"Connection Details"**
6. Select **"Pooled connection"** (better performance)
7. Copy the connection string

**Update `.env.local`:**
```bash
DATABASE_URL=postgresql://username:password@ep-xxxxx.us-east-2.aws.neon.tech/neondb?sslmode=require
```

### 3. Better Auth Secret (Optional)

**Generate a random secret:**

```bash
openssl rand -base64 32
```

Or visit: **https://generate-secret.vercel.app/32**

**Update `.env.local`:**
```bash
BETTER_AUTH_SECRET=your_generated_secret_here
```

## 🗄️ Step 3: Set Up Database

Once you've added `DATABASE_URL` to `.env.local`:

```bash
# Generate migration files
bunx drizzle-kit generate

# Apply migrations to database
bunx drizzle-kit migrate
```

## 🎯 Step 4: Start the App

```bash
bun run dev
```

Open **http://localhost:3000**

## ✨ What Works Now

- ✅ **With AI Gateway only**: Multi-model chat works, no persistence
- ✅ **With Database only**: Chat history works, but no AI responses
- ✅ **With Both**: Full functionality!

## 🐛 Troubleshooting

### "AI Gateway not configured" error
- Check `AI_GATEWAY_API_KEY` is set in `.env.local`
- Make sure the API key starts with `vg_`
- Restart dev server after adding env vars

### "Failed to load messages" error
- Check `DATABASE_URL` is set in `.env.local`
- Run migrations: `bunx drizzle-kit migrate`
- Check database is accessible

### Toast notifications not showing
- Check browser console (F12) for errors
- Make sure you restarted the dev server
- Clear browser cache

## 📁 Your `.env.local` File

The file is located at:
```
/home/jaznan/Projects/own/DecideAI/.env.local
```

Edit it with your favorite editor:
```bash
code .env.local
# or
nano .env.local
# or
vim .env.local
```

## 🎉 Next Steps

1. Fill in your API keys in `.env.local`
2. Run database migrations
3. Start the dev server
4. Ask your first business question!

---

**Need help?** Check the full documentation in `SETUP.md` and `ERROR_HANDLING.md`
