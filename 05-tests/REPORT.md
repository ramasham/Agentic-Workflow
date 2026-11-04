# Part 5 — End-to-End Verification

## 1. Objective

The goal of this part was to verify my personal portfolio using automated end-to-end tests with Playwright Test.

The website is located in `04-website/`, and the test suite is located in `05-tests/`.

## 2. Testing Framework

- Framework: Playwright Test
- Browser: Chromium
- Execution: Headless
- Viewport configurations: 375px (mobile-width) and 1440px (desktop-width)

## 3. Test Coverage

The suite verifies:

- Page loading and rendering of important elements
- Internal navigation links and primary actions
- Responsive layout differences between mobile and desktop widths
- JavaScript console errors and uncaught exceptions
- Failed network requests and HTTP error responses
- Availability of the website's declared favicon

## 4. Real Bug Discovered

### Problem: Missing favicon

The portfolio initially did not declare a favicon.

Browsers could therefore attempt to retrieve `/favicon.ico`, which returned HTTP 404.

### Failing Tests

Before fixing the problem:

- 32 tests passed
- 2 tests failed

Both failures came from the favicon availability test, once at each viewport configuration.

**Error:**

`Site icon returned HTTP 404: http://127.0.0.1:8765/favicon.ico`

### Root Cause

The website did not include a favicon declaration or a favicon file.

### Fix

I created an original lavender-and-purple SVG favicon at `04-website/favicon.svg`.

I also added the following declaration to the HTML head:

```html
<link rel="icon" type="image/svg+xml" href="./favicon.svg">
```

The tests were not weakened or removed.

## 5. Verification After the Fix

After applying the fix, I reran the complete Playwright suite.

**Final result: 34 passed, 0 failed.**

The test server returned HTTP 200 for the declared SVG favicon.

A direct request to `/favicon.ico` still returns 404, but the website explicitly declares the working SVG favicon.

## 6. Known Limitations

- The mobile configuration tests a 375px viewport in desktop Chromium, not full mobile-device emulation.
- Network and console listeners detect errors occurring during tested interactions, not every possible browser behavior.
- Passing automated tests does not prove complete accessibility compliance.

## 7. How to Run the Tests

From the repository root:

```bash
npx playwright test --config=05-tests/playwright.config.js
```

The Playwright configuration starts the website automatically.

## 8. Conclusion

This exercise demonstrated how automated end-to-end testing can reveal problems that are not immediately obvious when viewing a website.

I learned how to use assertions to verify browser behavior, diagnose a real HTTP error, apply a targeted fix, and confirm the solution with automated tests.
