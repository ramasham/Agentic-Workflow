
# Part 4 — Design System & Reusable Instructions

## Design Brief

### Job and audience
A personal developer portfolio for recruiters, potential employers, and developers evaluating a computer science background and technical work. Visitors should quickly understand the owner's focus, explore projects, and find a way to make contact. **Visitor mode: Experience** — the work itself should lead, not decorative interface elements.

### Direction and hierarchy
- **Inside the System:** a creative, professional portfolio using layered system diagrams, lavender, purple, deep ink, and a clean neutral ground. Technical visuals are conceptual illustrations, not claims about specific implementations.
- Lead with a clear computer science identity, a distinct systems-inspired illustration, and a route to the work. Give `webserv`, `ft_malloc`, and `minishell` individual visual treatments; keep supporting projects compact.
- Organize verified skills by language, systems, backend, and infrastructure, with links to the projects that demonstrate them. Preserve real content and all existing navigation destinations.
- Keep the single-page experience lightweight, responsive, semantic, keyboard accessible, readable without JavaScript, and respectful of reduced-motion preferences.

### Content and sequence
1. **Home:** concise introduction, computer science and backend focus, an action to explore projects, and a featured project preview.
2. **About:** verified background as a fourth-year Computer Science student who completed the Common Core at 42 Amman; include interests in backend engineering, operating systems, algorithms, and computer internals where appropriate.
3. **Skills:** organize only confirmed skills and technologies into readable groups; do not imply proficiency levels or experience that have not been supplied.
4. **Projects:** prioritize backend and systems examples such as `webserv`, `ft_malloc`, and `minishell`. Use the project starting points in `PRODUCT.md` as evidence; provide concise descriptions and genuine links only when verified. Other projects may follow as details become available.
5. **Contact:** present confirmed contact methods and links clearly. Until supplied, mark them as content to provide rather than displaying a fake address, link, or nonfunctional form.

### Interaction, accessibility, and resilience
- Use semantic landmarks, a logical heading structure, descriptive link text, and keyboard-operable navigation with visible focus states. Maintain at least WCAG AA contrast for text and UI components, and do not rely on color alone to convey meaning.
- On narrow screens, stack content in reading order, preserve comfortable spacing and usable touch targets, and keep navigation accessible without horizontal scrolling. On wider screens, use additional space to improve scanning rather than stretch text indefinitely.
- Keep content and navigation usable without JavaScript. Any motion should be subtle, optional, and respect reduced-motion preferences; content must not depend on animation to appear.
- Plan for missing project descriptions, links, or contact details without dead controls or fabricated content. Layouts should accommodate longer project names and descriptions without clipping.

### Scope and open decisions
- This brief covers the portfolio only. Implement with lightweight HTML, CSS, and JavaScript without unnecessary dependencies.
- Confirm the owner's display name, contact methods, project URLs, additional project details, skill inventory, and any imagery before publishing. Do not invent experience, technologies, achievements, or links.
- Exact typography, final colors, and project ordering remain subject to design refinement and contrast testing. English is assumed for the initial content; other languages are not yet specified.

## Skill Installation
Impeccable is installed as a **project-local Skill** at `.opencode/skills/impeccable/`; its entry point is `.opencode/skills/impeccable/SKILL.md` (frontmatter reports version 4.8.0). Supporting instructions are in `.opencode/skills/impeccable/reference/`, including `adapt.md`, `typeset.md`, `layout.md`, `animate.md`, and `new-work.md`. The bundled launcher is `.opencode/skills/impeccable/scripts/impeccable`. The project also has an `.opencode/commands/impeccable.md` command wrapper.

Git records these Skill files in commit `6e6fddd` (`Improve mobile navigation using Impeccable`). They were present locally for the portfolio work, but the available project history does **not** establish the original installation command or installer; do not treat the command wrapper or launcher as proof of how they were installed.

OpenCode automatically discovers project Skills under `.opencode/skills/`. It advertises the Skill's name and description, and the agent loads its full instructions on demand using the `skill` tool with ID `impeccable`; supporting reference files are read separately as needed. The installed Skill was explicitly loaded during this project. See the [OpenCode Skills documentation](https://opencode.ai/v2/docs/skills) for discovery and loading.

## Skill Usage
Applied Impeccable's Experience-mode new-work, layout, adaptation, and animation guidance: work-first storytelling, responsive structural changes, meaningful bounded motion, and content visible without JavaScript.

## Design Decisions and Evidence
### Comparison scope
The **before** version is commit `d0041b7` (`Build initial portfolio before design refinements`). The **after** version is the current working tree, including the committed navigation work in `6e6fddd` and the subsequent uncommitted redesign. Inspect the comparison with `git diff d0041b7 -- 04-website/index.html 04-website/styles.css 04-website/script.js`; `git show d0041b7:04-website/index.html` and `git show d0041b7:04-website/styles.css` show the original files. The observations below describe source changes; benefits are design intentions, not measured user-study results.

### 1. Touch-friendly navigation
- **Original problem:** Navigation links and the featured-project/footer links had small touch areas; the initial `.nav-list a` used `padding: .5rem 0` without a minimum size, and `.text-link` was an inline block.
- **Impeccable guidance:** `adapt` (`reference/adapt.md`) calls for larger touch targets and spacing, without relying on hover or hiding essential navigation.
- **Change:** `04-website/styles.css` now gives navigation links `min-width: 44px` and `min-height: 44px`, keeps visible `:focus-visible` outlines, and makes the brand, skip link, footer link, and skills links at least 44px high. Native anchor navigation remains.
- **Before/after evidence:** In the earlier Playwright run at both 375×812 and 1440×900, the initial navigation links were 39.8px high, with the smallest 43.3px wide; after the first navigation change they were 44px high and at least 44px wide. The original footer link measured 98.8×23.8px; after it measured 98.8×44px. The original project-overview link measured 218.9×26.4px; the intermediate design measured 218.1×44px. That specific overview link has since been replaced by the larger `webserv` hero link, so the intermediate measurement is not a measurement of the current link.
- **Why it helps:** Larger targets are easier to select on touchscreens while keyboard users retain native links and focus feedback.

### 2. Hero identity and hierarchy
- **Original problem:** The large “Building from the inside out” headline and generic “Developer portfolio” brand gave the opening a broad résumé-like identity; a plain `webserv` panel supported the introduction.
- **Impeccable guidance:** `typeset` and `layout` emphasize clear roles and hierarchy; the Experience-mode `new-work` guidance asks the work to lead while respecting verified product facts.
- **Change:** `04-website/index.html` now identifies the concept as “Inside the System,” places computer science and backend/systems context in the introduction, and includes a layered, decorative systems diagram and an internal link to `webserv`. `04-website/styles.css` adjusts the heading scale, layout, and lavender/deep-purple fields. The illustration is conceptual, not evidence of a particular implementation.
- **Before/after evidence:** `d0041b7:04-website/index.html` contains the original headline and `.featured-project` box; the current file contains `.system-art`, `.hero-context`, and `.hero-project`. The original `.hero h1` maximum was `6rem`; the current desktop rule uses `clamp(3rem, 5vw, 4.75rem)`, with a separate mobile rule. The owner's name remains unspecified rather than invented.
- **Why it helps:** The thematic composition and visible discipline aim to make the portfolio more recognizable and orient visitors toward the work.

### 3. Projects with a clearer visual hierarchy
- **Original problem:** Six similarly formatted `.project` text rows made the leading backend and systems work difficult to distinguish at a glance.
- **Impeccable guidance:** Experience mode puts the artifact first; `layout` recommends grouping by meaning and changing density according to priority.
- **Change:** The current `.featured-grid` gives `webserv`, `ft_malloc`, and `minishell` distinct CSS illustrations of HTTP flow, memory blocks, and process flow. `pipex`, `Inception`, and `ft_transcendence` remain compact supporting entries. Project descriptions and the existing `#project-webserv` destination are preserved.
- **Before/after evidence:** The initial `04-website/index.html` contains six `article.project` rows; the current file has three `article.project-card` elements followed by `.more-projects`. CSS changes from a repeated `.project` grid to `.featured-grid`, `.project-server`, `.project-memory`, and `.project-shell`. The diagrams are illustrative and do not add unverified facts or external links.
- **Why it helps:** The distinct treatments provide visual entry points into the three priority projects without adding unsupported claims.

### 4. Skills connected to project evidence
- **Original problem:** Three text-only skill groups did not provide a route from a skill to related work.
- **Impeccable guidance:** `layout` and the Experience-mode principle of concrete evidence support grouping related content and making work easy to find.
- **Change:** Four groups—Language, Systems, Backend, and Infrastructure—now contain internal links to relevant project sections in `04-website/index.html`.
- **Before/after evidence:** The initial `.skill-groups` contained Programming, Systems, and Backend & infrastructure paragraphs with no project links. The current groups link to `#project-malloc`, `#project-pipex`, `#project-webserv`, and `#project-inception`. The Systems group lists memory allocation as well as pipes and processes, while its link points specifically to `pipex`; `ft_malloc` remains separately linked from the Language group.
- **Why it helps:** Visitors can navigate from a skill to related work rather than searching the page for a corresponding example.

## Verification
For the redesign, Playwright checked 1440×900 and 375×812 layouts: no horizontal overflow, all fragment links resolved, and visible mobile links measured at least 44×44 CSS pixels. Reduced-motion emulation disabled the hero animation and smooth scrolling; Tab reached the skip link with a visible focus outline. These checks are not a full accessibility audit, real-device test, or contrast certification. Verify factual claims, contact details, and destinations before publication.

### Design improvement 1 — mobile navigation and touch targets
- Applied Impeccable's web adaptation guidance: preserve the existing navigation and visual identity, increase touch targets, space mobile links, and retain keyboard focus indicators.
- Playwright MCP measurements before → after, in CSS pixels, at both 375×812 and 1440×900: navigation links 39.8px high → 44px high (smallest width 43.3px → 44px); project overview 218.9×26.4 → 218.1×44; back to top 98.8×23.8 → 98.8×44; brand 155×26.4 → 154.4×44. Explore projects remained 221×53.6.
- At both tested widths, document width equaled viewport width before and after. On the updated page, keyboard Tab reached the brand, Home, and About links with a visible 3px focus outline. These browser checks are not a full accessibility audit or real-device touch test.
