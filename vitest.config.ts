import { defineConfig, configDefaults } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'jsdom',
    // Never pick up tests from local git worktrees (.claude/worktrees/**) — they
    // hold other branches' code and aren't part of this checkout (or CI's).
    exclude: [...configDefaults.exclude, '**/.claude/**', '**/worktrees/**'],
  },
});
