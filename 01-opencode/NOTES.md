# Part 1 — OpenCode

## 1. Environment

- **Operating System:** Ubuntu (WSL)
- **AI Coding Agent:** OpenCode 2.2.5
- **AI Provider:** OpenAI (connected through ChatGPT)
- **AI Model:** [Enter the model you selected]
- **Reasoning Effort:** Medium

## 2. Target Codebase

I used a simple counter application built with HTML and JavaScript.

The application contains two files:
- `index.html`: Defines the page structure and user interface.
- `app.js`: Handles the counter's functionality and user interactions.

I chose a small application so I could easily understand the code and verify the agent's work.

## 3. Agent Interaction

### Task 1 — Understanding the Codebase

I asked OpenCode to analyze the existing project and explain its structure, the purpose of each file, and how the application works.

I compared the explanation with the actual source code and found it accurate.

### Task 2 — Modifying the Codebase

The next task was to add a Reset button that sets the counter back to zero without affecting the existing Increase button.

I limited the requested modifications to the necessary files to avoid unrelated changes.

**Status:** [Record whether OpenCode completed this modification.]

## 4. Code Review and Verification

I used the following Git command to inspect changes:

```bash
git diff
```

This command allows me to compare the modified code with the previous version and identify exactly what was changed.

**Verification results:** [Describe the buttons you tested, whether they worked, and any unexpected changes.]

## 5. Issues and Observations

- OpenCode's initial explanation of the codebase was correct.
- [Record any incorrect suggestions, failed commands, or unexpected changes.]
- [Record which changes you rejected, if any. If none, state that.]

## 6. Context Management

I directed OpenCode to the `01-opencode/target/` directory and specified which task it should perform.

For the initial analysis, I explicitly instructed the agent not to modify any files.

For the modification task, I requested a small, focused change rather than a complete rewrite.

[Add any project instructions, rules files, or other context you configured.]

## 7. What I Learned

This exercise helped me understand how an AI coding agent can inspect a codebase, explain its structure, and propose modifications.

I also learned the importance of giving the agent clear instructions and reviewing its output rather than assuming that generated code is always correct.

The developer remains responsible for understanding, testing, and verifying the final result.
