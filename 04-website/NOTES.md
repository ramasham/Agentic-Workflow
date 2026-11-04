
# Part 4 — Design System & Reusable Instructions

## Design Brief

### Job and audience
A personal developer portfolio for recruiters, potential employers, and developers evaluating a computer science background and technical work. Visitors should quickly understand the owner's focus, explore projects, and find a way to make contact. **Visitor mode: Experience** — the work itself should lead, not decorative interface elements.

### Direction and hierarchy
- Create a modern, minimal, elegant, and professional presentation: a clean neutral background, soft lavender surfaces, and restrained purple accents. Use darker, sufficiently contrasting text and interactive colors; lavender is not a substitute for readable contrast.
- Give the work a clear presence in the first viewport: introduce the owner and backend/systems focus briefly, with a prominent route to Projects and a preview of a real project. Avoid decorative terminal imitations, invented metrics, or generic technology imagery.
- Use a clean, readable typeface or system font stack, with a clear scale for the introduction, section headings, project titles, and body text. Let generous whitespace, alignment, and deliberate changes in density organize the page rather than excessive boxes or ornament.
- Use a spacious, responsive single-page layout with clear navigation to Home, About, Skills, Projects, and Contact. Keep the project-focused action prominent without making contact difficult to find.

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
- This brief covers the portfolio only; implementation is not part of this planning step. Build later with lightweight HTML, CSS, and JavaScript, prioritizing performance and avoiding unnecessary dependencies.
- Confirm the owner's display name, contact methods, project URLs, additional project details, skill inventory, and any imagery before publishing. Do not invent experience, technologies, achievements, or links.
- Exact typography, final colors, and project ordering remain subject to design refinement and contrast testing. English is assumed for the initial content; other languages are not yet specified.

## Skill Installation
To be documented after installation.

## Skill Usage
To be documented during implementation.

## Design Decisions and Evidence
- **Work first:** a featured project and a Projects action serve the agreed primary goal and the Impeccable Experience mode, where the artifact leads.
- **Restrained color and typography:** neutral space with lavender and purple accents supports the requested professional tone while making project information easy to scan. Contrast must be verified, not assumed from the palette.
- **Truth over decoration:** the brief uses the confirmed background and existing project starting points; missing evidence remains open. This follows Impeccable's emphasis on product truth and demonstrating rather than inventing claims.
- **Inclusive by design:** semantic structure, keyboard access, reduced motion, responsive layouts, and lightweight delivery make the presentation useful across devices and abilities rather than treating polish as decoration.

## Verification
During implementation, test keyboard navigation and focus, color contrast, reduced motion, mobile and desktop layouts, content overflow, and operation without JavaScript. Verify all factual claims and destinations before publishing. No website testing has been performed as part of this brief.

### Design improvement 1 — mobile navigation and touch targets
- Applied Impeccable's web adaptation guidance: preserve the existing navigation and visual identity, increase touch targets, space mobile links, and retain keyboard focus indicators.
- Playwright MCP measurements before → after, in CSS pixels, at both 375×812 and 1440×900: navigation links 39.8px high → 44px high (smallest width 43.3px → 44px); project overview 218.9×26.4 → 218.1×44; back to top 98.8×23.8 → 98.8×44; brand 155×26.4 → 154.4×44. Explore projects remained 221×53.6.
- At both tested widths, document width equaled viewport width before and after. On the updated page, keyboard Tab reached the brand, Home, and About links with a visible 3px focus outline. These browser checks are not a full accessibility audit or real-device touch test.
