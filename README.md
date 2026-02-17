# Nuxt Minimal Starter

Look at the [Nuxt documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.

## Setup

Make sure to install dependencies:

```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install

# bun
bun install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev

# pnpm
pnpm dev

# yarn
yarn dev

# bun
bun run dev
```

## Production

Build the application for production:

```bash
# npm
npm run build

# pnpm
pnpm build

# yarn
yarn build

# bun
bun run build
```

Locally preview production build:

```bash
# npm
npm run preview

# pnpm
pnpm preview

# yarn
yarn preview

# bun
bun run preview
```

## Deployment to GitHub Pages

This project is configured for automatic deployment to GitHub Pages using GitHub Actions. Every push to the `main` branch triggers a build and deployment workflow.

### Initial Setup

#### 1. Enable GitHub Pages

1. Go to your repository on GitHub
2. Click on **Settings** tab
3. In the left sidebar, click **Pages**
4. Under **Source**, select:
   - **Source**: Deploy from a branch
   - **Branch**: `gh-pages`
   - **Folder**: `/ (root)`
5. Click **Save**

#### 2. Configure Base URL

The base URL must match your repository name for assets and routing to work correctly.

**To determine your base URL:**
- Your repository URL is: `https://github.com/username/repository-name`
- Your base URL should be: `/repository-name/`

**Update the workflow file:**

Open `.github/workflows/deploy.yml` and update the `NUXT_APP_BASE_URL` environment variable:

```yaml
- name: Generate static site
  run: npm run generate
  env:
    NUXT_APP_BASE_URL: /your-repository-name/  # Replace with your actual repository name
```

**Example:**
- If your repo is `https://github.com/johndoe/pokemon-tcg`, use `/pokemon-tcg/`
- If your repo is `https://github.com/janedoe/my-app`, use `/my-app/`

#### 3. Verify Workflow Permissions

Ensure the workflow has the necessary permissions:

1. Go to **Settings** → **Actions** → **General**
2. Scroll to **Workflow permissions**
3. Select **Read and write permissions**
4. Check **Allow GitHub Actions to create and approve pull requests**
5. Click **Save**

### Automatic Deployment

Once configured, deployment happens automatically:

1. Push code to the `main` branch
2. GitHub Actions runs the workflow (takes 2-5 minutes)
3. Site is deployed to `https://username.github.io/repository-name/`

**Monitor deployment:**
- Go to the **Actions** tab in your repository
- Click on the latest workflow run to see progress and logs

### Manual Deployment

You can manually trigger a deployment:

1. Go to the **Actions** tab
2. Click on **Deploy to GitHub Pages** workflow
3. Click **Run workflow** button
4. Select the `main` branch
5. Click **Run workflow**

### Local Testing with Base Path

To test the production build locally with the base path:

```bash
# Build with base path
NUXT_APP_BASE_URL=/your-repository-name/ npm run generate

# Preview the build
npm run preview
```

Note: The preview server serves from root, so some paths may not work exactly as they will on GitHub Pages. For accurate testing, deploy to GitHub Pages.

### Troubleshooting

#### Assets not loading (404 errors)

**Problem:** CSS, JavaScript, or images return 404 errors.

**Solution:**
- Verify the `NUXT_APP_BASE_URL` in `.github/workflows/deploy.yml` matches your repository name
- Ensure it starts and ends with a forward slash: `/repository-name/`
- Check that the workflow completed successfully in the Actions tab

#### Workflow fails with permission error

**Problem:** Workflow fails with "Permission denied" or "403" error.

**Solution:**
- Go to **Settings** → **Actions** → **General**
- Under **Workflow permissions**, select **Read and write permissions**
- Re-run the workflow

#### GitHub Pages shows 404

**Problem:** GitHub Pages URL shows "404 - File not found".

**Solution:**
- Verify GitHub Pages is enabled in **Settings** → **Pages**
- Ensure **Source** is set to `gh-pages` branch
- Check that the workflow completed successfully and created the `gh-pages` branch
- Wait a few minutes - first deployment can take 5-10 minutes to become active

#### Blank page or routing issues

**Problem:** Site loads but shows a blank page or navigation doesn't work.

**Solution:**
- Verify `ssr: false` is set in `nuxt.config.ts`
- Check browser console for errors
- Ensure `baseURL` in `nuxt.config.ts` uses the environment variable:
  ```typescript
  baseURL: process.env.NUXT_APP_BASE_URL || '/',
  ```

#### Workflow runs but doesn't deploy

**Problem:** Workflow completes successfully but site doesn't update.

**Solution:**
- Check if the workflow ran on the `main` branch (deployment only happens on `main`)
- Verify the deployment step has the condition: `if: github.ref == 'refs/heads/main'`
- Check the workflow logs for the "Deploy to GitHub Pages" step

#### Cache issues

**Problem:** Old version of site is still showing after deployment.

**Solution:**
- Hard refresh your browser: `Ctrl+F5` (Windows/Linux) or `Cmd+Shift+R` (Mac)
- Clear browser cache
- Try in an incognito/private window
- Check the workflow logs to confirm new deployment completed

#### Build fails with dependency errors

**Problem:** Workflow fails during "Install dependencies" or "Generate static site" steps.

**Solution:**
- Ensure `package-lock.json` is committed to the repository
- Try deleting the Actions cache: **Settings** → **Actions** → **Caches** → Delete all caches
- Verify the build works locally: `npm ci && npm run generate`
- Check Node.js version compatibility (workflow uses Node 18)

### Deployment URL

After successful deployment, your site will be available at:

```
https://username.github.io/repository-name/
```

Replace `username` with your GitHub username and `repository-name` with your repository name.

### Additional Resources

- [GitHub Pages Documentation](https://docs.github.com/en/pages)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Nuxt Deployment Guide](https://nuxt.com/docs/getting-started/deployment)
