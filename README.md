# Agentic Workflows

## Description

This project explores how an AI coding agent, browser automation, web research, reusable design instructions, and automated tests can work together while keeping the developer responsible for checking the results. It contains five exercises:

1. **OpenCode** — inspect and modify a small HTML/JavaScript counter. The current counter has Increase and Reset buttons. See [`01-opencode/NOTES.md`](01-opencode/NOTES.md).
2. **Playwright MCP gallery** — use browser tools to explore [Books to Scrape](https://books.toscrape.com/) and create a local gallery of 15 selected covers, with source metadata. See [`02-gallery/NOTES.md`](02-gallery/NOTES.md).
3. **Firecrawl MCP research** — research accessible, responsive portfolios using five MDN articles, save raw responses, and check selected extracted sections against the originals. See [`03-research/research.md`](03-research/research.md).
4. **Design Skill and portfolio** — use the project-local Impeccable Skill and a design brief to develop a responsive, systems-themed portfolio using HTML, CSS, and JavaScript. See [`04-website/NOTES.md`](04-website/NOTES.md) and [`PRODUCT.md`](PRODUCT.md).
5. **Playwright Test** — exercise the portfolio at mobile and desktop widths, identify a missing favicon, fix it, and rerun the tests. See [`05-tests/REPORT.md`](05-tests/REPORT.md).

## Instructions

### Prerequisites and versions

- Git, a browser, Python 3, Node.js and npm. The current environment reports **Python 3.12.3**, **Node.js 22.23.2**, and **npm 10.9.8**; these are observed versions, not declared minimums.
- OpenCode **2.2.5** is recorded in Part 1 and was available in the current environment. The Part 1 notes record OpenAI connected through ChatGPT and medium reasoning effort; the model name is **not recorded and needs review**. An account and an available model are required to repeat agent interactions.
- `package-lock.json` records **@playwright/mcp 0.0.84** and **@playwright/test 1.64.1**. Install Chromium for Playwright Test; Linux may also require browser system dependencies.
- Internet access is needed to install dependencies, connect AI/MCP services, and revisit external sources. The generated gallery and portfolio can be viewed locally without those services.

### Clone and install

```sh
git clone https://github.com/ramasham/Agentic-Workflow.git
cd Agentic-Workflow
npm ci
npx playwright install chromium
```

On Linux, if browser system dependencies are missing, use `npx playwright install --with-deps chromium` instead; this may require administrator privileges. Install OpenCode separately using the [official installation instructions](https://opencode.ai/v2/docs/), for example:

```sh
npm install -g @opencode/cli
opencode --version
```

The installation command installs the version available at installation time; it does not pin the recorded 2.2.5. The npm lockfile pins the project dependencies. `npm test` is a placeholder that exits with an error; use the explicit Playwright command below.

> **Fresh-clone caveat:** At the time of this documentation, the favicon fix in `04-website/index.html` and the new `04-website/favicon.svg` were uncommitted; the SVG was untracked. A clone cannot contain those changes until they are committed and pushed. The recorded 34-pass result applies to the working tree with both changes present, not necessarily to the current remote revision.

### Agent and MCP configuration

From the repository root, start `opencode`. In its interface use `/connect` to connect a provider and `/models` to select an available model. The recorded setup used OpenAI's ChatGPT sign-in; use your own authorized account. Check the existing MCP configuration with:

```sh
opencode mcp list
```

The checked-in `opencode.json` configures a remote Firecrawl MCP endpoint with OAuth disabled and a local, headless Playwright MCP launched by `npx --no-install @playwright/mcp`; run `npm ci` first. Server availability, authorization, usage limits, and any credentials depend on the service and account. Consult the [Firecrawl MCP documentation](https://docs.firecrawl.dev/mcp-server) and OpenCode's [MCP documentation](https://opencode.ai/v2/docs/mcp-servers) if a connection fails. Do not commit credentials.

The checked-in `.env.example` is empty, and this project's configuration declares **no required environment variables**. Viewing the existing artifacts and running the tests do not require AI-provider or Firecrawl credentials. If your service setup requires credentials, supply them securely using the provider's documented method rather than placing them in the repository. The Impeccable Skill is already present under `.opencode/skills/impeccable/`; its original installation command is not established by the project history.

### Run or inspect each part

All commands below start at the repository root. Stop each foreground Python server with `Ctrl+C` before reusing its port.

**1. Counter and OpenCode.** Serve the existing app, then visit <http://127.0.0.1:8000/> and try Increase and Reset:

```sh
python3 -m http.server 8000 --bind 127.0.0.1 --directory 01-opencode/target
```

To repeat the agent exercise, start `opencode` in another terminal and ask it to inspect `01-opencode/target/` without changing files. The current files already contain Reset, so repeating the original modification requires an appropriate earlier version or a separate copy; do not overwrite your work. Review proposed changes with `git diff`. The notes do not record the original button-test results.

**2. Gallery.** View the saved gallery at <http://127.0.0.1:8000/gallery.html>:

```sh
python3 -m http.server 8000 --bind 127.0.0.1 --directory 02-gallery
```

The covers are in `02-gallery/assets/` and source metadata is in `02-gallery/sources.json`. To repeat the interactive research, connect Playwright MCP, start `opencode`, and ask the agent to inspect the catalogue and selected books described in the notes. The repository does not provide a standalone gallery-generation script or exact original prompts, so regeneration is not a deterministic one-command process; external pages may change.

**3. Research.** Read `03-research/research.md` and the five saved `03-research/raw/source-*.json` files. To repeat the research, connect Firecrawl MCP, start `opencode`, and ask the agent to search for the research question and scrape the five cited MDN URLs. Compare extracted passages to the originals and save any new responses separately. The original notes describe exporting the OpenCode session and using Python to extract tool responses; they do not provide a reproducible export script or exact prompts.

**4. Portfolio.** Serve the site and visit <http://127.0.0.1:8000/>:

```sh
python3 -m http.server 8000 --bind 127.0.0.1 --directory 04-website
```

To explore the design workflow, start `opencode` and request `@impeccable` guidance for the portfolio, using `PRODUCT.md` and `04-website/NOTES.md` as context. Repeating the AI session need not produce identical output. The portfolio deliberately leaves contact details as a placeholder; confirm details and project links before publication.

**5. Tests.** With dependencies and Chromium installed, make sure port 8765 is free, then run:

```sh
npx playwright test --config=05-tests/playwright.config.js
```

The configuration starts and stops a Python server automatically. It runs headless Chromium with reduced motion at **375×812** and **1440×900**. The recorded result after the favicon fix is **34 passed, 0 failed**; the preserved pre-fix output is in [`05-tests/evidence/favicon-before.txt`](05-tests/evidence/favicon-before.txt). The mobile project is a narrow desktop-Chromium viewport, not full mobile-device emulation. Console and network listeners cover observed events during tested interactions, not every browser behavior. These checks are not a complete accessibility audit. The older `05-tests/README.md` still says Part 5 is in progress; `05-tests/REPORT.md` describes the subsequent fix.

## Resources

### Documentation and source material

- [OpenCode documentation](https://opencode.ai/v2/docs/), including [providers](https://opencode.ai/v2/docs/providers), [Skills](https://opencode.ai/v2/docs/skills), and [MCP servers](https://opencode.ai/v2/docs/mcp-servers).
- [Model Context Protocol documentation](https://modelcontextprotocol.io/), [Playwright MCP](https://github.com/microsoft/playwright-mcp), [Playwright Test](https://playwright.dev/docs/intro), and [Firecrawl MCP](https://docs.firecrawl.dev/mcp-server).
- The five MDN sources recorded and audited in the research report: [semantic HTML](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Accessibility/HTML), [responsive design](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/CSS_layout/Responsive_Design), [media queries](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/CSS_layout/Media_queries), [text labels and names](https://developer.mozilla.org/en-US/docs/Web/Accessibility/Guides/Understanding_WCAG/Text_labels_and_names), and [accessibility tooling](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Accessibility/Tooling).
- [Books to Scrape](https://books.toscrape.com/) is the gallery's scraping-practice source. The local Impeccable Skill contains its own instructions and references in `.opencode/skills/impeccable/`.

### AI use and verification

| Part | AI assistance | Verification and limits |
| --- | --- | --- |
| 1 | OpenCode was asked to explain the counter and add Reset. | The notes report comparing the explanation with the source and using `git diff`. The source contains Reset, but the notes leave completion and manual button-test results blank; **review and complete those observations**. |
| 2 | The agent used Playwright MCP to inspect catalogue pages and assemble selected covers and metadata. | The notes report manually opening the gallery and checking covers, local image paths, source links, JSON, and asset files. |
| 3 | The agent used Firecrawl search and scrape to collect and summarize five sources. | Raw responses were saved; the notes report manual comparison of selected sections with MDN. The report explicitly says this was not an exhaustive verification of every element. |
| 4 | The agent used the Impeccable Skill and the design brief for the portfolio's layout, adaptation, and motion. | The notes record browser checks of fragment links, overflow, touch targets, reduced motion, and keyboard focus. They do not establish full accessibility certification or real-device testing. |
| 5 | AI assisted with reviewing the Playwright suite and diagnosing the favicon problem. | A new availability assertion reproduced the real 404 at both widths; the preserved output and report document the failure and the 34-pass rerun after the fix. |

## Learning Report

- **Scope and review:** The counter exercise illustrates why an agent needs a focused task and why generated explanations and edits should be checked against source and diffs. The missing Part 1 verification notes are a reminder to record actual results at the time rather than reconstruct them later.
- **Browser versus local runtime:** During gallery creation, `require is not defined` exposed the difference between browser JavaScript and Node.js. A workspace path was rejected, `python` was unavailable, and Playwright could not open a local `file:` URL. The notes describe switching to an allowed path, using browser-side fetching and local file generation, using `python3`, and manually opening the result.
- **Research provenance:** Firecrawl responses were not automatically saved, so the session was exported and Python was used to recover raw JSON. Scraped Markdown included navigation, promotions, and formatting artifacts. Comparing selected passages to MDN and documenting those artifacts made the limits of the extraction visible.
- **Design verification:** The portfolio work tied a reusable Skill to concrete measurements: earlier navigation links were approximately 39.8px high, versus at least 44px after the navigation change. Responsive and keyboard checks helped assess the implementation, but did not replace a full accessibility audit.
- **Testing a real failure:** The site did not declare a favicon, and the fallback `/favicon.ico` returned 404. The original suite did not reliably observe that browser-dependent request. An explicit icon availability assertion produced two failures; declaring a working SVG produced the recorded 34-pass result. A direct request to `/favicon.ico` can still return 404; the site now declares the SVG instead.

**Next time:** I would record the selected model, prompts, and manual test outcomes as I work; preserve scripts for exporting research and regenerating the gallery; and plan explicit checks for browser-dependent resources earlier. I would also add real-device and assistive-technology testing before claiming accessibility beyond the recorded checks.

## Technical Comparisons

### AI Skill vs. System Prompt vs. MCP Server

| | What it is and how it operates | Appropriate use and limitations |
| --- | --- | --- |
| **AI Skill** | Reusable task-specific instructions loaded on demand. Here, OpenCode discovers `.opencode/skills/impeccable/SKILL.md` and loads its design guidance; reference files provide additional instructions. | Useful for repeatable portfolio design and adaptation practices. It guides the agent but does not itself guarantee correct implementation, accessibility, or tool access. |
| **System Prompt** | Higher-priority instructions supplied to the model as part of its operating context, shaping behavior across the interaction. | Useful for general role, boundaries, and behavior rather than a task-specific reference. It is not an external execution tool, and the exact system prompt used for the original exercises is not recorded in this repository. |
| **MCP Server** | A service exposing tools or resources through the Model Context Protocol. This project's configuration connects a local Playwright server and a remote Firecrawl server. | Useful when an agent needs capabilities such as browser interaction or web extraction. It depends on server availability, permissions, and potentially authentication; returned data still needs verification. |

### Firecrawl MCP vs. Playwright MCP

**Firecrawl MCP** provides web search and extraction: Part 3 used `firecrawl_search` to discover sources and `firecrawl_scrape` to obtain Markdown and metadata from MDN. It is appropriate for collecting article text and research material, but extraction can contain irrelevant content, omit details, or return cached results; it does not replace checking original sources. Availability and limits depend on the service.

**Playwright MCP** gives the agent browser-control tools. In Part 2, `browser_navigate`, `browser_snapshot`, and `browser_evaluate` helped inspect rendered catalogue pages and collect selected book data. It is appropriate for interactive navigation and inspecting page behavior, but browser context is not Node.js, access to local files can be restricted, and an interactive inspection is not automatically a repeatable test suite.

### Playwright MCP vs. Playwright Test

**Playwright MCP** lets the agent explore and operate a browser interactively, for example inspecting book pages or measuring portfolio navigation targets. Its results depend on the actions performed and recorded; exploratory interaction alone does not enforce future regressions.

**Playwright Test** runs the checked-in `05-tests/tests/portfolio.spec.js` through a test runner with fixtures, assertions, and two configured viewport projects. It is appropriate for repeatable regression checks, including the favicon assertion. It requires maintained tests and only establishes what those tests observe: the narrow viewport is not a real mobile device, and passing tests do not prove complete accessibility or that all possible network requests were exercised.

---

**Review needed:** Chapter V of the subject was not present in the inspected repository, so its exact wording and any additional requirements could not be independently checked. Confirm it against this README before submission. Also complete the Part 1 model and manual-verification placeholders and commit the favicon fix before relying on a fresh clone.
