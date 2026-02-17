# Implementation Plan: GitHub Pages Deployment

## Overview

This implementation plan breaks down the GitHub Pages deployment feature into discrete, actionable tasks. The approach follows a logical sequence: first creating the GitHub Actions workflow file with all necessary steps, then updating the Nuxt configuration for proper base path handling, and finally adding verification and testing to ensure the deployment works correctly.

Each task builds incrementally, allowing for early validation through automated tests. The workflow will be testable locally using tools like `act` before being committed to the repository.

## Tasks

- [x] 1. Create GitHub Actions workflow directory structure
  - Create `.github/workflows/` directory if it doesn't exist
  - Set up the basic file structure for the workflow
  - _Requirements: 1.1_

- [ ] 2. Implement GitHub Actions workflow file
  - [x] 2.1 Create workflow file with metadata and triggers
    - Create `.github/workflows/deploy.yml` file
    - Add workflow name and trigger configuration (push, pull_request, workflow_dispatch)
    - Configure triggers to only activate on main branch
    - _Requirements: 1.1, 1.2, 2.1, 2.2, 2.3, 2.4_
  
  - [x] 2.2 Add permissions configuration
    - Add permissions block with `contents: write` and `pages: write`
    - Ensure minimal permissions are granted
    - _Requirements: 8.1_
  
  - [x] 2.3 Define job and runner configuration
    - Create `build-and-deploy` job
    - Set runner to `ubuntu-latest`
    - _Requirements: 1.3, 1.4_
  
  - [x] 2.4 Add repository checkout step
    - Add step using `actions/checkout@v4`
    - Include descriptive step name
    - _Requirements: 1.5, 9.4_
  
  - [x] 2.5 Add Node.js setup step
    - Add step using `actions/setup-node@v4`
    - Configure Node.js version 18
    - Enable npm caching with `cache: 'npm'`
    - _Requirements: 3.1, 3.2, 4.1, 9.4_
  
  - [x] 2.6 Add dependency installation step
    - Add step that runs `npm ci`
    - Include descriptive step name
    - _Requirements: 4.4, 9.4_
  
  - [x] 2.7 Add static site generation step
    - Add step that runs `npm run generate`
    - Include descriptive step name
    - _Requirements: 6.1, 9.4_
  
  - [x] 2.8 Add .nojekyll file creation step
    - Add step that runs `touch .output/public/.nojekyll`
    - Include descriptive step name
    - _Requirements: 6.5, 10.1, 9.4_
  
  - [x] 2.9 Add GitHub Pages deployment step
    - Add step using `peaceiris/actions-gh-pages@v3`
    - Configure to only run on main branch with conditional: `if: github.ref == 'refs/heads/main'`
    - Set `github_token` to `${{ secrets.GITHUB_TOKEN }}`
    - Set `publish_dir` to `.output/public`
    - Set `publish_branch` to `gh-pages`
    - Include descriptive step name
    - _Requirements: 7.1, 7.2, 7.5, 8.2, 9.4_

- [ ]* 2.10 Write property test for workflow YAML structure
  - **Property 1: Workflow YAML Structure Validity**
  - **Validates: Requirements 1.1, 1.2, 1.3, 1.4, 1.5**

- [ ]* 2.11 Write property test for workflow triggers
  - **Property 2: Workflow Trigger Configuration**
  - **Validates: Requirements 2.1, 2.2, 2.3, 2.4**

- [ ]* 2.12 Write property test for security configuration
  - **Property 10: Workflow Security Configuration**
  - **Validates: Requirements 8.1, 8.2, 8.3**

- [ ] 3. Update Nuxt configuration for GitHub Pages
  - [x] 3.1 Add base URL configuration to nuxt.config.ts
    - Add `app.baseURL` configuration with environment variable support
    - Set baseURL to use `NUXT_APP_BASE_URL` environment variable with fallback to '/'
    - Add comment explaining the base path requirement for GitHub Pages
    - _Requirements: 5.1, 5.3_
  
  - [x] 3.2 Configure static site generation mode
    - Set `ssr: false` to enable static generation
    - Verify `buildAssetsDir` is set to `_nuxt/` (default)
    - _Requirements: 5.2_
  
  - [ ]* 3.3 Write property test for Nuxt configuration
    - **Property 5: Nuxt Configuration for Static Generation**
    - **Validates: Requirements 5.1, 5.2, 5.3**

- [ ] 4. Add environment variable to workflow
  - [x] 4.1 Update build step with environment variable
    - Add `env` block to the generate step in workflow
    - Set `NUXT_APP_BASE_URL` to the repository path (e.g., `/repository-name/`)
    - Add comment explaining how to determine the correct base URL
    - _Requirements: 5.1_

- [x] 5. Checkpoint - Verify workflow configuration
  - Ensure all workflow steps are properly configured
  - Validate YAML syntax using a YAML linter or GitHub's workflow validator
  - Ask the user if questions arise

- [ ] 6. Create build verification tasks
  - [x] 6.1 Add build output verification
    - Create a script or workflow step to verify `.output/public` directory exists
    - Verify directory contains expected files (index.html, _nuxt/, .nojekyll)
    - _Requirements: 6.2, 6.6_
  
  - [ ]* 6.2 Write property test for build artifact completeness
    - **Property 8: Build Artifact Completeness**
    - **Validates: Requirements 6.2, 6.4, 6.5, 6.6, 10.1, 10.3**
  
  - [ ]* 6.3 Write property test for asset path correctness
    - **Property 6: Build Output Asset Paths**
    - **Validates: Requirements 5.4**

- [ ] 7. Add documentation
  - [x] 7.1 Create or update README with deployment instructions
    - Document how to enable GitHub Pages in repository settings
    - Explain how to determine the correct base URL for the repository
    - Add instructions for manual workflow triggering
    - Include troubleshooting section for common issues
    - _Requirements: 9.5_
  
  - [x] 7.2 Add inline comments to workflow file
    - Add comments explaining each major section
    - Document why certain configurations are necessary (e.g., .nojekyll file)
    - _Requirements: 9.4_

- [ ]* 8. Write integration tests
  - Test complete workflow execution using GitHub's `act` tool or similar
  - Verify gh-pages branch creation and content
  - Test that deployment only occurs on main branch pushes
  - _Requirements: 2.1, 7.2_

- [x] 9. Final checkpoint - Verify complete implementation
  - Run all property tests to ensure correctness
  - Verify workflow file is valid and complete
  - Verify Nuxt configuration is correct
  - Test build locally with `npm run generate`
  - Ensure all tests pass, ask the user if questions arise

## Notes

- Tasks marked with `*` are optional and can be skipped for faster MVP
- The workflow can be tested locally using `act` before pushing to GitHub
- The base URL must be updated to match the actual repository name before deployment
- GitHub Pages must be enabled in repository settings and configured to use the `gh-pages` branch
- First deployment may take a few minutes for GitHub Pages to become active
- Property tests validate universal correctness properties across different configurations
- Unit tests validate specific examples and edge cases
- Integration tests verify end-to-end workflow execution
