# DecideAI - Quick Setup Guide

## Prerequisites Checklist

- [ ] NeonDB account (or any Postgres database)
- [ ] Vercel AI Gateway API key
- [ ] Node.js 18+ or Bun installed

## Step-by-Step Setup

### 1. Environment Variables

Create `.env.local` in the project root:

```env
# AI Gateway (REQUIRED)
AI_GATEWAY_API_KEY=your_ai_gateway_api_key_here
AI_GATEWAY_BASE_URL=https://gateway.ai.cloudflare.com/v1/YOUR_ACCOUNT_ID/YOUR_GATEWAY_ID

# Database (REQUIRED)
DATABASE_URL=postgresql://user:password@host/database?sslmode=require

# App
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 2. Get AI Gateway API Key

1. Go to https://vercel.com/ai-gateway
2. Create a new gateway
3. Click "Create API Key"
4. Copy the key and gateway URL
5. Add to `.env.local`

### 3. Get NeonDB Connection String

1. Go to https://neon.tech
2. Create a new project
3. Copy the connection string
4. Add to `.env.local` as `DATABASE_URL`

### 4. Run Database Migrations

```bash
# Generate migration files
bunx drizzle-kit generate

# Apply migrations to database
bunx drizzle-kit migrate
```

### 5. Start Development Server

```bash
bun run dev
```

### 6. Open Browser

Navigate to http://localhost:3000

## Troubleshooting

### Database Connection Error
- Check `DATABASE_URL` is correct
- Ensure database is accessible
- Verify SSL mode is set

### AI Gateway Error
- Verify `AI_GATEWAY_API_KEY` is set
- Check `AI_GATEWAY_BASE_URL` format
- Ensure gateway is active

### Build Errors
- Run `bun install` to ensure all dependencies are installed
- Clear `.next` folder: `rm -rf .next`
- Restart dev server

## Testing

1. Click "New Chat" in sidebar
2. Ask: "What are the top 3 challenges for solo founders?"
3. Wait for responses from all three models
4. Check comparison metrics below responses
5. Verify chat appears in sidebar history

## Next Steps

- [ ] Add authentication (Better Auth)
- [ ] Customize model selection
- [ ] Add more AI models
- [ ] Deploy to Vercel
