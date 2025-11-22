module.exports = {
  extends: ["@commitlint/config-conventional"],
  // Custom rules
  rules: {
    "type-enum": [
      2,
      "always",
      [
        "build",
        "chore",
        "ci",
        "docs",
        "feat",
        "fix",
        "perf",
        "refactor",
        "style",
        "test",
        "revert",
        "wip",
      ],
    ],
    "subject-case": [0],
  },
};
