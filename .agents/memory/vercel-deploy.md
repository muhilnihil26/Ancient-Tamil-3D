---
name: Vercel deploy fix
description: How vercel.json must be configured for this monorepo
---

## Rule
Do NOT set `"framework": "vite"` in vercel.json for this project.

**Why:** The `framework` preset overrides `outputDirectory` with Vite's default (`dist`), conflicting with our custom path `artifacts/3d-game/dist/public`. The build succeeds but Vercel can't find the output.

**Correct vercel.json:**
```json
{
  "buildCommand": "pnpm --filter @workspace/3d-game run build",
  "outputDirectory": "artifacts/3d-game/dist/public",
  "installCommand": "pnpm install",
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
}
```

No `framework` field. No `$schema` is required but harmless.

**How to apply:** Any time vercel.json is touched, verify `framework` key is absent.
