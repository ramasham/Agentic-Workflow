# Agentic Workflows 🤖

### Building with AI. Learning how it works. Verifying the results.

An exploration of AI-powered software development — from giving an agent its first coding task to connecting external tools, automating research, designing a website, and testing the final result.

**[Explore the live website 🌞](https://curiosity.ramasham.me/)**

---

*The Curiosity Lab — an interactive astronomy website developed through this project.*

## The idea behind this project

What happens when an AI agent can do more than just answer questions?

What if it can explore a codebase, interact with a browser, research websites, apply design instructions, and verify that its work actually functions?

That's what I wanted to explore through **Agentic Workflows**.

This repository documents five practical experiments using AI agents and the tools that extend their capabilities.

The goal wasn't simply to let AI do the work. It was to understand **what each tool does, how they work together, and why verification matters**.

---

## 🧩 Five experiments. Five different capabilities.

| Chapter | Tool | What I built |
|---|---|---|
| **01 · The Agent** | OpenCode | An interactive counter application |
| **02 · The Browser** | Playwright MCP | An offline book-image gallery |
| **03 · The Researcher** | Firecrawl MCP | A sourced web research report |
| **04 · The Designer** | Impeccable Skill | The Curiosity Lab |
| **05 · The Verifier** | Playwright Test | Automated end-to-end tests |

## 01 / Teaching an Agent to Code 🤖

**Tool: OpenCode**

I began with a simple interactive counter application.

Using OpenCode, I explored how an AI coding agent can inspect project files, understand instructions, modify source code, and assist with development tasks.

But generating code was only one part of the exercise. I also had to examine what changed and test whether the result behaved as expected.

**What I learned:** AI-generated code isn't automatically correct. Understanding and reviewing the changes remains essential.

[Explore the code →](01-opencode/)

## 02 / Giving the Agent a Browser 🌐

**Tool: Playwright MCP**

Next, I connected the AI agent to a real browser using the Model Context Protocol.

Instead of describing how to navigate a website, the agent could actually interact with webpages, inspect their content, and collect information.

I used this capability to explore Books to Scrape and build an offline gallery of book covers with their source information.

**What I learned:** MCP makes agents much more capable by connecting them to external tools. However, automation still requires careful checking of the collected results.

[Explore the gallery →](02-gallery/)

## 03 / Turning the Web Into Research 🔎

**Tool: Firecrawl MCP**

My research question was:

*How can developers build accessible and responsive personal portfolio websites?*

I used Firecrawl to retrieve information from five MDN resources covering semantic HTML, responsive layouts, CSS media queries, and accessibility.

I preserved the extracted responses and created a structured research report.

**What I learned:** Collecting information is not the same as verifying it. Good research requires traceable sources, accurate extraction, and critical evaluation.

[Read the research →](03-research/research.md)

## 04 / From an Idea to The Curiosity Lab 🌌

**Tool: Impeccable Skill**

This was the most creative part of the project.

I initially built a developer portfolio, but gradually explored more ambitious visual directions.

That experimentation eventually led to **The Curiosity Lab** — an astronomy website where visitors can explore planets, famous stars, galaxies, nebulae, and cosmic distances.

The website includes:

- Interactive celestial objects and detailed information popups.
- Astronomical imagery from scientific sources.
- A cosmic-distance experiment showing approximate light-travel times.
- A responsive, space-inspired visual experience.

The Impeccable Skill helped guide the design process as the website evolved.

**What I learned:** Good design requires iteration, attention to detail, and a clear visual direction. Sometimes the most important design decision is changing the original idea.

**[Visit The Curiosity Lab →](https://curiosity.ramasham.me/)**

[Explore the website source →](04-website/)

## 05 / Can We Trust the Result? 🧪

**Tool: Playwright Test**

The final experiment focused on automated verification.

I created browser tests to check page rendering, navigation, responsive behavior, interactions, and resource availability.

One of the most useful moments came when the tests discovered a genuine problem: the original website had no working favicon.

The tests detected an HTTP 404 error. After identifying the cause, I added a favicon and reran the suite to verify the fix.

**What I learned:** A website can look correct while still containing bugs. Automated tests provide repeatable evidence that important functionality works.

[Explore the tests →](05-tests/)

---

## 💭 What this project taught me

Three ideas stood out.

**01 — An AI agent is more than a chatbot.**

With the right tools, an agent can inspect files, navigate websites, collect information, and work within a development environment.

**02 — Different tools solve different problems.**

OpenCode provided the coding environment, MCP provided external capabilities, Impeccable supplied reusable design guidance, and Playwright Test provided automated verification.

**03 — Verification is part of development, not an optional final step.**

An agent completing a task does not prove the task was completed correctly. Reviewing code, checking sources, testing behavior, and investigating failures are essential.

---

## ⚙️ Run the project

Clone the repository:

```bash
git clone https://github.com/ramasham/Agentic-Workflow.git
cd Agentic-Workflow
```

Install dependencies:

```bash
npm ci
npx playwright install chromium
```

Run the automated tests:

```bash
npx playwright test --config=05-tests/playwright.config.js
```

Run The Curiosity Lab locally:

```bash
cd 04-website
python3 -m http.server 8000
```

Open `http://localhost:8000` in your browser.

For the original agent-based exercises, refer to the individual project notes and configuration files.

---

### Final thought

The most interesting part of this project wasn't what AI could generate.

It was discovering how much more useful these tools become when you understand **how they work, what they can do, and how to verify their output**.

*Build with curiosity. Verify with evidence. 🌞*
