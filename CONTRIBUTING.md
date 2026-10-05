# Contributing to NextSet

Thank you for your interest in contributing to **NextSet**! Whether you are fixing a bug, improving documentation, or proposing new features, your help is appreciated.

---

## 🛠️ Development Setup

### 1. Requirements
- **Node.js**: `v20.x` or higher
- **npm**: `v10.x` or higher
- **Git**

### 2. Fork & Clone
```bash
git clone https://github.com/your-username/nextset.git
cd nextset
```

### 3. Install Dependencies
NextSet uses **npm workspaces** to manage packages across the monorepo:
```bash
npm install
```

### 4. Configure Environment
```bash
cp apps/web/.env.example apps/web/.env.local
cp apps/api/.env.example apps/api/.dev.vars
```

### 5. Start the Development Server
```bash
# Run web client
npm run dev

# Or run API worker
npm run dev:api
```

---

## 📐 Project Structure

- `apps/web/`: Next.js 14 client application with Dexie / IndexedDB for local storage.
- `apps/api/`: Cloudflare Worker API written with Hono and Cloudflare D1.
- `packages/shared/`: Shared domain models, TypeScript interfaces, and validation schemas.

---

## 🧪 Testing & Quality Standards

Before submitting a Pull Request, make sure all tests and type checks pass cleanly:

```bash
# Run unit tests
npm test

# Run TypeScript checks across all workspaces
npm run typecheck

# Verify static build
npm run build
```

---

## 🎨 Design & Code Guidelines

1. **User Experience First**: Keep language simple, intuitive, and human. Avoid exposing internal technical jargon (database names, IDs, queue internals) to the user interface.
2. **Vanilla CSS Modules**: Use CSS Modules and CSS design tokens defined in `apps/web/src/styles/tokens.css`.
3. **Accessibility**: Ensure buttons have descriptive `aria-label`s, modals manage focus and dismiss gracefully, and color contrast meets standards across dark themes.
4. **Offline First**: All user actions (creating workouts, logging sets, updating weights) must succeed locally first without waiting on network availability.

---

## 📝 Commit Conventions

We follow [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` A new feature or capability
- `fix:` A bug fix or UI correction
- `docs:` Documentation updates
- `style:` Formatting or cosmetic changes that do not affect code logic
- `refactor:` Code improvements without changing external behavior
- `test:` Adding or updating tests
- `chore:` Dependency bumps, build configs, or maintenance tasks

*Example:* `feat(plates): add visual Olympic barbell collar indicators`

---

## 🚀 Pull Request Process

1. Create a descriptive feature branch:
   ```bash
   git checkout -b feature/your-feature-name
   ```
2. Commit your changes following the commit guidelines.
3. Push to your fork:
   ```bash
   git push origin feature/your-feature-name
   ```
4. Open a Pull Request against the `main` branch. Provide a clear summary of what your changes achieve, including screenshots for any visual UI modifications.
