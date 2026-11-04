# Part 2 — Browser Automation via MCP (Playwright)

## Goal
For this part, I connected OpenCode to the Playwright MCP server and used it to navigate a public scraping-practice website, collect book cover images and metadata, and generate a local HTML gallery.

## Target Website
- Website: https://books.toscrape.com/
- Reason for selection: It is a public demo website designed for scraping practice.

## What I did
1. Configured OpenCode to use the Playwright MCP server.
2. Verified that the Playwright browser tools worked by navigating to the site and reading the page content.
3. Asked the agent to build a gallery from book cover images found on the site.
4. Later, I updated the gallery to include only a specific set of books that I selected.
5. The agent visited catalogue pages, extracted metadata, saved local image files, and generated:
   - `02-gallery/gallery.html`
   - `02-gallery/sources.json`
   - image files in `02-gallery/assets/`

## MCP Tools Used
The main Playwright MCP tools used were:
- `browser_navigate` — to open catalogue pages
- `browser_snapshot` — to inspect page structure and content
- `browser_evaluate` — to extract image and book data from the loaded page
- `browser_run_code_unsafe` — attempted during implementation, but failed in one step

## What the agent “saw”
The agent interacted with the website through Playwright MCP and received page information through browser navigation and structured page inspection. It used that information to identify book titles, image URLs, and source links.

## Files Produced
- `02-gallery/gallery.html`
- `02-gallery/sources.json`
- `02-gallery/assets/`

## Verification
I verified the result by:
- opening `gallery.html` in a browser
- checking that the selected books appeared correctly
- checking that the images loaded from local relative paths
- checking that the source links were present
- checking the metadata in `sources.json`
- checking that image files existed in `02-gallery/assets/`

## Issues Encountered
During implementation, a few issues occurred:
- `require is not defined`: Node.js APIs were not available inside the browser runtime.
- A file output path outside the allowed workspace was rejected.
- `python` was not available, so `python3` was used instead.
- Playwright could not open the local `file:` URL for visual verification.

## How the issues were handled
The agent switched to a workspace-allowed output path and used browser-side fetching plus local file generation to create the final assets. Even though Playwright could not open the local `file:` URL, I manually opened the generated gallery in the browser and verified it there.

## Result
The final result is an offline HTML gallery showing the selected book covers, their titles, and clickable source links, with metadata stored in `sources.json`.