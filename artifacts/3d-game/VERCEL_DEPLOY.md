# Deploying Veera Yugam to Vercel

This application is a Vite + React + TypeScript app inside a pnpm workspace monorepo. It is ready to deploy as a static site on Vercel.

## Important: Monorepo Deployment

Because this project is a pnpm workspace, Vercel must install dependencies from the **workspace root** (`/`), then build the specific artifact (`artifacts/3d-game`).

## Option A: Deploy from the workspace root (Recommended)

### Using Vercel CLI

1. From the root of the repository (not `artifacts/3d-game`):
   ```bash
   cd /home/runner/workspace
   npm i -g vercel
   vercel --prod
   ```

2. When Vercel asks for settings, use:
   - **Root Directory**: `./` (workspace root)
   - **Framework Preset**: Vite
   - **Build Command**: `pnpm --filter @workspace/3d-game run build`
   - **Output Directory**: `artifacts/3d-game/dist/public`
   - **Install Command**: `pnpm install`

### Using Vercel Dashboard (GitHub/GitLab integration)

1. Import your repository in [vercel.com](https://vercel.com).
2. In the project settings, set **Root Directory** to `./`.
3. Set the fields above in the Build & Output Settings section.
4. Deploy.

## Option B: Deploy only the artifact directory

If you prefer to deploy only `artifacts/3d-game`, you must make the package self-contained by copying all required dependencies into it. This is **not recommended** because the workspace catalog dependencies (`catalog:`) require the root lockfile and pnpm-workspace.yaml.

## Environment Variables

No environment variables are required. The app uses defaults:
- `BASE_PATH=/`
- `PORT=3000`

## Routing

`vercel.json` at the workspace root configures SPA rewrites so all routes load `index.html`.

## Large Assets

The 66MB trailer video (`artifacts/3d-game/public/videos/trailer.mp4`) is copied into the output directory during the build and served statically by Vercel. Ensure your Vercel plan supports large static assets.

## Troubleshooting

- **Build fails with missing dependencies**: Make sure the Root Directory is set to `./` so Vercel installs the full pnpm workspace.
- **Routes show 404 on refresh**: Ensure the rewrite rule is active. The `vercel.json` at the workspace root handles this.
- **Blank screen / router issues**: Check the browser console. The `BASE_PATH` defaults to `/`, which is correct for Vercel.
