# Git Commands for Task Management System

## Step 1: Initialize Git Repository (if not already done)

```bash
cd c:\earnest fintech
git init
```

## Step 2: Configure Git User (if not configured globally)

```bash
git config user.name "Your Name"
git config user.email "your.email@example.com"
```

Or configure globally for all repositories:

```bash
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"
```

## Step 3: Add All Files to Staging Area

```bash
git add .
```

Or add specific directories:

```bash
git add backend/
git add frontend/
git add *.md
git add .gitignore
```

## Step 4: Verify What Will Be Committed

```bash
git status
```

This should show your changes and exclude .env files (thanks to .gitignore).

## Step 5: Create First Commit

```bash
git commit -m "Initial commit: Task Management System (Track A - Full Stack)

- Backend: Node.js/Express API with JWT authentication
- Frontend: Next.js web application with responsive UI
- Features: Complete CRUD operations, task filtering, pagination
- Database: Prisma ORM with SQLite
- Authentication: JWT with access and refresh tokens"
```

## Step 6: Add Remote Repository

If you're using GitHub:

```bash
# HTTPS method (enter credentials when prompted)
git remote add origin https://github.com/YOUR_USERNAME/task-management-system.git

# OR SSH method (if you have SSH key configured)
git remote add origin git@github.com:YOUR_USERNAME/task-management-system.git
```

Replace `YOUR_USERNAME` with your actual GitHub username and `task-management-system` with your repo name.

## Step 7: Rename Default Branch to Main (Optional but Recommended)

```bash
git branch -M main
```

## Step 8: Push to Remote Repository

```bash
git push -u origin main
```

The `-u` flag sets the upstream tracking branch so future pushes don't require specifying the branch.

---

## Complete Quick Reference

```bash
# Navigate to project directory
cd c:\earnest fintech

# Initialize git (if needed)
git init

# Configure user
git config user.name "Your Name"
git config user.email "your.email@example.com"

# Check what will be committed (verify .env files are excluded)
git status

# Add all files
git add .

# Create initial commit
git commit -m "Initial commit: Task Management System (Track A - Full Stack)"

# Add remote repository
git remote add origin https://github.com/YOUR_USERNAME/task-management-system.git

# Rename branch to main
git branch -M main

# Push to remote
git push -u origin main
```

---

## Subsequent Commits

After the initial push, use these simpler commands:

```bash
# Stage changes
git add .

# Commit changes
git commit -m "Clear commit message describing changes"

# Push to remote
git push
```

---

## Useful Git Commands

```bash
# Check current remote
git remote -v

# Check git log/history
git log --oneline

# Check current branch
git branch

# Create a new branch for features
git checkout -b feature/task-priority

# Switch branches
git checkout main

# Merge branches
git merge feature/task-priority

# Pull latest changes from remote
git pull origin main

# Check status
git status

# View what changed in a file
git diff filename

# View staged changes
git diff --staged
```

---

## Before You Push - Checklist

✅ Verify .env files are NOT included:
```bash
git status --ignored
```

✅ Check that sensitive files are gitignored:
```bash
git check-ignore .env
git check-ignore backend/.env
git check-ignore frontend/.env.local
```

✅ Verify important files ARE included:
```bash
git status
# Should show: README.md, .gitignore, backend/, frontend/, etc.
# Should NOT show: .env, node_modules/, prisma/dev.db
```

---

## If You've Already Made a Commit

If you already committed and need to redo it without the .env files:

```bash
# Remove the files cached in git but keep them locally
git rm --cached .env
git rm --cached backend/.env
git rm --cached frontend/.env.local

# Commit the removal
git commit --amend -m "Initial commit: Task Management System (Track A - Full Stack)"

# Push
git push -u origin main --force-with-lease
```

⚠️ **Note:** Only use `--force-with-lease` on your own local repository or when you're sure no one else is working on it.

---

## GitHub Setup Instructions

1. Go to https://github.com/new
2. Choose repository name: `task-management-system`
3. Add description: `Full-stack task management system with Node.js backend and Next.js frontend`
4. Choose Public or Private
5. DO NOT initialize with README, .gitignore, or license (you have your own)
6. Click "Create repository"
7. Copy the repository URL
8. Use the URL in `git remote add origin` command above

