> **Current site:** The Curiosity Lab redesign at the end of this document supersedes the historical portfolio directions below.

# Part 4 — Design System & Reusable Instructions

## Current direction — editorial portfolio

This revision supersedes the visual directions described in the historical notes below. The site now treats the portfolio as an editorial collection: generous typography, lavender and lilac fields, asymmetric text columns, and a restrained deep-purple skills section. Projects are presented as readable work, with prominent titles, concise descriptions, and verified technologies instead of illustrative computer-science diagrams. The previous memory-map control and all three project diagrams have been removed. Links, section destinations, the favicon, keyboard focus indicators, reduced-motion support, and the JavaScript-free reading experience are retained. Small scroll and hover treatments enhance rather than hide content.

Technology labels are supported by existing project descriptions and the public repository language listings: C for `ft_malloc`, `minishell`, and `pipex`; C++ and HTTP/1.0 for `webserv`; and Docker and shell for `Inception`. The technology stack and repository for `ft_transcendence` are not verified, so the project remains visible with its technology status noted and no invented link.

The existing Playwright test for the removed “Shift perspective” button is intentionally retained unchanged, as requested; it no longer describes the intended interface and is expected to fail until the test owner authorizes updating that obsolete requirement.

## 2026 redesign — memory as a landscape

The portfolio now uses a lavender memory-map composition: an interactive, layered address-space illustration introduces the systems theme, while contrasting project surfaces depict HTTP flow, allocation, and processes. The work shifts from a dark network feature to lighter memory and shell studies and a compact project index, rather than repeating identical cards. The diagram is conceptual, not a representation of a specific implementation. Its keyboard-operable button changes the arrangement and exposes its state with `aria-pressed`; content remains visible without JavaScript and motion respects reduced-motion settings. Existing navigation, skills, project descriptions and the SVG favicon remain intact.

GitHub's public repository listing and repository contents were checked for alternate names: `ft_malloc` maps to `ramasham/malloc`, `webserv` to `ramasham/42_webserve`, and `Inception` to `ramasham/42_Inception`. The user confirmed `minishell` and `pipex`. No public `ft_transcendence` repository was found on this profile, so its title remains unlinked pending a verified URL; no teammate ownership is assumed. Repository links open in new tabs with `noopener noreferrer`, and the contact section links to the GitHub profile.

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

## The Curiosity Lab redesign

The portfolio has been replaced by an interactive science exhibition: a cosmic opening leads to four distinct galleries and a secondary creator section. The palette moves from indigo through lilac and violet, with custom CSS and SVG illustrations rather than external images or dependencies. The original favicon and previously verified GitHub destinations remain.

The exhibits use approximate one-way light travel times, a simplified neuron signal, a step-by-step operating-system file request, and special-relativistic time dilation (gamma = 1 / sqrt(1 − v²/c²)). The calculator compares elapsed time at constant relative speed; acceleration and gravity are excluded. Planetary distances vary, and the file-request sequence is explicitly simplified. Controls use native elements and live status text, and reduced-motion preferences disable the signal animation. Content remains readable without JavaScript, although interactive updates require it.

## Exhibition wall redesign

The homepage now leads into four differently proportioned photographic exhibit covers, each linking to its existing interactive science section. Images are stored locally: Andromeda is NASA/JPL-Caltech image PIA04921 (https://images.nasa.gov/details/PIA04921); the black-hole artist's concept is NASA/JPL-Caltech image PIA16695 (https://images.nasa.gov/details/PIA16695); the circuit board and brain model photographs are from Unsplash (https://unsplash.com/photos/1518770660439-4636190af475 and https://unsplash.com/photos/1559757175-0eb30cd8c063; image CDN identifiers). The black-hole image is an illustration, not a photograph. The existing interactions, accessible controls, reduced-motion handling, and favicon are retained.

## Scientific mysteries collection

Added ten expandable, keyboard-operable feature cards grouped by subject. Each distinguishes established observations from unresolved questions; the early-galaxy and accelerated-expansion entries qualify misleading premises. Native `details` works without JavaScript, and the existing four interactive exhibits remain intact. Visual treatments reuse locally stored science imagery and CSS illustrations; these are conceptual, not data visualizations. Further-reading links point to NASA, CERN, and NIH resources.

## Astronomy-only redesign — The Curiosity Lab

The current site supersedes the earlier mixed-science exhibition described above. Its experience is a journey from a Webb Carina Nebula entrance to Solar System, Stars, Deep Space, and the preserved `#universe` distance experiment. The image-led cards open native modal dialogs; Escape, backdrop, close control, focus restoration, and scroll locking are supported. Motion is restrained and disabled for reduced-motion preferences. The existing favicon and creator GitHub link remain. The eight planets, Sun, Moon, Pluto, six stars (including the Sun), and six deep-space objects have 23 cards in total. The previous unrelated topics were removed from the page, not from the historical notes.

### Images and usage

`assets/sources.json` is the complete per-image manifest with original asset URLs, source pages, credits, and, where provided by Wikimedia Commons, license information. Images are stored locally; cards use lazy loading. NASA media is generally usable under [NASA's media usage guidelines](https://www.nasa.gov/nasa-brand-center/images-and-media/), subject to third-party rights and endorsement restrictions; check each source's credit. ESA/Hubble and EHT material may carry attribution conditions; the Proxima Centauri and Sagittarius A* images are CC BY 4.0 as recorded in the manifest. The 3840px hero image is a Wikimedia Commons derivative credited to NASA, ESA, CSA and STScI and listed as public domain; it is only requested on large screens. The standard hero and card images are smaller JPEGs for transfer efficiency. Some historical observations, particularly Sirius, Betelgeuse, and Proxima, are intrinsically lower-resolution; they are not 4K photographs. Source imagery includes scientific multiwavelength composites, processed views and an explicitly labeled artist's concept for Vega; these are not claimed to be natural-color photographs.

NASA image records: Sun PIA26681; Mercury PIA12051; Venus PIA00270; Earth GSFC_20171208_Archive_e001386; Moon art002e009276; Mars PIA00407; Jupiter PIA22946; Saturn PIA17172; Uranus PIA18182; Neptune PIA00046; Pluto PIA19952; Betelgeuse PIA16680; Vega PIA16610; Milky Way PIA12348; Andromeda PIA04921; Carina carina_nebula; M87 PIA23122. Sirius, Polaris, Proxima Centauri, Orion, and Sagittarius A* are credited and linked through their Wikimedia Commons file pages in the manifest. The earlier unrelated local assets remain in the working tree but are no longer referenced by the site.

### Scientific and calculation notes

Physical descriptions and rounded figures are informed by [NASA Solar System](https://science.nasa.gov/solar-system/), [NASA Stars](https://science.nasa.gov/universe/stars/), and [NASA Universe](https://science.nasa.gov/universe/). The experiment divides illustrative Earth-to-object distances by 299,792.458 km/s; stellar distances expressed in light-years translate directly to years. It is not an ephemeris: planet positions and therefore distances vary, and entries are deliberately labeled approximations. Earth-to-Earth is zero. Betelgeuse's distance is particularly uncertain. No live position or between-object distances are claimed.

### Verification

Playwright runs with `npx playwright test --config=05-tests/playwright.config.js`. The redesigned suite checks every card and image, modal behavior, distance calculations, navigation, favicon, creator link, reduced motion, responsive overflow and browser/network errors on desktop and mobile. The design was inspected at 1440×900 and 375×812. This is not a full accessibility or scientific peer review.

### NASA planet imagery and 3D views

The Solar System cards and popups use the locally stored NASA images listed above. Mercury now leads with NASA MESSENGER's [Mercury Globe: 0°N, 180°E (PIA15162)](https://images.nasa.gov/details/PIA15162), with [Crater Close-up Captured! (PIA18372)](https://images.nasa.gov/details/PIA18372) as a second, separately credited surface image. Both are credited to NASA/Johns Hopkins University Applied Physics Laboratory/Carnegie Institution of Washington; source and downloaded-asset URLs are recorded in `assets/sources.json`. NASA's images may be processed mosaics or visualizations: the captions identify the Venus radar-derived simulated view, the Sun's false color, and Pluto's enhanced color. The old Mercury asset and its provenance remain in the project but are not used by the exhibit.

NASA's own object pages embed **Eyes on the Solar System** for [Mercury](https://science.nasa.gov/mercury/), [Venus](https://science.nasa.gov/venus/), [Mars](https://science.nasa.gov/mars/facts/), [Jupiter](https://science.nasa.gov/jupiter/), [Saturn](https://science.nasa.gov/saturn/), [Uranus](https://science.nasa.gov/uranus/), [Neptune](https://science.nasa.gov/neptune/), [the Sun](https://science.nasa.gov/sun/), and [Pluto](https://science.nasa.gov/dwarf-planets/pluto/). [Earth's facts page](https://science.nasa.gov/earth/facts/) embeds Eyes on the Earth. Those exact official iframe URLs are recorded individually in `script.js` rather than guessing route names; the NASA Eyes application responded without X-Frame-Options or a frame-ancestors restriction when checked. The viewer is opt-in and sandboxed, with a permanent new-tab NASA link in case a browser, graphics support, content blocker, or NASA changes prevent embedding. It is removed when the dialog closes. For the Moon, no object-specific NASA 3D embed URL was verified, so the popup links to NASA's Moon information page instead of guessing a 3D address. NASA controls availability and rendering; local tests mock the remote viewer rather than pretending to test NASA's WebGL application.

### Full-screen NASA viewer

The optional NASA iframe now opens in a second native dialog above the exhibit, with a slim header and the same verified per-object URLs. Desktop uses up to 95vw × 95dvh; screens at or below 800px use 100vw × 100dvh. Closing the viewer removes the iframe and returns focus to the exhibit's View in 3D button; the page remains scroll-locked until the exhibit closes. The header always offers the official NASA link if the embedded service is blocked or fails. Browsers do not expose cross-origin iframe key events to the parent, so Escape closes the viewer when focus is on the outer dialog, but cannot be guaranteed while focus is inside NASA's interactive; the visible close button remains available. Tests use a controlled iframe response to verify the site's dialog behavior, not the availability or rendering of NASA's separate WebGL application.

### Solar System scene

The Solar System gallery has been replaced with a responsive, not-to-scale scene. Each NASA world image is itself part of a native button, with a visible name and an accessible label; the existing detailed exhibit and the separate 3D viewer remain available. The redundant “View in NASA 3D” link was removed from the exhibit; the viewer's own “Open on NASA” fallback remains.

The `*-space.webp` images are resized display derivatives of the NASA photographs and visualizations listed in `assets/sources.json`: contiguous near-black image backgrounds were made transparent to let the scene show through; the Sun scene image is cropped above its timestamp and its outer edges gently faded. They are not drawings or simulated planets. The unmodified, higher-resolution source images remain in the exhibit dialogs, including the full Solar Dynamics Observatory image and its timestamp. Each source manifest entry identifies its corresponding derivative and retains the original NASA credit and URL. The starfield uses the existing credited Milky Way composite, with a dark overlay for readability. The scene represents neither orbital positions nor relative scale.

### Starlight palette and stellar field

The current palette replaces the earlier lavender system: cosmic black `#050811`, midnight `#0b1629`, blue surface `#183351`, star white `#eaf3ff`, starlight blue `#76bfff`, and solar amber `#f6ac66`. Images retain their own recorded colors. The Stars collection is an asymmetrical field of directly actionable observations rather than rectangular covers; its scale and colors are not a sky chart. Hover and focus motion follows the existing reduced-motion rules. The favicon retains the existing mark in the new colors.

The field uses the original local Hubble photographs of Sirius A/B, Polaris A/B, and Proxima Centauri; the Herschel infrared image of Betelgeuse; the Solar Dynamics Observatory image of the Sun (false color); and the NASA/JPL-Caltech artist's impression of Vega's debris disk. The latter is identified as an artist's impression in both the field and popup; it is not a photograph. The Betelgeuse field is infrared false color, not an optical photograph. Diffraction patterns are part of the observations, not resolved stellar surfaces. For the field, `*-stellar.webp` are derived from these specific local source images: edges and dark backgrounds are faded for compositing; Polaris is cropped around the brighter star, and Vega is cropped from the credited artist's concept with a vignette. No source observations are upscaled in these derivative files. The full unmodified image remains in the popup. Each manifest entry in `assets/sources.json` records its image credit, source, derivative and NASA further-reading link.

Further reading links in the popups point to the supplied NASA/Hubble pages for [Sirius](https://science.nasa.gov/asset/hubble/the-dog-star-sirius-and-its-tiny-companion/), [Betelgeuse](https://science.nasa.gov/asset/hubble/disruption-of-the-red-supergiant-star-betelgeuse/), [Polaris](https://science.nasa.gov/asset/hubble/hubble-images-polariss-companion/), [Vega](https://science.nasa.gov/asset/hubble/hubble-and-webb-observations-of-vega-circumstellar-disk/) and [Proxima Centauri](https://science.nasa.gov/asset/hubble/proxima-centauri/). These pages are further reading; the image credit link identifies the actual image displayed, which can be a different observatory or artist's concept.

### Solar-system journey

The entrance now combines the existing Solar Dynamics Observatory Sun image with the existing Earth and Jupiter images against Webb's Carina Nebula, using a gold accent to connect it visually to the solar-system lineup. This is an editorial composite, not an actual simultaneous view; image credits and source records remain in `assets/sources.json`. The Sun image is false color and its dark surround is blended/faded in the hero; the full unmodified observation remains in its exhibit.

The Solar System section is a horizontal, touch-scrollable and keyboard-focusable journey from the Sun through the eight planets, with the Moon following Earth. Pluto remains separately accessible. Images and distances are intentionally not to scale, and the lineup is not a depiction of current orbital positions. The scroll region is labeled and can be navigated with the keyboard; focusing a world brings it into view. The original exhibit dialogs, NASA viewer, and distance experiment remain unchanged.

### Solar System panorama entrance

The latest hero supersedes the earlier nebula-and-Sun entrance. It is a responsive, horizontally explorable composition of the existing NASA Sun and planet photographs and a new local Cassini view of Saturn with its rings: [PIA11141, “Saturn … Four Years On”](https://images.nasa.gov/details/PIA11141), NASA/JPL/Space Science Institute. The Venus image is the left view cropped from NASA/JPL-Caltech’s false-color [Mariner 10 Venus composite PIA23791](https://images.nasa.gov/details/PIA23791), processed by Kevin M. Gill. The exact downloaded assets and sources are recorded under `hero-venus` and `hero-saturn` in `assets/sources.json`; other imagery retains its existing manifest credits. The Sun is an SDO false-color observation. Planet images are arranged in the order of their orbits but their sizes, distances, lighting, and simultaneous positions are an editorial composite, not a scale model or an observation of an actual alignment. Each image opens its existing exhibit. The panorama scrolls on narrow screens; the rest of the site and its existing Solar System collection are unchanged.

### GitHub Pages publication

`.github/workflows/deploy-pages.yml` uploads only `04-website/` as the Pages artifact and deploys it using the official GitHub Pages Actions. For `ramasham/Agentic-Workflow`, enable **Settings → Pages → Build and deployment → Source → GitHub Actions**. The expected project URL is `https://ramasham.github.io/Agentic-Workflow/`; it is public only after a deployment succeeds. Pushes to `main` that touch the site or workflow and manual workflow dispatches trigger deployment. The site uses relative asset paths; `05-tests/pages_test_server.py` also serves a project-prefixed path so Playwright checks asset loading and interactions there.
