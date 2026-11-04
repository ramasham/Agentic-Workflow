# Accessible and responsive portfolio websites

**Research question:** How can developers build accessible and responsive personal portfolio websites?

This report draws on the five responses in `raw/`. Each file contains a JSON array with a text entry holding the scraped Markdown and metadata. The retrieval date below is the requested date; where metadata identifies a cached response, its cache timestamp is also noted.

## Source 1 — Semantic HTML

- **Article title:** HTML: A good basis for accessibility
- **URL:** https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Accessibility/HTML
- **Retrieval date:** 2026-11-04
- **MCP tool:** `firecrawl_scrape`
- **Raw response:** `raw/source-1.json`

### Useful information extracted

Semantic elements convey structure and purpose to assistive technologies. Native buttons provide keyboard behavior, headings aid navigation, and meaningful link text makes destinations understandable. Images need context-appropriate text alternatives; purely decorative images can use an empty `alt` attribute.

### Relevant findings for a portfolio

Organize the page with headings and landmarks such as `<nav>` and `<main>`, use buttons for actions and descriptive links for navigation, and give project images useful alternative text. Keep the source order logical and provide a skip link for repeated navigation.

### Extraction fidelity audit

The response has Markdown headings, code examples, image links, and HTTP status 200. It also contains navigation and promotional text, `htmlCopy` and `jsCopy` labels, and the joined feedback text `YesNo`.

**Manually verified — 2026-11-04:** The user reports that the main headings and important explanations and technical information matched the original, and the code examples checked were correct. They noticed no missing or incorrect information in the sections checked. Extra navigation and formatting artifacts were present. This was the user's manual check, not independent automated verification; it did not establish that every word, example, media item, or element was checked.

## Source 2 — Responsive design

- **Article title:** Responsive web design
- **URL:** https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/CSS_layout/Responsive_Design
- **Retrieval date:** 2026-11-04
- **MCP tool:** `firecrawl_scrape`
- **Raw response:** `raw/source-2.json`

### Useful information extracted

Responsive design uses flexible layouts and media to work across screen sizes. Flexbox and Grid can distribute available space, while `max-width: 100%` keeps media within its container. The article recommends a viewport meta tag and warns against sizing text with viewport units alone because of zoom behavior.

### Relevant findings for a portfolio

Use flexible layouts for project cards and navigation, keep project images from overflowing, and begin with a readable narrow-screen layout. Include `<meta name="viewport" content="width=device-width">` so mobile browsers use the intended viewport width.

### Extraction fidelity audit

The Markdown includes layout and viewport examples and HTTP status 200. Navigation, promotional material, `htmlCopyPlay` and `cssCopyPlay` labels, standalone `Play`, and `YesNo` are also present. The metadata reports a cache hit at `2026-11-04T00:22:00.680Z`.

**Manually verified — 2026-11-04:** The user reports that the main headings and important explanations and technical information matched the original, and the code examples checked were correct. They noticed no missing or incorrect information in the sections checked. Extra navigation and formatting artifacts were present. This was the user's manual check, not independent automated verification; it did not establish that every word or element, including interactive examples and visual rendering, was checked.

## Source 3 — CSS media queries

- **Article title:** Media query fundamentals
- **URL:** https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/CSS_layout/Media_queries
- **Retrieval date:** 2026-11-04
- **MCP tool:** `firecrawl_scrape`
- **Raw response:** `raw/source-3.json`

### Useful information extracted

Media queries conditionally apply CSS based on features including viewport width, orientation, hover, and pointer type. The article recommends choosing breakpoints where content begins to need a different layout, rather than targeting particular devices. It also demonstrates a responsive Grid layout without a media query.

### Relevant findings for a portfolio

Start with a single-column layout and add breakpoints as the navigation or project content needs more space. Consider flexible Grid for project cards and use pointer or hover queries where interaction capabilities matter.

### Extraction fidelity audit

The response includes media-query examples and HTTP status 200, along with navigation, promotional text, `cssCopyPlay` and `htmlCopyPlay` labels, standalone `Play`, and `YesNo`. The metadata reports a cache hit at `2026-11-03T01:06:56.525Z`.

**Manually verified — 2026-11-04:** The user reports that the main headings and important explanations and technical information matched the original, and the code examples checked were correct. They noticed no missing or incorrect information in the sections checked. Extra navigation and formatting artifacts were present. This was the user's manual check, not independent automated verification; it did not establish that every word or element, including interactive demonstrations, was checked.

## Source 4 — Accessible form labels

- **Article title:** Text labels and names
- **URL:** https://developer.mozilla.org/en-US/docs/Web/Accessibility/Guides/Understanding_WCAG/Text_labels_and_names
- **Retrieval date:** 2026-11-04
- **MCP tool:** `firecrawl_scrape`
- **Raw response:** `raw/source-4.json`

### Useful information extracted

Visible form labels communicate a control's purpose. A label can be associated with a control by nesting it or by matching the label's `for` attribute to the control's `id`. Placeholder text should not replace a visible label. A `<legend>` describes a group of controls in a `<fieldset>`.

### Relevant findings for a portfolio

Give contact-form inputs visible, programmatically associated labels. If the form includes a group of related choices, use a fieldset and descriptive legend. Give the page a descriptive document title and make interactive elements' purposes clear.

### Extraction fidelity audit

The Markdown includes form examples and HTTP status 200, as well as skip links, promotional material, `htmlCopy` labels, and `YesNo`.

**Manually verified — 2026-11-04:** The user reports that the main headings and important explanations and technical information matched the original, and the code examples checked were correct. They noticed no missing or incorrect information in the sections checked. Extra navigation and formatting artifacts were present. This was the user's manual check, not independent automated verification; it did not establish that every word or element was checked.

## Source 5 — Accessibility testing

- **Article title:** Accessibility tooling and assistive technology
- **URL:** https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Accessibility/Tooling
- **Retrieval date:** 2026-11-04
- **MCP tool:** `firecrawl_scrape`
- **Raw response:** `raw/source-5.json`

### Useful information extracted

The article recommends checking source order with CSS disabled, checking color contrast, using accessibility auditing tools, and testing with a keyboard and screen reader. It states that automated tools alone are insufficient and recommends involving users with different accessibility needs.

### Relevant findings for a portfolio

Test navigation and the contact form using the keyboard; inspect headings, links, and form labels with a screen reader; check color contrast; and run an accessibility audit. Include user testing where possible and recheck content order without CSS.

### Extraction fidelity audit

The response includes a testing checklist, screen-reader guidance, image links, and HTTP status 200. Skip links, promotional text, navigation, and the joined feedback text `YesNo` are also present.

**Manually verified — 2026-11-04:** The user reports that the main headings and important explanations and technical information matched the original, and the code examples checked were correct. They noticed no missing or incorrect information in the sections checked. Extra navigation and formatting artifacts were present. This was the user's manual check, not independent automated verification; it did not establish that every word or element, including tables and images, was checked.

## Conclusion

Build the portfolio on semantic HTML with meaningful structure, links, image alternatives, and clearly labeled form controls. Make layouts and media flexible, use the viewport meta tag, and introduce media-query breakpoints when content needs them. Finally, combine automated accessibility checks with keyboard, screen-reader, contrast, and user testing; no single automated audit is sufficient. The user manually compared portions of each extraction with the original webpage on 2026-11-04; the checks were not exhaustive.
