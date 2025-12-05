# DecideAI - Error Handling & Development Mode

## Database Optional for Development

The app now works **without database configuration** for testing and development!

### What Works Without Database

✅ **Chat Interface** - Full UI is functional
✅ **Multi-Model Responses** - AI models still work (if AI Gateway is configured)
✅ **Mock Chat History** - Shows example conversations
✅ **All UI Components** - Complete interface available

### What Requires Database

❌ **Message Persistence** - Messages won't be saved
❌ **Real Chat History** - Only mock conversations shown
❌ **Conversation Management** - Create/delete won't persist

## Error Handling

### Toast Notifications (Sonner)

All errors and success messages now show as rich color toasts:

**Success Toasts (Green):**
- ✅ New chat created
- ✅ Response received from all models

**Error Toasts (Red):**
- ❌ Failed to load messages
- ❌ Failed to get response
- ❌ Failed to create chat
- ❌ Failed to load chat history

### Console Warnings

When database is not configured, you'll see helpful warnings:
```
⚠️  Database not configured, returning mock data
⚠️  Database not configured, skipping message persistence
```

## Quick Start (No Database)

1. **Test the UI without any setup:**
   ```bash
   bun run dev
   ```
   Open http://localhost:3000 - UI works with mock data!

2. **Add AI Gateway for real responses:**
   ```env
   # .env.local
   AI_GATEWAY_API_KEY=your_key_here
   AI_GATEWAY_BASE_URL=your_gateway_url
   ```

3. **Add Database for persistence:**
   ```env
   # .env.local
   DATABASE_URL=your_neondb_url
   ```
   Then run migrations:
   ```bash
   bunx drizzle-kit generate
   bunx drizzle-kit migrate
   ```

## Error Messages

### API Errors

All API routes now return helpful error messages:

**Before:**
```json
{ "error": "Internal server error" }
```

**After:**
```json
{
  "error": "Failed to process chat request",
  "details": "AI_GATEWAY_API_KEY is not configured"
}
```

### Model Errors

If a specific model fails, you'll see:
```
Error: Failed to get response from gpt4. API key invalid
```

Other models will still work!

## Development Workflow

### Phase 1: UI Development (No Setup)
```bash
bun run dev
# Test UI with mock data
# No environment variables needed
```

### Phase 2: AI Testing (AI Gateway Only)
```env
AI_GATEWAY_API_KEY=xxx
AI_GATEWAY_BASE_URL=xxx
```
```bash
bun run dev
# Test real AI responses
# Messages won't persist
```

### Phase 3: Full Production (Database + AI)
```env
AI_GATEWAY_API_KEY=xxx
AI_GATEWAY_BASE_URL=xxx
DATABASE_URL=xxx
```
```bash
bunx drizzle-kit migrate
bun run dev
# Full functionality
```

## Toast Notification Examples

```typescript
// Success
toast.success('Response received', {
  description: 'All models have responded successfully',
});

// Error
toast.error('Failed to get response', {
  description: 'Please check your AI Gateway configuration',
});

// Info
toast.info('Database not configured', {
  description: 'Messages will not be saved',
});
```

## Troubleshooting

### "Failed to load messages"
- **Cause**: Database not configured or connection failed
- **Solution**: Add `DATABASE_URL` to `.env.local` or continue with mock data

### "Failed to get response"
- **Cause**: AI Gateway not configured or API key invalid
- **Solution**: Check `AI_GATEWAY_API_KEY` and `AI_GATEWAY_BASE_URL`

### "Failed to create chat"
- **Cause**: Database error (non-fatal)
- **Solution**: Chat still works, just won't persist

## Benefits

✅ **Faster Development** - Test UI without setup
✅ **Better Errors** - Clear, actionable error messages
✅ **Graceful Degradation** - App works even with missing config
✅ **User Feedback** - Toast notifications for all actions
✅ **Non-Fatal Errors** - Database errors don't crash the app
