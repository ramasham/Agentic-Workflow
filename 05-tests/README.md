# Portfolio end-to-end tests

From the repository root, install dependencies with `npm install` and install Chromium with `npx playwright install chromium` (or `npx playwright install --with-deps chromium` where system dependencies are missing). Then run the entire headless suite with:

```sh
npx playwright test --config=05-tests/playwright.config.js
```

The configuration starts the portfolio's Python server on `127.0.0.1:8765` and stops it afterward. The port must be free. Each test runs in Chromium at both 375px mobile and 1440px desktop widths, with reduced motion to make anchor navigation deterministic.

## What the tests cover

- **Homepage content:** checks the title, main section headings, project names, and representative skills and contact text, so missing core portfolio content is detected.
- **Internal links and primary call to action:** exercises the brand, all five main navigation links, the primary button-styled link, featured project, four skill links, and footer. Each must have the intended fragment, update the URL, and bring the target into view. This catches broken or misdirected navigation.
- **Skip link:** uses the keyboard to reveal and activate the skip link and checks its target, protecting keyboard navigation.
- **Responsive layout:** checks header direction, actual hero/project/skills grid columns, hero element positioning, and horizontal overflow at both widths. These checks verify that the layout really changes, not just the viewport setting.
- **Browser and network health:** every test listens for console errors, uncaught exceptions, failed requests, and HTTP 4xx/5xx responses from before navigation until test teardown. Any observed error fails that test.

Part 5 remains in progress: a real issue still needs to be identified, fixed, and documented.
